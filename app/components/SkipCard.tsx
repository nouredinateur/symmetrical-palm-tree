import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, AlertTriangle, Recycle } from "lucide-react";
import { SkipData } from "../types/api";

interface SkipCardProps {
  skip: SkipData;
  isSelected: boolean;
  onSelect: (skip: SkipData) => void;
  getSkipDescription: (size: number) => string;
  calculateTotalPrice: (priceBeforeVat: number, vat: number) => number;
}

export function SkipCard({
  skip,
  isSelected,
  onSelect,
  getSkipDescription,
  calculateTotalPrice,
}: SkipCardProps) {
  const totalPrice = calculateTotalPrice(skip.price_before_vat, skip.vat);

  return (
    <Card
      className={`bg-white relative cursor-pointer transition-all duration-200 hover:shadow-lg border ${
        isSelected
          ? "ring-2 ring-gray-900 shadow-lg border-gray-300"
          : "border-gray-200 hover:shadow-md hover:border-gray-300"
      }`}
      onClick={() => onSelect(skip)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge className="text-sm font-semibold bg-gray-100 text-gray-800 hover:bg-gray-100">
            {skip.size} Yard Skip
          </Badge>
          {isSelected && <CheckCircle className="h-5 w-5 text-gray-900" />}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex justify-center py-2">
          <div className="relative">
            <div className="h-16 w-28 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-t-lg shadow-md" />
            <div className="h-4 w-28 bg-gradient-to-b from-yellow-500 to-yellow-600 rounded-b-lg shadow-md" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Recycle className="h-8 w-8 text-yellow-800" />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <CardTitle className="text-lg text-center text-gray-900">
            {skip.size} Yard Skip
          </CardTitle>
          <CardDescription className="text-center text-gray-600 text-sm leading-tight">
            {getSkipDescription(skip.size)}
          </CardDescription>
        </div>

        <div className="space-y-1 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Hire period:</span>
            <span className="font-medium text-gray-900">
              {skip.hire_period_days} days
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Heavy waste:</span>
            <span
              className={`font-medium ${skip.allows_heavy_waste ? "text-green-600" : "text-red-600"}`}
            >
              {skip.allows_heavy_waste ? "✓ Allowed" : "✗ Not allowed"}
            </span>
          </div>
        </div>

        {!skip.allowed_on_road && (
          <Alert className="border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800 text-sm">
              Permit required for road placement
            </AlertDescription>
          </Alert>
        )}

        <div className="text-center pt-1">
          <div className="text-2xl font-bold text-gray-900">£{totalPrice}</div>
          <div className="text-sm text-gray-600">Inc. VAT & delivery</div>
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <Button
          className={`w-full transition-colors ${
            isSelected
              ? "bg-gray-900 hover:bg-gray-800 text-white"
              : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(skip);
          }}
        >
          {isSelected ? "Selected" : "Select This Skip"}
        </Button>
      </CardFooter>
    </Card>
  );
}
