// Calculator Pricing Validation Tests
// Run with: npm test calculator.test.ts
// Purpose: Validate calculator output against known benchmarks

import { calculateEstimate } from '@/utils/calculator';
import type { CalculatorData } from '@/types/calculator';

describe('Calculator Pricing Validation - Industry Benchmarks', () => {
  
  // KITCHEN ESTIMATES
  describe('Kitchen Estimates', () => {
    test('Standard 200sqft kitchen should estimate $25,000-$35,000', () => {
      const data: CalculatorData = {
        selectedAreas: ['kitchen'],
        projectScope: 'midRangeRemodel',
        squareFootage: 200,
        location: 'Salt Lake County',
        selections: { kitchen: { tier: 'standard' } },
        name: 'Test Kitchen',
        email: 'test@test.com',
        phone: '',
        address: '',
        timeline: '',
        travelFee: 0,
        subtotal: 0,
        total: 0
      };
      
      const estimate = calculateEstimate(data);
      const total = estimate.total;
      
      // Industry benchmark: $25k-$35k for standard 200sqft kitchen
      expect(total).toBeGreaterThan(25000);
      expect(total).toBeLessThan(35000);
      console.log(`✓ Standard Kitchen (200sqft): $${total.toLocaleString()}`);
    });

    test('Premium 150sqft kitchen should estimate $40,000-$55,000', () => {
      const data: CalculatorData = {
        selectedAreas: ['kitchen'],
        projectScope: 'fullRenovation',
        squareFootage: 150,
        location: 'Salt Lake County',
        selections: { kitchen: { tier: 'premium' } },
        name: 'Test Kitchen',
        email: 'test@test.com',
        phone: '',
        address: '',
        timeline: '',
        travelFee: 0,
        subtotal: 0,
        total: 0
      };
      
      const estimate = calculateEstimate(data);
      const total = estimate.total;
      
      // Industry benchmark: $40k-$55k for premium kitchen remodel
      expect(total).toBeGreaterThan(40000);
      expect(total).toBeLessThan(55000);
      console.log(`✓ Premium Kitchen (150sqft): $${total.toLocaleString()}`);
    });
  });

  // BATHROOM ESTIMATES
  describe('Bathroom Estimates', () => {
    test('Standard 75sqft bathroom should estimate $8,000-$12,000', () => {
      const data: CalculatorData = {
        selectedAreas: ['bathroom'],
        projectScope: 'midRangeRemodel',
        squareFootage: 75,
        location: 'Salt Lake County',
        selections: { bathroom: { tier: 'standard' } },
        name: 'Test Bath',
        email: 'test@test.com',
        phone: '',
        address: '',
        timeline: '',
        travelFee: 0,
        subtotal: 0,
        total: 0
      };
      
      const estimate = calculateEstimate(data);
      const total = estimate.total;
      
      // Industry benchmark: $8k-$12k for standard bathroom
      expect(total).toBeGreaterThan(8000);
      expect(total).toBeLessThan(12000);
      console.log(`✓ Standard Bathroom (75sqft): $${total.toLocaleString()}`);
    });

    test('Luxury 100sqft bathroom should estimate $25,000-$35,000', () => {
      const data: CalculatorData = {
        selectedAreas: ['bathroom'],
        projectScope: 'fullRenovation',
        squareFootage: 100,
        location: 'Salt Lake County',
        selections: { bathroom: { tier: 'luxury' } },
        name: 'Test Bath',
        email: 'test@test.com',
        phone: '',
        address: '',
        timeline: '',
        travelFee: 0,
        subtotal: 0,
        total: 0
      };
      
      const estimate = calculateEstimate(data);
      const total = estimate.total;
      
      // Industry benchmark: $25k-$35k for luxury bathroom
      expect(total).toBeGreaterThan(25000);
      expect(total).toBeLessThan(35000);
      console.log(`✓ Luxury Bathroom (100sqft): $${total.toLocaleString()}`);
    });
  });

  // FLOORING ESTIMATES
  describe('Flooring Estimates', () => {
    test('Vinyl plank 2000sqft should estimate $7,000-$9,000', () => {
      const data: CalculatorData = {
        selectedAreas: ['flooring'],
        projectScope: 'midRangeRemodel',
        squareFootage: 2000,
        location: 'Salt Lake County',
        selections: { flooring: { tier: 'standard' } },
        name: 'Test Floor',
        email: 'test@test.com',
        phone: '',
        address: '',
        timeline: '',
        travelFee: 0,
        subtotal: 0,
        total: 0
      };
      
      const estimate = calculateEstimate(data);
      const total = estimate.total;
      
      // Industry: Vinyl = $3-4/sqft × 2000 = $6-8k
      expect(total).toBeGreaterThan(7000);
      expect(total).toBeLessThan(9000);
      console.log(`✓ Vinyl Flooring (2000sqft): $${total.toLocaleString()}`);
    });

    test('Hardwood 1500sqft premium should estimate $18,000-$24,000', () => {
      const data: CalculatorData = {
        selectedAreas: ['flooring'],
        projectScope: 'partialRemodel',
        squareFootage: 1500,
        location: 'Salt Lake County',
        selections: { flooring: { tier: 'premium' } },
        name: 'Test Floor',
        email: 'test@test.com',
        phone: '',
        address: '',
        timeline: '',
        travelFee: 0,
        subtotal: 0,
        total: 0
      };
      
      const estimate = calculateEstimate(data);
      const total = estimate.total;
      
      // Industry: Hardwood = $12/sqft premium × 1500 = $18k-24k
      expect(total).toBeGreaterThan(18000);
      expect(total).toBeLessThan(24000);
      console.log(`✓ Premium Hardwood (1500sqft): $${total.toLocaleString()}`);
    });
  });

  // COMBINED PROJECT TESTS
  describe('Combined Project Estimates', () => {
    test('Small renovation (kitchen + bathroom, 300sqft total, standard) = $30k-$40k', () => {
      const data: CalculatorData = {
        selectedAreas: ['kitchen', 'bathroom'],
        projectScope: 'partialRemodel',
        squareFootage: 300,
        location: 'Salt Lake County',
        selections: {
          kitchen: { tier: 'standard' },
          bathroom: { tier: 'standard' }
        },
        name: 'Small Reno',
        email: 'test@test.com',
        phone: '',
        address: '',
        timeline: '',
        travelFee: 0,
        subtotal: 0,
        total: 0
      };
      
      const estimate = calculateEstimate(data);
      const total = estimate.total;
      
      // Should be $30k-$40k combined
      expect(total).toBeGreaterThan(30000);
      expect(total).toBeLessThan(40000);
      console.log(`✓ Combined Small Reno: $${total.toLocaleString()}`);
    });

    test('Full house renovation (all areas, 3000sqft, premium) = $120k-$180k', () => {
      const data: CalculatorData = {
        selectedAreas: ['kitchen', 'bathroom', 'flooring'],
        projectScope: 'fullRenovation',
        squareFootage: 3000,
        location: 'Salt Lake County',
        selections: {
          kitchen: { tier: 'premium' },
          bathroom: { tier: 'premium' },
          flooring: { tier: 'premium' }
        },
        name: 'Full Reno',
        email: 'test@test.com',
        phone: '',
        address: '',
        timeline: '',
        travelFee: 0,
        subtotal: 0,
        total: 0
      };
      
      const estimate = calculateEstimate(data);
      const total = estimate.total;
      
      // Should be $120k-$180k
      expect(total).toBeGreaterThan(120000);
      expect(total).toBeLessThan(180000);
      console.log(`✓ Full House Reno: $${total.toLocaleString()}`);
    });
  });

  // TRAVEL FEES
  describe('Travel Fees - Location Based', () => {
    test('Davis County travel fee = $350-$600', () => {
      const data: CalculatorData = {
        selectedAreas: ['kitchen'],
        projectScope: 'minorRepair',
        squareFootage: 100,
        location: 'Davis County',
        selections: { kitchen: { tier: 'standard' } },
        name: 'Test',
        email: 'test@test.com',
        phone: '',
        address: '',
        timeline: '',
        travelFee: 0,
        subtotal: 0,
        total: 0
      };
      
      const estimate = calculateEstimate(data);
      const travelFee = estimate.fees.travelFee;
      
      expect(travelFee).toBeGreaterThanOrEqual(350);
      expect(travelFee).toBeLessThanOrEqual(600);
      console.log(`✓ Davis County Travel Fee: $${travelFee}`);
    });

    test('Weber County travel fee = $500-$800', () => {
      const data: CalculatorData = {
        selectedAreas: ['bathroom'],
        projectScope: 'minorRepair',
        squareFootage: 100,
        location: 'Weber County',
        selections: { bathroom: { tier: 'standard' } },
        name: 'Test',
        email: 'test@test.com',
        phone: '',
        address: '',
        timeline: '',
        travelFee: 0,
        subtotal: 0,
        total: 0
      };
      
      const estimate = calculateEstimate(data);
      const travelFee = estimate.fees.travelFee;
      
      expect(travelFee).toBeGreaterThanOrEqual(500);
      expect(travelFee).toBeLessThanOrEqual(800);
      console.log(`✓ Weber County Travel Fee: $${travelFee}`);
    });
  });
});

// RUN THIS TEST: npm test -- calculator.validation.test.ts
// It will show you exactly where your estimates fall vs industry benchmarks
