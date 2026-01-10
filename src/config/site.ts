export const siteConfig = {
  // Business Information
  businessName: "Pure Logic Solutions",
  tagline: "Premium General Contracting Services in Utah",
  
  // Contact Information
  phone: "+1 801-905-8175",
  email: "Purelogicsolutionsutah@gmail.com",
  address: {
    street: "123 Main Street",
    city: "Salt Lake City",
    state: "UT",
    zip: "84101"
  },
  
  // Utah Contractor License Information
  utahLicenseNumber: "14253923-5501", // Utah DOPL license number
  licenseVerifyUrl: "https://secure.utah.gov/llv/search/index.html", // Utah DOPL verification
  
  // Insurance & Bonding - ONLY display if confirmed and set to true
  isInsuredBonded: false, // Set to true once confirmed
  
  // Google Reviews (placeholders)
  googleRating: 4.9,
  reviewCount: 127,
  googleReviewsUrl: "#", // Replace with actual Google Business Profile review link
  
  // Service Areas
  serviceAreas: [
    "Salt Lake County",
    "Utah County",
    "Davis County",
    "Weber County",
    "Salt Lake City",
    "Provo",
    "Orem",
    "Sandy",
    "West Jordan",
    "Draper",
    "South Jordan",
    "Lehi",
    "American Fork",
    "Pleasant Grove"
  ],
  
  // Primary CTA
  primaryCtaLink: "/contact",
  primaryCtaText: "Get a Free Estimate",
  
  // Social Media
  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "#"
  },
  
  // Business Hours
  hours: {
    weekdays: "Monday - Friday: 7:00 AM - 6:00 PM",
    saturday: "Saturday: 8:00 AM - 4:00 PM",
    sunday: "Sunday: Closed"
  },
  
  // SEO Defaults
  seo: {
    defaultTitle: "Pure Logic Solutions | Utah General Contractor",
    titleTemplate: "%s | Pure Logic Solutions",
    description: "Award-winning general contractor serving Utah County and Salt Lake County. Expert kitchen remodels, bathroom renovations, home additions, and custom builds. Licensed, insured, and locally trusted.",
    ogImage: "/og-image.jpg"
  }
} as const;

export type SiteConfig = typeof siteConfig;
