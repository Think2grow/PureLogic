export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQ[] = [
  {
    category: "General",
    question: "Are you licensed and insured in Utah?",
    answer: "Yes, we hold an active Utah contractor license (verify our license number on the Utah DOPL website). We carry comprehensive general liability insurance and workers' compensation coverage to protect you and our team."
  },
  {
    category: "General",
    question: "What areas do you serve?",
    answer: "We serve Salt Lake County, Utah County, and surrounding areas including Salt Lake City, Provo, Orem, Sandy, Draper, Lehi, American Fork, and other nearby communities. Contact us to confirm service in your specific area."
  },
  {
    category: "General",
    question: "How do I get started with a project estimate?",
    answer: "Fill out our estimate request form or give us a call. We'll schedule a convenient time to visit your property, discuss your vision and needs, take measurements, and provide a detailed estimate typically within 5-7 business days."
  },
  {
    category: "Process",
    question: "What does your remodeling process look like?",
    answer: "Our process includes: (1) Initial consultation and site visit, (2) Detailed estimate and proposal, (3) Design phase with selections, (4) Contract signing and scheduling, (5) Permits and preparation, (6) Construction with regular updates, (7) Final walkthrough and warranty explanation."
  },
  {
    category: "Process",
    question: "How long will my project take?",
    answer: "Timelines vary by project scope. Small bathroom remodels might take 4-6 weeks, while full kitchen remodels typically take 8-12 weeks. Home additions can take 3-6 months, and custom homes take 12-18 months. We provide specific timelines during the estimate phase."
  },
  {
    category: "Process",
    question: "Will I need to move out during construction?",
    answer: "Most clients stay in their homes during remodeling projects. We create dust barriers, maintain clean work areas, and can often set up temporary facilities (like a basic kitchen setup). For extensive whole-home remodels, temporary relocation may be more comfortable but isn't always required."
  },
  {
    category: "Cost",
    question: "How much does a typical kitchen remodel cost in Utah?",
    answer: "Most kitchen remodels in Utah range from $35,000 to $65,000, depending on size, materials, and scope. Simple updates might start around $25,000, while high-end remodels can exceed $85,000. We provide detailed estimates based on your specific needs and selections."
  },
  {
    category: "Cost",
    question: "Do you offer financing options?",
    answer: "We work with several reputable lenders who specialize in home improvement financing. We can provide referrals and information to help you explore financing options that fit your budget."
  },
  {
    category: "Cost",
    question: "What payment schedule do you use?",
    answer: "We typically use a progress-based payment schedule: a deposit at contract signing, milestone payments during construction, and final payment upon completion. We never require full payment upfront, and our payment terms are clearly outlined in your contract."
  },
  {
    category: "Permits",
    question: "Do you handle permits and inspections?",
    answer: "Yes, we obtain all necessary permits and coordinate all required inspections with local building departments. Permit costs are typically included in your project estimate, and we ensure all work meets Utah building codes."
  },
  {
    category: "Permits",
    question: "What permits are typically required for home remodeling in Utah?",
    answer: "Most remodeling projects require building permits for structural, electrical, and plumbing work. Smaller cosmetic updates may not require permits. We assess permit requirements during the estimate phase and handle all applications and inspections."
  },
  {
    category: "Communication",
    question: "How will you communicate with me during the project?",
    answer: "We provide regular updates via your preferred method (text, email, or phone calls). You'll have a dedicated project manager who coordinates everything and is available to answer questions. We also schedule in-person check-ins at key milestones."
  },
  {
    category: "Communication",
    question: "What if I want to make changes during construction?",
    answer: "Changes happen! We handle change orders professionally. We'll discuss the impact on timeline and cost, provide written change order documentation, and update the schedule accordingly. Clear communication prevents surprises."
  },
  {
    category: "Warranty",
    question: "What warranty do you provide?",
    answer: "We provide a one-year workmanship warranty on all our projects. Many materials and fixtures come with manufacturer warranties ranging from 1 to 25 years. We'll explain all applicable warranties during your final walkthrough."
  },
  {
    category: "Warranty",
    question: "What happens if something goes wrong after the project is complete?",
    answer: "If you experience any issues related to our workmanship within the warranty period, contact us immediately. We'll schedule a visit to assess and address the issue promptly. Your satisfaction and the quality of our work are our top priorities."
  }
];

export interface Testimonial {
  text: string;
  author: string;
  location: string;
  projectType: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    text: "PureLogic exceeded our expectations in every way. The quality of craftsmanship is outstanding, and they were incredibly professional throughout the entire kitchen remodel. They finished on schedule and stayed within budget. Highly recommend!",
    author: "Jennifer & Mark T.",
    location: "Draper, UT",
    projectType: "Kitchen Remodel",
    rating: 5
  },
  {
    text: "Our primary bathroom went from boring to breathtaking. The attention to detail in the tile work is exceptional. The team was respectful of our home, cleaned up daily, and communicated clearly about the schedule. Worth every penny!",
    author: "Rachel K.",
    location: "South Jordan, UT",
    projectType: "Bathroom Remodel",
    rating: 5
  },
  {
    text: "PureLogic made our dream of staying in our neighborhood come true. The addition blends perfectly with our home. The team managed everything professionally, and we were able to stay in our home throughout construction. Couldn't be happier!",
    author: "David & Sarah M.",
    location: "Lehi, UT",
    projectType: "Home Addition",
    rating: 5
  },
  {
    text: "Our basement went from a scary storage dungeon to our favorite part of the house. The quality of work is outstanding, and the space has already paid for itself in family memories. The project manager kept us informed every step of the way.",
    author: "Amanda L.",
    location: "Sandy, UT",
    projectType: "Basement Finish",
    rating: 5
  },
  {
    text: "Building a custom home felt overwhelming at first, but PureLogic made it an enjoyable journey. Their communication was excellent, their craftsmanship is impeccable, and they helped us navigate every decision. We're in love with our home!",
    author: "Michael & Lisa P.",
    location: "Alpine, UT",
    projectType: "Custom Home",
    rating: 5
  },
  {
    text: "PureLogic understood our vision for the mid-century remodel immediately. They respected the home's history while making it functional and beautiful for our young family. The project was complex, but they managed it flawlessly.",
    author: "Chris & Emma W.",
    location: "Orem, UT",
    projectType: "Whole Home Remodel",
    rating: 5
  },
  {
    text: "From the initial consultation to the final walkthrough, working with PureLogic was a pleasure. They listened to our needs, provided expert recommendations, and delivered a beautiful finished product. Our friends can't believe the transformation!",
    author: "Brandon S.",
    location: "West Jordan, UT",
    projectType: "Kitchen & Bath Remodel",
    rating: 5
  },
  {
    text: "Honest, reliable, and talented. PureLogic handled our complex renovation with skill and professionalism. They addressed every concern promptly and stood behind their work. We've already recommended them to several friends.",
    author: "Michelle R.",
    location: "Pleasant Grove, UT",
    projectType: "Home Remodel",
    rating: 5
  }
];
