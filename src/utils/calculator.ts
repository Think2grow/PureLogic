import { PRICING_DATA, PROJECT_SCOPES, SERVICE_AREAS, TIER_MULTIPLIERS, type Tier, type ProjectScope } from '@/data/calculator-pricing';
import type { CalculatorData, EstimateResult, CostBreakdown, LineItem } from '@/types/calculator';

export function calculateEstimate(data: CalculatorData): EstimateResult {
  const breakdown: CostBreakdown[] = [];
  let subtotal = 0;

  // Get project scope multiplier
  const scopeMultiplier = data.projectScope ? PROJECT_SCOPES[data.projectScope].multiplier : 1;
  const sqft = data.squareFootage || 0;

  // Calculate costs for each selected area
  for (const area of data.selectedAreas) {
    const selection = data.selections[area];
    const tier = selection?.tier || 'standard';
    
    const categoryBreakdown = calculateAreaCost(area, tier, sqft, scopeMultiplier);
    if (categoryBreakdown) {
      breakdown.push(categoryBreakdown);
      subtotal += categoryBreakdown.subtotal;
    }
  }

  // Calculate travel fee
  const travelFee = calculateTravelFee(data.location);

  // Calculate permit fees
  const permitFees = calculatePermitFees(data.selectedAreas, sqft);

  // Calculate project management fee
  const projectManagement = Math.round(subtotal * (PRICING_DATA.overhead.projectManagementPercent / 100));

  // Add fees to subtotal
  const subtotalWithFees = subtotal + travelFee + permitFees + projectManagement;

  // Calculate contingency
  const contingency = Math.round(subtotalWithFees * (PRICING_DATA.overhead.contingencyPercent / 100));

  // Calculate total with profit margin
  const totalBeforeProfit = subtotalWithFees + contingency;
  const profitAmount = Math.round(totalBeforeProfit * (PRICING_DATA.overhead.profitMarginPercent / 100));
  const total = totalBeforeProfit + profitAmount;

  // Calculate timeline
  const estimatedTimeline = calculateTimeline(sqft, data.projectScope);

  // Generate dates
  const generatedDate = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
  
  const validUntilDate = new Date();
  validUntilDate.setDate(validUntilDate.getDate() + 60); // 60 days validity
  const validUntil = validUntilDate.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return {
    projectSummary: {
      name: data.name,
      areas: data.selectedAreas,
      scope: data.projectScope ? PROJECT_SCOPES[data.projectScope].name : 'Not specified',
      squareFootage: sqft,
      location: data.location || 'Not specified'
    },
    breakdown,
    fees: {
      travelFee,
      permitFees,
      projectManagement
    },
    subtotal,
    contingency,
    total,
    estimatedTimeline,
    generatedDate,
    validUntil
  };
}

