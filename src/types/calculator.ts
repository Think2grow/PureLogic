import type { Tier, ProjectScope } from '@/data/calculator-pricing';

export interface CalculatorData {
  // Project basics
  selectedAreas: string[];
  projectScope: ProjectScope | null;
  squareFootage: number | null;
  location: string | null;
  
  // Contact information
  name: string;
  email: string;
  phone: string;
  address: string;
  timeline: string;
  
  // Selections by category
  selections: Record<string, AreaSelection>;
  
  // Calculated results
  travelFee: number;
  subtotal: number;
  total: number;
}

export interface AreaSelection {
  tier: Tier;
  customOptions?: Record<string, any>;
}

export interface CostBreakdown {
  category: string;
  items: LineItem[];
  subtotal: number;
}

export interface LineItem {
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  tier?: Tier;
}

export interface EstimateResult {
  projectSummary: {
    name: string;
    areas: string[];
    scope: string;
    squareFootage: number;
    location: string;
  };
  breakdown: CostBreakdown[];
  fees: {
    travelFee: number;
    permitFees: number;
    projectManagement: number;
  };
  subtotal: number;
  contingency: number;
  total: number;
  estimatedTimeline: string;
  generatedDate: string;
  validUntil: string;
}
