# Project Audit Tracker - Admin Page

## Access Information

**URL**: `/admin/audit-tracker` (direct access only - not linked anywhere)  
**Password**: `PureLogic2026` (change this to a secure password)  
**Storage**: Browser localStorage (syncs across devices via export/backup)

---

## How to Use

### 1. Access the Page
- Go directly to: `https://yoursite.com/admin/audit-tracker`
- Enter password: `PureLogic2026`

### 2. Add a Project
- Click "+ Add New Project"
- Fill in:
  - **Date**: When the project was completed
  - **Project Name**: e.g., "Smith Kitchen Remodel"
  - **Category**: Kitchen, Bathroom, Flooring, Combined, or Other
  - **Square Footage**: Total project size
  - **Tier**: Standard, Premium, or Luxury
  - **Estimated Total**: What the calculator predicted
  - **Actual Total**: What the final invoice was
  - **Notes**: Any observations (e.g., "scope changed", "delays", etc.)

### 3. Track Performance
The page automatically calculates:
- **Variance $**: How much over/under estimated
- **Variance %**: Percentage difference
- **Color coding**: 
  - 🟢 Green: ±5% or better (excellent)
  - 🔵 Blue: ±5-8% (good)
  - 🟡 Yellow: ±8-10% (acceptable)
  - 🔴 Red: >±10% (needs review)

### 4. Monitor Statistics
Dashboard shows:
- Total projects tracked
- Average variance across all projects
- How many projects are outside ±10%
- Breakdown by category

### 5. Backup Your Data
- **Export as CSV**: Opens in Excel for analysis
- **Backup as JSON**: Full backup for safekeeping

---

## What This Helps You Do

✅ Compare calculator estimates vs actual invoices  
✅ Identify which categories consistently over/underestimate  
✅ Track monthly pricing accuracy trends  
✅ Make data-driven adjustments to calculator  
✅ Prove pricing accuracy to clients  

---

## Monthly Audit Process

1. Week 1 of month: Add projects from previous month
2. Calculate average variance by category
3. If any category >10% off:
   - Note reason (scope creep, efficiency, material costs)
   - Decide if calculator needs adjustment
4. Update `src/data/calculator-pricing.ts` if changes needed
5. Export CSV for your records

---

## Changing The Password

**Important**: Change the default password to something secure.

**Location**: `src/pages/admin/audit-tracker.astro` line 7

```typescript
const ADMIN_PASSWORD = 'PureLogic2026'; // Change this!
```

Replace `'PureLogic2026'` with your secure password, then redeploy.

---

## Data Privacy

- **Storage**: All data stored in browser localStorage (your computer only)
- **Backup**: Export feature lets you save data locally
- **Security**: Password-protected, not indexed by search engines, not in sitemap
- **Visibility**: Page has no links from any other pages

---

## Troubleshooting

**Can't access page?**
- Check spelling: `/admin/audit-tracker`
- Check password is correct
- Try browser incognito/private mode

**Lost data?**
- Check browser's Application > Local Storage
- Use backup JSON file if you exported one
- Browser data can be cleared accidently

**Variance seems wrong?**
- Ensure Estimated Total = what calculator showed
- Ensure Actual Total = final invoice amount
- Check category is correct (affects calculations)

---

## Monthly Audit Template

Use this spreadsheet layout to track alongside the tracker:

```
Month: ________

| Project      | Category | Est Total | Actual | Var % | Notes        |
|--------------|----------|-----------|--------|-------|--------------|
| Smith Kit    | Kitchen  | $45,000   | $47k   | +4.4% | Labor ran +5% |
| Jones Bath   | Bathroom | $18,500   | $17,800| -3.8% | Efficient    |
```

---

## When To Adjust Pricing

**Increase prices if:**
- Consistently 5-8% under budget
- Labor costs have risen
- New market data shows higher rates
- Margin needs improvement

**Decrease prices if:**
- Consistently 5-8% over budget
- Gained efficiency in processes
- Market rates have dropped
- Need more competitive pricing

**Test before committing:**
- Run calculator on 3 recent projects
- See if new prices are closer
- Commit change if improved variance by 2-3%