function calculateAreaCost(area: string, tier: Tier, sqft: number, scopeMultiplier: number): CostBreakdown | null {
  const items: LineItem[] = [];
  let categorySubtotal = 0;

  const tierMult = TIER_MULTIPLIERS[tier];

  switch (area) {
    case 'kitchen':
      // Typical kitchen ~150 sq ft; scale quantities based on input sqft
      const kitchenScale = Math.max(0.5, sqft / 150);
      const cabinetsLF = Math.round(20 * kitchenScale);
      const countertopSqFt = Math.round(30 * kitchenScale);
      const backsplashSqFt = Math.round(25 * kitchenScale);

      items.push({
        name: `${tier.charAt(0).toUpperCase() + tier.slice(1)} Cabinets`,
        quantity: cabinetsLF,
        unit: 'linear ft',
        unitPrice: PRICING_DATA.kitchen.cabinetsPerLinearFt[tier],
        total: cabinetsLF * PRICING_DATA.kitchen.cabinetsPerLinearFt[tier]
      });

      const countertopPrice = tier === 'standard' ? PRICING_DATA.kitchen.countertopsPerSqFt.laminate :
                             tier === 'premium' ? PRICING_DATA.kitchen.countertopsPerSqFt.quartz :
                             PRICING_DATA.kitchen.countertopsPerSqFt.marble;
      items.push({
        name: 'Countertops',
        quantity: countertopSqFt,
        unit: 'sq ft',
        unitPrice: countertopPrice,
        total: countertopSqFt * countertopPrice
      });

      items.push({
        name: 'Sink & Faucet',
        quantity: 1,
        unit: 'set',
        unitPrice: PRICING_DATA.kitchen.sinkFaucet[tier],
        total: PRICING_DATA.kitchen.sinkFaucet[tier]
      });

      const backsplashPrice = PRICING_DATA.kitchen.backsplashPerSqFt[tier];
      items.push({
        name: 'Backsplash',
        quantity: backsplashSqFt,
        unit: 'sq ft',
        unitPrice: backsplashPrice,
        total: backsplashSqFt * backsplashPrice
      });

      break;

    case 'bathroom':
      // Typical bathroom ~75 sq ft; scale shower size with sqft
      const bathroomScale = Math.max(0.5, sqft / 75);
      items.push({
        name: `${tier.charAt(0).toUpperCase() + tier.slice(1)} Vanity`,
        quantity: 1,
        unit: 'unit',
        unitPrice: PRICING_DATA.bathroom.vanity[tier],
        total: PRICING_DATA.bathroom.vanity[tier]
      });

      items.push({
        name: 'Toilet',
        quantity: 1,
        unit: 'unit',
        unitPrice: PRICING_DATA.bathroom.toilet[tier],
        total: PRICING_DATA.bathroom.toilet[tier]
      });

      const showerSqFt = Math.round(40 * bathroomScale); // Typical shower size scaled
      const showerTilePrice = PRICING_DATA.bathroom.showerTilePerSqFt[tier];
      items.push({
        name: 'Shower (Tile)',
        quantity: showerSqFt,
        unit: 'sq ft',
        unitPrice: showerTilePrice,
        total: showerSqFt * showerTilePrice
      });

      items.push({
        name: 'Fixtures',
        quantity: 1,
        unit: 'set',
        unitPrice: PRICING_DATA.bathroom.fixtures[tier],
        total: PRICING_DATA.bathroom.fixtures[tier]
      });

      break;

    case 'flooring':
      let flooringPrice = 0;
      let flooringType = '';
      
      if (tier === 'standard') {
        flooringPrice = PRICING_DATA.flooring.vinylPlank[tier];
        flooringType = 'Vinyl Plank';
      } else if (tier === 'premium') {
        flooringPrice = PRICING_DATA.flooring.hardwood[tier];
        flooringType = 'Hardwood';
      } else {
        flooringPrice = PRICING_DATA.flooring.tileNaturalStone[tier];
        flooringType = 'Natural Stone Tile';
      }

      items.push({
        name: flooringType,
        quantity: sqft,
        unit: 'sq ft',
        unitPrice: flooringPrice,
        total: sqft * flooringPrice
      });

      break;

    case 'drywall':
      // Assume walls and ceiling
      const wallSqFt = sqft * 2.5; // Rough estimate for wall area

      items.push({
        name: 'Drywall Installation',
        quantity: wallSqFt,
        unit: 'sq ft',
        unitPrice: PRICING_DATA.walls.drywallInstall,
        total: wallSqFt * PRICING_DATA.walls.drywallInstall
      });

      items.push({
        name: 'Paint (2 coats)',
        quantity: wallSqFt,
        unit: 'sq ft',
        unitPrice: PRICING_DATA.walls.paintTwoCoats,
        total: wallSqFt * PRICING_DATA.walls.paintTwoCoats
      });

      const trimLF = Math.sqrt(sqft) * 4; // Perimeter estimate
      const trimPrice = PRICING_DATA.walls.trimBaseboardsPerLinearFt[tier];
      items.push({
        name: 'Trim & Baseboards',
        quantity: trimLF,
        unit: 'linear ft',
        unitPrice: trimPrice,
        total: trimLF * trimPrice
      });

      break;

    case 'roofing':
      let roofPrice = 0;
      let roofType = '';
      
      if (tier === 'standard') {
        roofPrice = PRICING_DATA.roofing.asphaltShingles30Year;
        roofType = 'Asphalt Shingles';
      } else if (tier === 'premium') {
        roofPrice = PRICING_DATA.roofing.metal;
        roofType = 'Metal Roofing';
      } else {
        roofPrice = PRICING_DATA.roofing.tile;
        roofType = 'Tile Roofing';
      }

      items.push({
        name: roofType,
        quantity: sqft,
        unit: 'sq ft',
        unitPrice: roofPrice,
        total: sqft * roofPrice
      });

      break;

    case 'electrical':
      const outlets = Math.ceil(sqft / 80); // Rough estimate
      const lights = Math.ceil(sqft / 100);

      items.push({
        name: 'Electrical Outlets',
        quantity: outlets,
        unit: 'outlet',
        unitPrice: PRICING_DATA.electrical.gfciOutlet,
        total: outlets * PRICING_DATA.electrical.gfciOutlet
      });

      const lightPrice = PRICING_DATA.electrical.lightFixture[tier];
      items.push({
        name: 'Light Fixtures',
        quantity: lights,
        unit: 'fixture',
        unitPrice: lightPrice,
        total: lights * lightPrice
      });

      break;

    case 'plumbing':
      const fixtures = 2; // Rough estimate

      items.push({
        name: 'Plumbing Rough-In',
        quantity: fixtures,
        unit: 'fixture',
        unitPrice: PRICING_DATA.plumbing.roughInPerFixture,
        total: fixtures * PRICING_DATA.plumbing.roughInPerFixture
      });

      break;

    case 'hvac':
      const hvacPrice = tier === 'standard' ? PRICING_DATA.hvac.basicFurnaceAC : PRICING_DATA.hvac.highEfficiencySystem;
      
      items.push({
        name: tier === 'standard' ? 'Basic HVAC System' : 'High-Efficiency HVAC',
        quantity: 1,
        unit: 'system',
        unitPrice: hvacPrice,
        total: hvacPrice
      });

      break;

    case 'basement':
      // Basement finishing includes flooring, walls, ceiling
      const basementTierMult = {
        standard: 1.0,
        premium: 1.3,
        luxury: 1.6
      } as const;
      items.push({
        name: 'Basement Finishing',
        quantity: sqft,
        unit: 'sq ft',
        unitPrice: PRICING_DATA.foundation.basementFinished * basementTierMult[tier],
        total: sqft * PRICING_DATA.foundation.basementFinished * basementTierMult[tier]
      });

      break;

    case 'windows':
      const numWindows = Math.ceil(sqft / 150); // Rough estimate
      
      let windowPrice = 0;
      let windowType = '';
      
      if (tier === 'standard') {
        windowPrice = PRICING_DATA.windows.vinylStandard;
        windowType = 'Vinyl Windows';
      } else if (tier === 'premium') {
        windowPrice = PRICING_DATA.windows.vinylEnergyEfficient;
        windowType = 'Energy-Efficient Windows';
      } else {
        windowPrice = PRICING_DATA.windows.woodComposite;
        windowType = 'Wood/Composite Windows';
      }

      items.push({
        name: windowType,
        quantity: numWindows,
        unit: 'window',
        unitPrice: windowPrice,
        total: numWindows * windowPrice
      });

      break;

    case 'framing':
      items.push({
        name: 'Wall Framing',
        quantity: sqft,
        unit: 'sq ft',
        unitPrice: PRICING_DATA.framing.wallFraming,
        total: sqft * PRICING_DATA.framing.wallFraming
      });

      break;

    case 'addition':
      // Home additions in Utah: $150-$400/sq ft depending on tier
      const additionPricePerSqFt: Record<Tier, number> = {
        standard: 175,
        premium: 250,
        luxury: 350
      };

      items.push({
        name: 'Home Addition (Complete Build)',
        quantity: sqft,
        unit: 'sq ft',
        unitPrice: additionPricePerSqFt[tier],
        total: sqft * additionPricePerSqFt[tier]
      });

      break;

    case 'other':
      // Generic estimate based on square footage and tier
      const baseRate = tier === 'standard' ? 50 : tier === 'premium' ? 80 : 120;
      items.push({
        name: 'General Construction Work',
        quantity: sqft,
        unit: 'sq ft',
        unitPrice: baseRate,
        total: sqft * baseRate
      });

      break;
  }

  // Calculate category subtotal with scope multiplier
  categorySubtotal = items.reduce((sum, item) => sum + item.total, 0) * scopeMultiplier;

  const areaLabels: Record<string, string> = {
    kitchen: 'Kitchen',
    bathroom: 'Bathroom',
    flooring: 'Flooring',
    drywall: 'Drywall & Painting',
    electrical: 'Electrical',
    plumbing: 'Plumbing',
    framing: 'Framing',
    roofing: 'Roofing',
    windows: 'Windows & Doors',
    hvac: 'HVAC',
    basement: 'Basement Finishing',
    addition: 'Addition',
    other: 'Other Work'
  };

  return {
    category: areaLabels[area] || area,
    items,
    subtotal: Math.round(categorySubtotal)
  };
}

