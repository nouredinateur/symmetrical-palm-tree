import { Button } from "@/components/ui/button";
import { ArrowRight, Recycle } from "lucide-react";
import { SkipData } from "../types/api";

interface SelectedSkipFooterProps {
  skip: SkipData;
  calculateTotalPrice: (priceBeforeVat: number, vat: number) => number;
  onContinue: () => void;
}

export function SelectedSkipFooter({
  skip,
  calculateTotalPrice,
  onContinue,
}: SelectedSkipFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-lg z-50">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 py-3 sm:py-4">
        {/* Mobile: Stack vertically, Desktop: Side by side */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          {/* Skip info section */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="relative flex-shrink-0">
              <div className="h-8 w-12 sm:h-10 sm:w-16 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-t-lg shadow-md" />
              <div className="h-1.5 w-12 sm:h-2 sm:w-16 bg-gradient-to-b from-yellow-500 to-yellow-600 rounded-b-lg shadow-md" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Recycle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-800" />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                {skip.size} Yard Skip Selected
              </h4>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600">
                <span>{skip.hire_period_days} days</span>
                <span
                  className={
                    skip.allows_heavy_waste ? "text-green-600" : "text-red-600"
                  }
                >
                  {skip.allows_heavy_waste ? "Heavy waste ✓" : "No heavy waste"}
                </span>
                {!skip.allowed_on_road && (
                  <span className="text-amber-600">Permit required</span>
                )}
              </div>
            </div>
          </div>

          {/* Price and button section */}
          <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
            <div className="text-left sm:text-right">
              <div className="text-lg sm:text-xl font-bold text-gray-900">
                £{calculateTotalPrice(skip.price_before_vat, skip.vat)}
              </div>
              <div className="text-xs text-gray-600">Inc. VAT & delivery</div>
            </div>

            <Button
              onClick={onContinue}
              className="bg-gray-900 cursor-pointer hover:bg-gray-800 text-white px-4 sm:px-6 py-2 flex-shrink-0"
              size="sm"
            >
              <span className="hidden xs:inline">Continue</span>
              <span className="xs:hidden">Go</span>
              <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
