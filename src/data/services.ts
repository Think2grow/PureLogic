export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  featured: boolean;
}

export const services: Service[] = [
  {
    slug: "kitchen-remodel",
    title: "Kitchen Remodeling",
    shortDescription: "Transform your kitchen into a functional, beautiful space that adds value to your home.",
    icon: "🏠",
    featured: true
  },
  {
    slug: "bathroom-remodel",
    title: "Bathroom Remodeling",
    shortDescription: "Create a spa-like retreat with expert bathroom design and construction.",
    icon: "🚿",
    featured: true
  },
  {
    slug: "home-additions",
    title: "Home Additions",
    shortDescription: "Expand your living space with professionally designed and built home additions.",
    icon: "🏗️",
    featured: true
  },
  {
    slug: "basement-finish",
    title: "Basement Finishing",
    shortDescription: "Turn your unfinished basement into valuable living space for your family.",
    icon: "🛋️",
    featured: true
  },
  {
    slug: "custom-homes",
    title: "Custom Home Builds",
    shortDescription: "Build your dream home from the ground up with our custom home construction services.",
    icon: "🏡",
    featured: true
  },
  {
    slug: "whole-home-remodel",
    title: "Whole Home Remodels",
    shortDescription: "Complete home transformations that blend style, function, and value.",
    icon: "🔨",
    featured: false
  }
];