function calculateTravelFee(location: string | null): number {
  if (!location) return 0;

  const area = SERVICE_AREAS.find(a => a.name === location);
  if (!area) return 0;

  if ('travelFee' in area) {
    return area.travelFee;
  }

  if ('travelFeeRange' in area) {
    // Return average of range
    return Math.round((area.travelFeeRange.min + area.travelFeeRange.max) / 2);
  }

  return 0;
}

function calculatePermitFees(selectedAreas: string[], sqft: number): number {
  let total = 0;

  if (selectedAreas.includes('kitchen')) {
    total += PRICING_DATA.permits.kitchenRemodel;
  }

  if (selectedAreas.includes('bathroom')) {
    total += PRICING_DATA.permits.bathroomRemodel;
  }

  if (selectedAreas.includes('electrical')) {
    total += PRICING_DATA.permits.electricalPermit;
  }

  if (selectedAreas.includes('plumbing')) {
    total += PRICING_DATA.permits.plumbingPermit;
  }

  if (selectedAreas.includes('hvac')) {
    total += PRICING_DATA.permits.mechanicalPermit;
  }

  if (selectedAreas.includes('addition')) {
    total += sqft * PRICING_DATA.permits.additionPerSqFt;
  }

  return Math.round(total);
}

function calculateTimeline(sqft: number, scope: ProjectScope | null): string {
  if (!scope) return '4-8 weeks';

  const baseDays = sqft * PRICING_DATA.timelines.daysPerSqFtRemodel;
  const scopeMultiplier = PROJECT_SCOPES[scope].multiplier;
  const totalDays = Math.ceil(baseDays * scopeMultiplier);

  const weeks = Math.ceil(totalDays / 7);

  if (weeks <= 4) return `${weeks} weeks`;
  if (weeks <= 8) return `${weeks} weeks (${Math.ceil(weeks / 4)} months)`;
  
  const months = Math.ceil(weeks / 4);
  return `${months} months`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
