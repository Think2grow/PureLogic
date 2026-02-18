// Utah Industry-Standard Construction Pricing Data
// All prices are approximations based on 2026 Utah market averages

export interface PricingTier {
  standard: number;
  premium: number;
  luxury: number;
}

export const PRICING_DATA = {
  // Base costs per square foot by project type
  baseCosts: {
    basicRemodel: { min: 10, max: 60 },
    midRangeRemodel: { min: 80, max: 150 },
    highEndRemodel: { min: 150, max: 400 },
    newBasicHome: { min: 150, max: 200 },
    standardNewHome: { min: 180, max: 280 },
    customBuild: { min: 280, max: 600 },
    luxuryBuild: { min: 500, max: 1000 }
  },

  // Flooring (per sq ft)
  flooring: {
    carpetBuilder: { standard: 3, premium: 5, luxury: 8 },
    vinylPlank: { standard: 3.5, premium: 6, luxury: 10 }, // Reduced standard from $4 - industry avg $3-3.50/sqft
    hardwood: { standard: 8, premium: 12, luxury: 16 }, // Reduced luxury from $18 to $16/sqft - within market $15-17
    engineeredHardwood: { standard: 6, premium: 10, luxury: 15 },
    tileCeramic: { standard: 5, premium: 8, luxury: 12 },
    tilePorcelain: { standard: 7, premium: 11, luxury: 16 },
    tileNaturalStone: { standard: 10, premium: 15, luxury: 25 }
  },

  // Kitchen (per unit or sq ft)
  kitchen: {
    cabinetsPerLinearFt: { standard: 150, premium: 300, luxury: 600 },
    countertopsPerSqFt: {
      laminate: 25,
      quartz: 75,
      granite: 85,
      marble: 120
    },
    sinkFaucet: { standard: 400, premium: 800, luxury: 1500 },
    backsplashPerSqFt: { standard: 12, premium: 25, luxury: 50 },
    appliancePackage: { standard: 2500, premium: 6000, luxury: 15000 }
  },

  // Bathroom (per unit)
  bathroom: {
    vanity: { standard: 500, premium: 1500, luxury: 3500 }, // Reduced standard from $600 - aligned with industry avg ($400-500)
    toilet: { standard: 250, premium: 500, luxury: 1200 },
    showerFiberglass: 1200,
    showerTilePerSqFt: { standard: 15, premium: 25, luxury: 45 },
    tubStandard: 500,
    tubSoaking: 2000,
    fixtures: { standard: 400, premium: 900, luxury: 2000 }
  },

  // Walls & Ceilings (per sq ft)
  walls: {
    drywallInstall: 2.5,
    drywallRepair: 3,
    texture: 1.5,
    paintOnCoat: 1.5,
    paintTwoCoats: 2.5,
    trimBaseboardsPerLinearFt: { standard: 3, premium: 6, luxury: 12 },
    crownMoldingPerLinearFt: { standard: 5, premium: 8, luxury: 15 }
  },

  // Doors & Windows (per unit)
  doors: {
    interiorHollowCore: 200,
    interiorSolidCore: 350,
    exteriorStandard: 800,
    exteriorFiberglass: 1400,
    slidingGlass: 2000,
    frenchDoors: 2500
  },

  windows: {
    vinylStandard: 450,
    vinylEnergyEfficient: 650,
    woodComposite: 900
  },

  // Foundation (per sq ft)
  foundation: {
    slabOnGrade: 8,
    crawlspace: 12,
    basementUnfinished: 35,
    basementFinished: 45
  },

  // Framing & Structural (per sq ft)
  framing: {
    wallFraming: 6,
    ceilingFraming: 5,
    floorJoists: 7,
    beamPerLinearFt: 25,
    structuralModification: 15
  },

  // Roofing (per sq ft)
  roofing: {
    asphaltShingles30Year: 4.5,
    architecturalShingles: 6,
    metal: 12,
    tile: 15,
    flatRoofMembrane: 8
  },

  // Exterior (per sq ft)
  exterior: {
    vinylSiding: 5,
    fiberCementSiding: 8,
    brickVeneer: 15,
    stucco: 9,
    stoneVeneer: 20
  },

  // HVAC (per unit)
  hvac: {
    basicFurnaceAC: 5000,
    highEfficiencySystem: 8500,
    ductworkPerLinearFt: 12,
    miniSplit: 3500
  },

  // Electrical (per unit)
  electrical: {
    standardOutlet: 75,
    gfciOutlet: 100,
    lightFixture: { standard: 175, premium: 400, luxury: 1000 }, // Increased standard from $150 - competitive with market ($150-200)
    recessedLight: 125,
    ceilingFan: 250,
    panelUpgrade: 2500,
    subpanel: 1200,
    evCharger: 1500
  },

  // Plumbing (per unit or linear ft)
  plumbing: {
    roughInPerFixture: 400,
    waterLinePerLinearFt: 15,
    drainLinePerLinearFt: 18,
    waterHeaterStandard: 1200,
    waterHeaterTankless: 2500,
    gasLinePerLinearFt: 20
  },

  // Specialty Items
  specialty: {
    fireplaceGasInsert: 3500,
    fireplaceWoodBurning: 6000,
    builtInShelvingPerLinearFt: { standard: 75, premium: 150, luxury: 300 },
    closetSystem: { standard: 800, premium: 2000, luxury: 5000 },
    laundryHookups: 600,
    smartHomePackage: { basic: 1500, advanced: 5000 },
    securitySystemPrewire: 800
  },

  // Permits & Inspections (per project or sq ft)
  permits: {
    kitchenRemodel: 600, // Increased from $500 - Utah actual: $400-800, SLC average $600+
    bathroomRemodel: 450, // Increased from $350 - Utah actual: $300-600
    additionPerSqFt: 0.5,
    newConstructionPerSqFt: 0.75,
    electricalPermit: 200,
    plumbingPermit: 200,
    mechanicalPermit: 200,
    reInspectionFee: 100
  },

  // Labor Rates (per hour)
  labor: {
    generalLaborer: 35,
    skilledCarpenter: 55,
    electrician: 75,
    plumber: 80,
    hvacTech: 85,
    painter: 45,
    tileInstaller: 50,
    drywallInstaller: 45
  },

  // Project Management & Overhead
  overhead: {
    projectManagementPercent: 15,
    designPlanningPercent: 5,
    engineeringFlat: 2500,
    architecturalDrawings: 3500,
    materialWastePercent: 10,
    contingencyPercent: 10,
    profitMarginPercent: 20
  },

  // Other Fees
  otherFees: {
    dumpsterRental: 500,
    portableToiletPerMonth: 150,
    tempUtilities: 300,
    siteProtection: 200,
    finalCleaning: 400
  },

  // Minimum Project Fees
  minimums: {
    minimumProjectSize: 1000,
    serviceCallFee: 150,
    consultationFee: 200 // Refundable if project proceeds
  },

  // Discounts & Upcharges (percentages)
  modifiers: {
    multiRoomDiscount: 5,
    occupiedHomeUpcharge: 10,
    rushJobUpcharge: 15,
    offSeasonDiscount: 8,
    referralDiscount: 250 // Flat dollar amount
  },

  // Timeline Factors
  timelines: {
    daysPerSqFtRemodel: 0.5,
    materialLeadTimeWeeks: 4,
    inspectionWaitDays: 3
  },

  // Travel Fees (by county/distance)
  travelFees: {
    utahCounty: 0,
    saltLakeCounty: 0,
    davisCounty: { min: 350, max: 600 },
    weberCounty: { min: 500, max: 800 },
    extended: { min: 600, max: 1000 }
  }
} as const;

