export interface Project {
  slug: string;
  title: string;
  category: string;
  location: string;
  featured: boolean;
  thumbnailImage: string;
  images: string[];
  completionDate: string;
  budget: {
    min: number;
    max: number;
  };
  timeline: string;
  scope: string[];
  problem: string;
  solution: string;
  testimonial: {
    text: string;
    author: string;
    role: string;
    location: string;
    projectType: string;
    rating: number;
  };
}

export const projects: Project[] = [
  {
    slug: "modern-draper-kitchen",
    title: "Modern Farmhouse Kitchen Remodel",
    category: "Kitchen Remodel",
    location: "Draper, UT",
    featured: true,
    thumbnailImage: "/images/projects/draper-kitchen-thumb.jpg",
    images: [
      "/images/projects/draper-kitchen-1.jpg",
      "/images/projects/draper-kitchen-2.jpg",
      "/images/projects/draper-kitchen-3.jpg",
      "/images/projects/draper-kitchen-before.jpg"
    ],
    completionDate: "2025-11",
    budget: { min: 55000, max: 65000 },
    timeline: "9 weeks",
    scope: [
      "Complete kitchen gut and redesign",
      "Custom white shaker cabinetry with soft-close hardware",
      "Quartz countertops with waterfall island",
      "Subway tile backsplash",
      "New hardwood flooring",
      "Recessed and pendant lighting",
      "High-end stainless appliances",
      "Farmhouse sink and modern fixtures"
    ],
    problem: "The existing kitchen was cramped, dark, and stuck in the 1990s. The layout made cooking and entertaining difficult, with limited counter space and poor traffic flow. The homeowners wanted a bright, functional space that could handle their busy family life.",
    solution: "We removed a non-structural wall to open up the kitchen to the dining area, creating a spacious, light-filled room. A large island with seating became the centerpiece, providing prep space, storage, and a gathering spot. Custom cabinetry maximized every inch of storage, while thoughtful lighting made the space bright and inviting.",
    testimonial: {
      text: "PureLogic transformed our dark, cramped kitchen into the heart of our home. The team was professional, communicative, and incredibly detail-oriented. They finished on time and handled every surprise with expertise. We couldn't be happier!",
      author: "Jennifer & Mark T.",
      role: "Homeowners",
      location: "Draper, UT",
      projectType: "Kitchen Remodel",
      rating: 5
    }
  },
  {
    slug: "south-jordan-primary-bath",
    title: "Luxury Primary Bathroom Retreat",
    category: "Bathroom Remodel",
    location: "South Jordan, UT",
    featured: true,
    thumbnailImage: "/images/projects/sj-bath-thumb.jpg",
    images: [
      "/images/projects/sj-bath-1.jpg",
      "/images/projects/sj-bath-2.jpg",
      "/images/projects/sj-bath-3.jpg"
    ],
    completionDate: "2025-09",
    budget: { min: 35000, max: 42000 },
    timeline: "6 weeks",
    scope: [
      "Frameless glass walk-in shower",
      "Freestanding soaking tub",
      "Double vanity with quartz tops",
      "Large format tile flooring",
      "Heated floor system",
      "Custom tile shower with bench and niche",
      "Modern fixtures and hardware",
      "Improved ventilation and lighting"
    ],
    problem: "The primary bathroom was builder-grade and hadn't been updated in 20 years. A small fiberglass shower and basic vanity didn't match the homeowners' vision for a relaxing retreat.",
    solution: "We reconfigured the layout to accommodate a luxurious walk-in shower and freestanding tub. High-quality materials and finishes created a spa-like atmosphere, while thoughtful details like heated floors and ample storage made it both beautiful and functional.",
    testimonial: {
      text: "Our primary bathroom went from boring to breathtaking. The attention to detail in the tile work is exceptional, and the heated floors are a game-changer on cold Utah mornings. Worth every penny!",
      author: "Rachel K.",
      role: "Homeowner",
      location: "South Jordan, UT",
      projectType: "Bathroom Remodel",
      rating: 5
    }
  },
  {
    slug: "lehi-family-room-addition",
    title: "Two-Story Family Room Addition",
    category: "Home Addition",
    location: "Lehi, UT",
    featured: true,
    thumbnailImage: "/images/projects/lehi-addition-thumb.jpg",
    images: [
      "/images/projects/lehi-addition-1.jpg",
      "/images/projects/lehi-addition-2.jpg",
      "/images/projects/lehi-addition-3.jpg"
    ],
    completionDate: "2025-06",
    budget: { min: 145000, max: 165000 },
    timeline: "5 months",
    scope: [
      "800 sq ft two-story addition",
      "Main floor family room with vaulted ceiling",
      "Upper floor primary suite with walk-in closet",
      "Primary bathroom with dual vanities",
      "Matching exterior materials and roofline",
      "Extended HVAC and electrical systems",
      "Hardwood flooring throughout",
      "Custom built-ins and millwork"
    ],
    problem: "With three kids and only three small bedrooms, the family desperately needed more space. They loved their neighborhood and didn't want to move, but their home felt cramped and lacked a primary suite.",
    solution: "We designed a two-story addition that perfectly matched the home's existing craftsman style. The main floor added much-needed family gathering space, while the second story created a spacious primary retreat. The seamless integration makes it look like it was always there.",
    testimonial: {
      text: "PureLogic made our dream of staying in our neighborhood come true. The addition blends perfectly with our home—guests can't tell what's new. The team managed everything professionally, and we were able to stay in our home throughout construction.",
      author: "David & Sarah M.",
      role: "Homeowners",
      location: "Lehi, UT",
      projectType: "Home Addition",
      rating: 5
    }
  },
  {
    slug: "sandy-basement-finish",
    title: "Modern Basement Living Suite",
    category: "Basement Finish",
    location: "Sandy, UT",
    featured: true,
    thumbnailImage: "/images/projects/sandy-basement-thumb.jpg",
    images: [
      "/images/projects/sandy-basement-1.jpg",
      "/images/projects/sandy-basement-2.jpg"
    ],
    completionDate: "2025-08",
    budget: { min: 62000, max: 68000 },
    timeline: "10 weeks",
    scope: [
      "1,200 sq ft finished basement",
      "Guest bedroom with egress window",
      "Full bathroom with tile shower",
      "Family room with built-in entertainment center",
      "Wet bar with sink and mini fridge",
      "LVP flooring throughout",
      "Recessed lighting and electrical upgrades",
      "Custom paint and trim details"
    ],
    problem: "The unfinished basement was wasted space storing boxes. With aging parents planning to visit for extended stays, the homeowners needed comfortable, private accommodations plus entertainment space for the whole family.",
    solution: "We transformed the dark basement into a bright, welcoming living suite. A spacious bedroom with proper egress, a beautiful full bathroom, and an open family room with wet bar created the perfect setup for guests and family gatherings.",
    testimonial: {
      text: "Our basement went from a scary storage dungeon to our favorite part of the house. The quality of work is outstanding, and the space has already paid for itself in family memories. My parents love staying here now!",
      author: "Amanda L.",
      role: "Homeowner",
      location: "Sandy, UT",
      projectType: "Basement Finish",
      rating: 5
    }
  },
  {
    slug: "alpine-custom-home",
    title: "Custom Mountain Modern Home",
    category: "Custom Home",
    location: "Alpine, UT",
    featured: true,
    thumbnailImage: "/images/projects/alpine-home-thumb.jpg",
    images: [
      "/images/projects/alpine-home-1.jpg",
      "/images/projects/alpine-home-2.jpg",
      "/images/projects/alpine-home-3.jpg",
      "/images/projects/alpine-home-4.jpg"
    ],
    completionDate: "2025-04",
    budget: { min: 850000, max: 950000 },
    timeline: "14 months",
    scope: [
      "3,800 sq ft custom home",
      "Mountain modern architectural design",
      "Great room with vaulted ceilings and steel beams",
      "Gourmet kitchen with professional appliances",
      "Primary suite with spa bathroom and mountain views",
      "Finished basement with home theater",
      "3-car garage with workshop",
      "Outdoor living space with covered patio",
      "Energy-efficient construction",
      "Smart home integration"
    ],
    problem: "After years of searching, the clients couldn't find an existing home that met their needs for space, style, and location. They wanted a modern home that fit the mountain setting and their active lifestyle.",
    solution: "Working closely with their architect, we built a stunning custom home that maximizes views, natural light, and livability. Clean lines, natural materials, and thoughtful details created their dream home. The open floor plan and outdoor connections perfectly suit their lifestyle.",
    testimonial: {
      text: "Building a custom home felt overwhelming at first, but PureLogic made it an enjoyable journey. Their communication was excellent, their craftsmanship is impeccable, and they helped us navigate every decision. We're in love with our home!",
      author: "Michael & Lisa P.",
      role: "Homeowners",
      location: "Alpine, UT",
      projectType: "Custom Home",
      rating: 5
    }
  },
  {
    slug: "orem-whole-home-remodel",
    title: "Complete Mid-Century Modern Revival",
    category: "Whole Home Remodel",
    location: "Orem, UT",
    featured: false,
    thumbnailImage: "/images/projects/orem-remodel-thumb.jpg",
    images: [
      "/images/projects/orem-remodel-1.jpg",
      "/images/projects/orem-remodel-2.jpg"
    ],
    completionDate: "2025-07",
    budget: { min: 185000, max: 210000 },
    timeline: "4 months",
    scope: [
      "Complete interior renovation of 2,200 sq ft home",
      "Kitchen remodel with custom cabinetry",
      "Two full bathroom remodels",
      "New flooring throughout",
      "Updated electrical and plumbing",
      "New windows and doors",
      "Fresh paint interior and exterior",
      "Landscaping refresh"
    ],
    problem: "The 1960s home had great bones and a prime location but was completely outdated. Every surface needed attention, and systems were aging. The buyers wanted to honor the mid-century character while modernizing for today's living.",
    solution: "We updated every aspect while preserving the home's mid-century charm. Clean lines, period-appropriate details, and modern functionality came together beautifully. The result is a home that feels authentically vintage yet completely current.",
    testimonial: {
      text: "PureLogic understood our vision immediately. They respected the home's history while making it functional and beautiful for our young family. The project was complex, but they managed it flawlessly.",
      author: "Chris & Emma W.",
      role: "Homeowners",
      location: "Orem, UT",
      projectType: "Whole Home Remodel",
      rating: 5
    }
  }
];
