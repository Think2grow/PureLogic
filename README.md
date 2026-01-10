# PureLogic Construction Website

A modern, high-performance website for a Utah-based general contractor built with Astro 5, React, Tailwind CSS v4, and deployed on Cloudflare Pages.

## 🚀 Features

- **Modern Tech Stack**: Astro 5 with SSR, React for interactive components, Tailwind CSS v4
- **SEO Optimized**: Structured data (JSON-LD), Open Graph tags, sitemap, meta tags
- **Performance First**: Server-side rendering, minimal JavaScript, optimized assets
- **Accessibility**: WCAG-friendly, keyboard navigation, proper ARIA labels
- **Utah-Specific**: License display, local credibility, service area information
- **Dark Mode**: Full dark mode support using Tailwind's class strategy
- **Responsive**: Mobile-first design that works on all devices

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js** 18+ installed
- **pnpm** 9.12.0 (specified in package.json)

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Configure site settings:**
   - Edit `src/config/site.ts`
   - Update business information, license number, contact details
   - Set `isInsuredBonded` to `true` once confirmed
   - Add actual Google review link and ratings

3. **Set environment variables:**
   Create a `.env` file in the root:
   ```
   SITE_URL=https://yoursite.com
   ```

## 🏃 Development

Start the development server:
```bash
pnpm dev
```

The site will be available at `http://localhost:4321`

## 🔍 Type Checking

Run TypeScript type checking:
```bash
pnpm check
```

## 🏗️ Build

Build for production:
```bash
pnpm build
```

This will:
1. Run Astro type checking
2. Build the site for production in the `dist/` directory

## 👀 Preview

Preview the production build locally:
```bash
pnpm preview
```

## 🚀 Deployment to Cloudflare Pages

### Option 1: Deploy via Git (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages:**
   - Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Go to **Pages** → **Create a project**
   - Connect your GitHub repository
   - Configure build settings:
     - **Framework preset**: Astro
     - **Build command**: `pnpm build`
     - **Build output directory**: `dist`
     - **Root directory**: `/`

3. **Set environment variables in Cloudflare:**
   - Add `SITE_URL` with your production domain

4. **Deploy:**
   - Cloudflare will automatically build and deploy on every push to main

### Option 2: Deploy via Wrangler CLI

```bash
# Install Wrangler globally if you haven't
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages deploy dist
```

## 📝 Content Management

### Business Information
Edit `src/config/site.ts` to update:
- Business name, contact info, address
- Utah contractor license number
- Service areas
- Social media links
- Hours of operation

### Services
Edit `src/data/services.ts` to:
- Add or remove service offerings
- Update cost ranges and timelines
- Modify FAQs

### Projects/Portfolio
Edit `src/data/projects.ts` to:
- Add new completed projects
- Update project details and testimonials

### Testimonials & FAQs
Edit `src/data/testimonials.ts` to:
- Add client reviews
- Update FAQ sections

## 🎨 Customization

### Brand Colors
Update colors in `src/styles/global.css`:
```css
--color-brand-base: #1e3a8a;
--color-brand-dark: #1e293b;
--color-brand-light: #3b82f6;
--color-accent: #f59e0b;
```

### Typography
The site uses Manrope Variable font. To change:
1. Update `@fontsource-variable/manrope` import in `global.css`
2. Modify `--font-sans` variable

## 📊 SEO Configuration

### Sitemap
Automatically generated at `/sitemap-index.xml`

### Structured Data
- LocalBusiness schema on home and contact pages
- Service schema on individual service pages
- FAQ schema on pages with FAQ sections

### Meta Tags
Configure default meta in `src/config/site.ts` under `seo` object

## ⚠️ Before Going Live - Checklist

- [ ] Update `SITE_URL` environment variable
- [ ] Add actual Utah DOPL license number in `src/config/site.ts`
- [ ] Set `isInsuredBonded` to `true` if applicable
- [ ] Add real Google Business Profile review link
- [ ] Update Google rating and review count
- [ ] Replace placeholder images
- [ ] Add actual team member information in About page
- [ ] Test contact form submission (set up form handler)
- [ ] Configure email notifications for form submissions
- [ ] Set up Google Analytics or other analytics (if needed)
- [ ] Test on multiple devices and browsers
- [ ] Run accessibility audit
- [ ] Check all links and navigation
- [ ] Verify SSL certificate is active
- [ ] Submit sitemap to Google Search Console

## 📁 Project Structure

```
/
├── public/               # Static assets
│   ├── robots.txt
│   └── favicon.svg
├── src/
│   ├── components/       # Reusable components (.astro, .tsx)
│   ├── config/          # Site configuration
│   ├── data/            # Project data (services, projects, testimonials)
│   ├── layouts/         # Page layouts
│   ├── pages/           # File-based routing
│   └── styles/          # Global styles
├── astro.config.mjs     # Astro configuration
├── package.json
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## 🔧 Troubleshooting

### Build Issues
- Clear cache: `rm -rf .astro node_modules && pnpm install`
- Ensure pnpm version matches: `pnpm --version` (should be 9.12.0)

### Tailwind v4 Issues
- Tailwind v4 is in alpha. If you encounter issues, check console for specific errors
- Ensure `@tailwindcss/vite` plugin is properly configured in `astro.config.mjs`

### Type Errors
- Run `pnpm check` to see specific TypeScript errors
- Ensure all imports have proper type definitions

## 📚 Documentation Links

- [Astro Documentation](https://docs.astro.build)
- [Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [React](https://react.dev/)
- [Framer Motion](https://www.framer.com/motion/)

## 📄 License

Copyright © 2026 PureLogic Construction. All rights reserved.

## 🤝 Support

For technical issues or questions about this codebase, contact your development team.

For business inquiries, contact:
- Phone: (801) 555-0123
- Email: info@purelogicconstruction.com