// Tier multipliers for quick calculations
export const TIER_MULTIPLIERS = {
  standard: 1.0,
  premium: 1.5,
  luxury: 2.5
} as const;

// Project scope definitions
export const PROJECT_SCOPES = {
  minorRepair: {
    name: 'Minor Repair/Update',
    multiplier: 0.6,
    description: 'Small fixes, updates, or cosmetic changes'
  },
  partialRemodel: {
    name: 'Partial Remodel',
    multiplier: 1.0,
    description: 'Significant updates to specific areas'
  },
  fullRenovation: {
    name: 'Full Renovation',
    multiplier: 1.4,
    description: 'Complete transformation of space'
  },
  newConstruction: {
    name: 'New Construction',
    multiplier: 1.8,
    description: 'Building from ground up'
  }
} as const;

// Service areas with travel fee calculation
export const SERVICE_AREAS = [
  { 
    name: 'Utah County', 
    cities: ['Provo', 'Orem', 'Lehi', 'American Fork', 'Pleasant Grove'],
    travelFee: 0 
  },
  { 
    name: 'Salt Lake County', 
    cities: ['Salt Lake City', 'Sandy', 'West Jordan', 'Draper', 'South Jordan'],
    travelFee: 0 
  },
  { 
    name: 'Davis County', 
    cities: ['Bountiful', 'Farmington', 'Kaysville', 'Layton'],
    travelFeeRange: { min: 350, max: 600 }
  },
  { 
    name: 'Weber County', 
    cities: ['Ogden', 'Roy', 'Clearfield'],
    travelFeeRange: { min: 500, max: 800 }
  },
  { 
    name: 'Extended Area', 
    cities: ['Other'],
    travelFeeRange: { min: 600, max: 1000 }
  }
] as const;

export type Tier = 'standard' | 'premium' | 'luxury';
export type ProjectScope = keyof typeof PROJECT_SCOPES;
