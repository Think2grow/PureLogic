// Monthly Calculator Audit Tracker
// Copy this file content to a Google Sheet or Excel for easy monthly tracking
// Purpose: Compare calculator estimates vs. actual project costs

// MONTH: [YOUR MONTH HERE]
// Instructions: 
// 1. For each completed project, run the calculator with same specs
// 2. Note the estimated total
// 3. Enter actual final invoice total
// 4. Spreadsheet calculates variance
// 5. If variance >10%, review and note reason

const AUDIT_TEMPLATE = {
  spreadsheet: {
    name: "PureLogic Calculator Audit - 2026",
    sheets: [
      {
        name: "Master Audit",
        columns: [
          "Date Completed",
          "Project Name",
          "Category (K/B/F)",
          "Sqft",
          "Scope",
          "Tier",
          "Est. Total (Calculator)",
          "Actual Total (Invoice)",
          "Variance $",
          "Variance %",
          "Notes"
        ],
        exampleRow: [
          "2026-01-15",
          "Smith Kitchen Remodel",
          "Kitchen",
          "500",
          "Full Renovation",
          "Premium",
          "$52,000",
          "$54,200",
          "+$2,200",
          "+4.2%",
          "Labor ran over due to structural issues"
        ]
      },
      {
        name: "Category Summary",
        description: "Auto-calculated monthly averages by type",
        metrics: [
          "Kitchen Estimates - Avg Variance",
          "Bathroom Estimates - Avg Variance",
          "Flooring Estimates - Avg Variance",
          "Overall Avg Variance",
          "Estimates High (count)",
          "Estimates Low (count)"
        ]
      },
      {
        name: "Pricing Reference",
        description: "Quick lookup during audit",
        columns: [
          "Category",
          "Item",
          "Current Formula in Calculator",
          "Industry Average",
          "Notes"
        ]
      }
    ]
  },

  // Google Sheets Formula
  formulasForGoogleSheets: {
    variance_dollars: "=G2-H2",  // Est Total - Actual
    variance_percent: "=(G2-H2)/H2*100",  // Variance $ / Actual * 100
    monthly_avg_kitchen: "=AVERAGEIF(D:D,\"Kitchen\",J:J)",
    highlight_warning: "highlight variance column > 10% or < -10%"
  },

  // Simple scoring
  quality_metrics: {
    excellent: "Variance -3% to +3%",
    good: "Variance -5% to +5%",
    acceptable: "Variance -8% to +8%",
    needs_review: "Variance outside -10% to +10%"
  }
};

// PRICING CHANGES TO IMPLEMENT IMMEDIATELY
const RECOMMENDED_CHANGES = [
  {
    file: "src/data/calculator-pricing.ts",
    changes: [
      {
        line: "~line 46",
        current: "vanity: { standard: 600, premium: 1500, luxury: 3500 },",
        updated: "vanity: { standard: 500, premium: 1500, luxury: 3500 }, // Reduced standard from $600 to match industry avg",
        reason: "Industry average for standard vanity is $400-500, was overpricing"
      },
      {
        line: "~line 26",
        current: "vinylPlank: { standard: 4, premium: 6, luxury: 10 },",
        updated: "vinylPlank: { standard: 3.50, premium: 6, luxury: 10 }, // Reduced from $4 to $3.50/sqft",
        reason: "Industry average $3-3.50/sqft, was at high end"
      },
      {
        line: "~line 25",
        current: "hardwood: { standard: 8, premium: 12, luxury: 18 },",
        updated: "hardwood: { standard: 8, premium: 12, luxury: 16 }, // Reduced luxury from $18 to $16/sqft",
        reason: "Luxury tier was 10-15% above market"
      },
      {
        line: "~line 157",
        current: "kitchenRemodel: 500,",
        updated: "kitchenRemodel: 600, // Increased from $500 based on Salt Lake City permit data",
        reason: "Actual Salt Lake City kitchen permits: $600-800"
      },
      {
        line: "~line 158",
        current: "bathroomRemodel: 350,",
        updated: "bathroomRemodel: 450, // Increased from $350 based on Utah county data",
        reason: "Actual Utah bathroom permits: $400-600"
      },
      {
        line: "~line 199",
        current: "lightFixture: { standard: 150, premium: 400, luxury: 1000 },",
        updated: "lightFixture: { standard: 175, premium: 400, luxury: 1000 }, // Raised standard by $25",
        reason: "Competitive but slightly below market; better reflects quality"
      }
    ]
  }
];

// QUICK VALIDATION CHECKLIST
const QUICK_VALIDATE = {
  monthly: [
    "☐ Completed 3+ projects with calculator estimates recorded?",
    "☐ Pulled actual invoices for those projects",
    "☐ Entered data into audit spreadsheet",
    "☐ Calculated average variance by category",
    "☐ Any category >10% off? Flag for review",
    "☐ Add notes to variance column (scope changes, market factors, etc.)",
    "☐ If needed, document price adjustment with date"
  ],
  
  quarterly: [
    "☐ Review 3 months of audit data",
    "☐ Calculate category trends (consistently high/low?)",
    "☐ Update pricing in calculator-pricing.ts if needed",
    "☐ Test calculator against 2-3 sample projects",
    "☐ Compare to industry benchmarks (RSMeans, NKBA)",
    "☐ Document any changes with date and reason",
    "☐ Commit changes to git"
  ],

  annually: [
    "☐ Full pricing audit against all categories",
    "☐ Review labor rate increases (typical 3-5%/year)",
    "☐ Check material cost trends",
    "☐ Update industry benchmark sources",
    "☐ Validate profit margin is still 20%",
    "☐ Adjust overhead percentages if needed",
    "☐ Create audit report for business records"
  ]
};

export { AUDIT_TEMPLATE, RECOMMENDED_CHANGES, QUICK_VALIDATE };
