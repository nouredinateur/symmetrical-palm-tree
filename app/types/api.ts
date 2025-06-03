

export interface SkipData {
  id: number;
  size: number;
  hire_period_days: number;
  price_before_vat: number;
  vat: number;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
  forbidden: boolean;
}

export type BinDataResponse = SkipData[];
