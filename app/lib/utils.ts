import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function calculateTotalPrice(priceBeforeVat: number, vat: number) {
  return Math.round(priceBeforeVat * (1 + vat / 100));
}

export function getSkipDescription(size: number) {
  const descriptions: Record<number, string> = {
    4: "Perfect for small home clearances and garden waste",
    5: "Ideal for bathroom or kitchen renovations",
    6: "Great for medium-sized home projects",
    8: "Popular choice for house clearances",
    10: "Suitable for large renovation projects",
    12: "Perfect for major construction work",
  };
  return descriptions[size] || "Suitable for various waste disposal needs";
}
