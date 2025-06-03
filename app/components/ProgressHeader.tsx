import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";

interface Step {
  id: number;
  name: string;
  completed: boolean;
  current?: boolean;
}

interface ProgressHeaderProps {
  steps: Step[];
  currentStep: number;
}

export function ProgressHeader({ steps, currentStep }: ProgressHeaderProps) {
  const progressPercentage = (currentStep / steps.length) * 100;

  return (
    <div className="mb-6">
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gray-900 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-600 text-center">
        Step {currentStep} of {steps.length}
      </p>
      <div className="flex items-center justify-center space-x-2 sm:space-x-4 overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex items-center space-x-1 sm:space-x-2 min-w-fit"
          >
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div
                className={`flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full border-2 transition-colors ${
                  step.completed
                    ? "bg-gray-900 border-gray-900 text-white"
                    : step.current
                      ? "border-gray-900 text-gray-900 bg-gray-100"
                      : "border-gray-300 text-gray-500"
                }`}
              >
                {step.completed ? (
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                ) : (
                  <span className="text-xs sm:text-sm font-medium">
                    {step.id}
                  </span>
                )}
              </div>
              <span
                className={`text-xs sm:text-sm font-medium ${
                  step.current
                    ? "text-gray-900"
                    : step.completed
                      ? "text-gray-900"
                      : "text-gray-500"
                }`}
              >
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="h-px w-4 sm:w-8 bg-gray-300 hidden sm:block" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}