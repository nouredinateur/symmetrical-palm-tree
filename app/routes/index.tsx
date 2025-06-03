import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProgressHeader } from "@/components/ProgressHeader";
import { SkipCard } from "@/components/SkipCard";
import { SelectedSkipFooter } from "@/components/SelectedSkipFooter";
import type { SkipData } from "../types/api";

const steps = [
  { id: 1, name: "Code postal", completed: true },
  { id: 2, name: "Waste Type", completed: true },
  { id: 3, name: "Select Skip", completed: false, current: true },
  { id: 4, name: "Permit Check", completed: false },
  { id: 5, name: "Choose Rendez-vous", completed: false },
  { id: 6, name: "Paiement", completed: false },
];

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => {
    const response = await fetch(import.meta.env.VITE_API_ENDPOINT as string);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  },
});

function Home() {
  const router = useRouter();
  const data = Route.useLoaderData() as SkipData[];
  const [selectedSkip, setSelectedSkip] = useState<SkipData | null>(null);

  const calculateTotalPrice = (priceBeforeVat: number, vat: number) => {
    return Math.round(priceBeforeVat * (1 + vat / 100));
  };

  const availableSkips = data
    .filter((skip) => !skip.forbidden)
    .sort((a, b) => a.size - b.size);

  const getSkipDescription = (size: number) => {
    const descriptions: Record<number, string> = {
      4: "Perfect for small home clearances and garden waste",
      5: "Ideal for bathroom or kitchen renovations",
      6: "Great for medium-sized home projects",
      8: "Popular choice for house clearances",
      10: "Suitable for large renovation projects",
      12: "Perfect for major construction work",
    };
    return descriptions[size] || "Suitable for various waste disposal needs";
  };

  const handleSkipSelection = (skip: SkipData) => {
    setSelectedSkip(skip);
    console.log(`Selected skip with ID: ${skip.id}`);
  };

  const handleContinue = () => {
    if (selectedSkip) {
      router.navigate({
        to: "/",
        search: { skipId: selectedSkip.id },
      });
    }
  };

  const handleBack = () => {
    router.navigate({ to: "/" });
  };

  const currentStep = steps.findIndex((step) => step.current) + 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <ProgressHeader steps={steps} currentStep={currentStep} />

        {selectedSkip && (
          <SelectedSkipFooter
            skip={selectedSkip}
            calculateTotalPrice={calculateTotalPrice}
            onContinue={handleContinue}
          />
        )}

        <div className={selectedSkip ? "pb-24" : "pb-0"}>
          <div className="flex flex-col gap-6">
            <div className="w-full">
              <div className="text-center space-y-3 mb-6">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
                  Choose Your Skip Size
                </h1>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                  Select the perfect skip size for your project. All prices
                  include VAT and delivery.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-6">
                {availableSkips.map((skip) => (
                  <SkipCard
                    key={skip.id}
                    skip={skip}
                    isSelected={selectedSkip?.id === skip.id}
                    onSelect={handleSkipSelection}
                    getSkipDescription={getSkipDescription}
                    calculateTotalPrice={calculateTotalPrice}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            className={`flex items-center justify-between pt-6 border-t mt-6 ${selectedSkip ? "mb-24" : ""}`}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={handleBack}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            {!selectedSkip && (
              <Button
                size="lg"
                disabled={true}
                className="min-w-[120px] bg-gray-300 text-gray-500 cursor-not-allowed"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="text-center mt-6 pt-4 border-t">
            <p className="text-xs text-gray-500 max-w-4xl mx-auto leading-relaxed">
              Imagery and information shown throughout this site may not reflect
              the exact shape or size specification. Colors may vary, and
              options and/or accessories may be featured at additional cost.
              Final pricing will be confirmed before payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