export interface ServiceDetail {
  slug: string;
  title: string;
  description: string;
  whoItsFor: string[];
  costRange: {
    min: number;
    max: number;
    note: string;
  };
  timeline: string;
  features: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const serviceDetails: Record<string, ServiceDetail> = {
  "kitchen-remodel": {
    slug: "kitchen-remodel",
    title: "Kitchen Remodeling",
    description: "Your kitchen is the heart of your home. Whether you're looking for a complete gut renovation or a strategic update, our kitchen remodeling services combine expert craftsmanship with thoughtful design to create a space you'll love for years to come.",
    whoItsFor: [
      "Homeowners looking to increase property value",
      "Families needing better function and flow",
      "Anyone wanting modern, energy-efficient appliances and fixtures",
      "Those preparing to sell their home"
    ],
    costRange: {
      min: 25000,
      max: 85000,
      note: "Cost varies based on size, materials, structural changes, and appliance selections. Most kitchen remodels in Utah fall between $35,000-$65,000."
    },
    timeline: "6-12 weeks depending on scope and material lead times",
    features: [
      "Custom cabinetry design and installation",
      "Countertop selection (quartz, granite, marble)",
      "Flooring replacement or refinishing",
      "Lighting design and electrical upgrades",
      "Plumbing reconfiguration if needed",
      "Appliance coordination and installation",
      "Backsplash tile work",
      "Paint and finishing details"
    ],
    faqs: [
      {
        question: "How long does a typical kitchen remodel take?",
        answer: "Most kitchen remodels take 8-10 weeks from demolition to completion. Minor updates can be completed in 4-6 weeks, while extensive remodels with structural changes may take 12-14 weeks. We provide a detailed timeline during the estimate phase."
      },
      {
        question: "Can I live in my home during the renovation?",
        answer: "Yes, most homeowners remain in their homes during kitchen remodels. We'll set up a temporary kitchen area and work to minimize disruption. We coordinate with you on timing and access to ensure the process is as smooth as possible."
      },
      {
        question: "What's the best return on investment for kitchen upgrades?",
        answer: "In the Utah market, mid-range kitchen remodels typically recoup 60-75% of their cost at resale. The best ROI comes from quality cabinets, durable countertops, modern appliances, and good lighting. We help you prioritize investments based on your goals."
      },
      {
        question: "Do you handle permits and inspections?",
        answer: "Yes, we obtain all necessary permits and coordinate inspections with local building departments. This is included in our service and ensures your remodel meets all Utah building codes."
      }
    ]
  },
  "bathroom-remodel": {
    slug: "bathroom-remodel",
    title: "Bathroom Remodeling",
    description: "From powder rooms to primary suite bathrooms, we create beautiful, functional spaces that enhance your daily routine. Our bathroom remodeling services focus on quality materials, expert installation, and designs that stand the test of time.",
    whoItsFor: [
      "Homeowners wanting to upgrade outdated bathrooms",
      "Those seeking better accessibility and aging-in-place features",
      "Families needing to add bathroom space",
      "Anyone looking for a spa-like retreat at home"
    ],
    costRange: {
      min: 15000,
      max: 45000,
      note: "Costs depend on bathroom size, fixture quality, tile selections, and structural changes. Average bathroom remodels in Utah range from $20,000-$35,000."
    },
    timeline: "4-8 weeks depending on complexity and material availability",
    features: [
      "Custom tile showers and tub surrounds",
      "Vanity design and installation",
      "Modern plumbing fixtures",
      "Heated floors (optional)",
      "Improved ventilation and lighting",
      "Water-resistant wall systems",
      "Accessibility features (grab bars, walk-in showers)",
      "High-quality finishes and hardware"
    ],
    faqs: [
      {
        question: "Should I remodel or add a new bathroom?",
        answer: "If you have adequate square footage in an existing bathroom, remodeling is usually more cost-effective. Adding a new bathroom makes sense when you need additional bathrooms or have unused space (like under stairs or in a large closet). We can assess your home and recommend the best approach."
      },
      {
        question: "How do you handle water damage discovered during demolition?",
        answer: "Water damage is common in older bathrooms. When we discover it, we document it immediately, provide a clear scope of repair, and give you a transparent cost estimate. We address all water damage properly to prevent future issues."
      },
      {
        question: "What's the most important element in a bathroom remodel?",
        answer: "Proper waterproofing and ventilation are critical for longevity. Beyond that, we recommend investing in quality fixtures and timeless tile selections that won't feel dated in 5-10 years. Good lighting is also essential and often overlooked."
      }
    ]
  },
  "home-additions": {
    slug: "home-additions",
    title: "Home Additions",
    description: "Need more space but love your location? Home additions are an excellent way to expand your living area without the hassle of moving. We specialize in seamless additions that blend perfectly with your existing home's architecture and style.",
    whoItsFor: [
      "Growing families needing additional bedrooms",
      "Homeowners wanting expanded living space",
      "Those seeking a home office or studio",
      "Families caring for aging parents (in-law suites)"
    ],
    costRange: {
      min: 75000,
      max: 250000,
      note: "Home addition costs in Utah typically range from $200-$400 per square foot. Final cost depends on size, foundation requirements, finishes, and complexity."
    },
    timeline: "3-6 months depending on size and permit approval times",
    features: [
      "Architectural design and engineering",
      "Foundation and structural work",
      "Roofing that matches existing home",
      "Exterior siding to match current aesthetic",
      "HVAC extension and electrical",
      "Insulation and energy efficiency",
      "Interior finishing (flooring, paint, trim)",
      "Permit coordination and inspections"
    ],
    faqs: [
      {
        question: "Do I need to move out during a home addition?",
        answer: "Most homeowners stay in their homes during additions. We create a protective barrier between the construction area and your living space. There may be brief disruptions for utility connections, which we schedule in advance."
      },
      {
        question: "How do you match the existing home's style?",
        answer: "We carefully analyze your home's architectural style, materials, and finishes. We source matching or complementary materials and pay close attention to details like roofline, siding, windows, and trim to ensure a seamless integration."
      },
      {
        question: "What permits are required for home additions in Utah?",
        answer: "Home additions require building permits from your local municipality. We handle all permit applications, engineering requirements, and inspection scheduling. Permit approval typically takes 2-6 weeks depending on the jurisdiction."
      }
    ]
  },
  "basement-finish": {
    slug: "basement-finish",
    title: "Basement Finishing",
    description: "Transform your dark, unused basement into bright, valuable living space. Whether you envision a family room, home theater, guest suite, or home gym, we'll help you maximize this often-overlooked area of your home.",
    whoItsFor: [
      "Families needing more functional living space",
      "Homeowners wanting to increase property value",
      "Those seeking a rental income opportunity",
      "Anyone wanting a dedicated entertainment or recreation area"
    ],
    costRange: {
      min: 35000,
      max: 90000,
      note: "Basement finishing costs vary based on square footage, ceiling height, existing utilities, and finish level. Most Utah basements cost $45-$75 per square foot to finish."
    },
    timeline: "6-12 weeks for most projects",
    features: [
      "Framing and drywall installation",
      "Egress windows for safety and code compliance",
      "Bathroom addition (optional)",
      "Kitchenette or wet bar (optional)",
      "Flooring (carpet, LVP, tile)",
      "Lighting and electrical outlets",
      "Proper insulation and climate control",
      "Paint and trim finishing"
    ],
    faqs: [
      {
        question: "Do I need an egress window in my finished basement?",
        answer: "Yes, Utah building code requires egress windows in basement bedrooms for emergency exit and rescue. Even if you're not adding bedrooms now, we often recommend installing egress windows for future flexibility and added natural light."
      },
      {
        question: "How do you handle moisture issues in basements?",
        answer: "Before finishing, we assess for moisture problems and address any issues with proper drainage, sump pumps, or waterproofing. We also use moisture-resistant materials and ensure proper vapor barriers to prevent future problems."
      },
      {
        question: "Can you add a bathroom to my basement?",
        answer: "Yes, we regularly add bathrooms to basement finishes. We'll assess your existing plumbing and determine the best location based on drain lines and access. Bathroom additions increase value and functionality significantly."
      }
    ]
  },
  "custom-homes": {
    slug: "custom-homes",
    title: "Custom Home Builds",
    description: "Building a custom home is one of life's most significant investments. We guide you through every step—from initial design concepts to final walkthrough—ensuring your vision becomes reality. Our process emphasizes communication, quality craftsmanship, and attention to detail.",
    whoItsFor: [
      "Families ready to build their forever home",
      "Those who can't find existing homes that meet their needs",
      "Buyers with specific design or accessibility requirements",
      "Anyone wanting maximum customization and control"
    ],
    costRange: {
      min: 400000,
      max: 1500000,
      note: "Custom home costs vary widely based on size, location, site conditions, finish level, and design complexity. Current Utah construction costs range from $200-$350+ per square foot."
    },
    timeline: "10-18 months from design to completion",
    features: [
      "Collaborative design and architectural planning",
      "Site preparation and foundation",
      "Structural framing and roofing",
      "Complete mechanical systems (HVAC, plumbing, electrical)",
      "Custom interior finishes and cabinetry",
      "Exterior materials and landscaping coordination",
      "Energy-efficient building envelope",
      "Project management and scheduling",
      "Regular communication and updates",
      "Final walkthrough and warranty"
    ],
    faqs: [
      {
        question: "How long does it take to build a custom home?",
        answer: "From initial design to move-in, expect 12-18 months. Design and permitting typically take 2-4 months, and construction takes 8-12 months depending on size and complexity. Weather and material availability can impact timelines."
      },
      {
        question: "What's included in your custom home pricing?",
        answer: "We provide detailed, transparent estimates that include all construction costs, permits, and our project management. Site costs (lot purchase, utilities, grading) are typically separate. We'll provide a complete breakdown so there are no surprises."
      },
      {
        question: "How involved will I be in the building process?",
        answer: "As involved as you want to be. We schedule regular meetings to review progress and make selections. You'll have input on all major decisions while we handle day-to-day management, subcontractor coordination, and problem-solving."
      },
      {
        question: "Do you work with architects, or do you provide design services?",
        answer: "We work with several excellent local architects and can provide referrals based on your style and budget. We can also work with your chosen architect. Either way, we collaborate closely during design to ensure buildability and cost-effectiveness."
      }
    ]
  }
};
