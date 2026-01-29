import { useState, useEffect } from 'react';
import { PRICING_DATA, SERVICE_AREAS, PROJECT_SCOPES, type Tier, type ProjectScope } from '@/data/calculator-pricing';
import type { CalculatorData, EstimateResult } from '@/types/calculator';
import { calculateEstimate, formatCurrency } from '@/utils/calculator';

export default function CostCalculator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<CalculatorData>({
    // Project basics
    selectedAreas: [],
    projectScope: null,
    squareFootage: null,
    location: null,
    
    // Contact info (collected naturally)
    name: '',
    email: '',
    phone: '',
    address: '',
    timeline: '',
    
    // Selections by category
    selections: {},
    
    // Calculated results
    travelFee: 0,
    subtotal: 0,
    total: 0
  });

  const totalSteps = calculateTotalSteps();

  function calculateTotalSteps() {
    let steps = 6; // Base steps: areas, scope, size, location, name, email
    steps += data.selectedAreas.length; // One step per selected area for customization
    steps += 1; // Results step
    return steps;
  }

  function handleNext() {
    setCurrentStep(currentStep + 1);
  }

  function handleBack() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  function updateData(updates: Partial<CalculatorData>) {
    setData(prev => ({ ...prev, ...updates }));
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 lg:p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-brand-base">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-brand-base h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">
        {currentStep === 1 && (
          <StepAreas data={data} updateData={updateData} onNext={handleNext} />
        )}
        {currentStep === 2 && (
          <StepScope data={data} updateData={updateData} onNext={handleNext} onBack={handleBack} />
        )}
        {currentStep === 3 && (
          <StepSize data={data} updateData={updateData} onNext={handleNext} onBack={handleBack} />
        )}
        {currentStep === 4 && (
          <StepLocation data={data} updateData={updateData} onNext={handleNext} onBack={handleBack} />
        )}
        {currentStep === 5 && (
          <StepName data={data} updateData={updateData} onNext={handleNext} onBack={handleBack} />
        )}
        {currentStep === 6 && (
          <StepContact data={data} updateData={updateData} onNext={handleNext} onBack={handleBack} />
        )}
        {/* Dynamic steps for each selected area */}
        {currentStep > 6 && currentStep <= 6 + data.selectedAreas.length && (
          <StepAreaCustomization 
            area={data.selectedAreas[currentStep - 7]}
            data={data}
            updateData={updateData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep > 6 + data.selectedAreas.length && (
          <StepResults data={data} />
        )}
      </div>
    </div>
  );
}

// Step 1: Select Areas
function StepAreas({ data, updateData, onNext }: StepProps) {
  const areas = [
    { id: 'kitchen', label: 'Kitchen', icon: '🍳' },
    { id: 'bathroom', label: 'Bathroom(s)', icon: '🚿' },
    { id: 'flooring', label: 'Flooring', icon: '🏠' },
    { id: 'drywall', label: 'Drywall/Painting', icon: '🎨' },
    { id: 'electrical', label: 'Electrical', icon: '⚡' },
    { id: 'plumbing', label: 'Plumbing', icon: '🔧' },
    { id: 'framing', label: 'Framing/Structural', icon: '🏗️' },
    { id: 'roofing', label: 'Roofing', icon: '🏚️' },
    { id: 'windows', label: 'Windows/Doors', icon: '🚪' },
    { id: 'hvac', label: 'HVAC', icon: '🌡️' },
    { id: 'basement', label: 'Basement Finishing', icon: '🛋️' },
    { id: 'addition', label: 'Addition/Expansion', icon: '📐' },
    { id: 'other', label: 'Other', icon: '🔨' }
  ];

  const toggleArea = (areaId: string) => {
    const selected = data.selectedAreas.includes(areaId)
      ? data.selectedAreas.filter(a => a !== areaId)
      : [...data.selectedAreas, areaId];
    updateData({ selectedAreas: selected });
  };

  const canProceed = data.selectedAreas.length > 0;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        What areas need work?
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Select all that apply to your project
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {areas.map(area => (
          <button
            key={area.id}
            onClick={() => toggleArea(area.id)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              data.selectedAreas.includes(area.id)
                ? 'border-brand-base bg-brand-base/5 shadow-md'
                : 'border-gray-200 dark:border-gray-700 hover:border-brand-light'
            }`}
          >
            <div className="text-3xl mb-2">{area.icon}</div>
            <div className="font-semibold text-sm text-gray-900 dark:text-white">
              {area.label}
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!canProceed}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}

// Step 2: Project Scope
function StepScope({ data, updateData, onNext, onBack }: StepProps) {
  const scopes: { id: ProjectScope; name: string; description: string }[] = [
    {
      id: 'minorRepair',
      name: 'Minor Repair/Update',
      description: 'Small fixes, updates, or cosmetic changes'
    },
    {
      id: 'partialRemodel',
      name: 'Partial Remodel',
      description: 'Significant updates to specific areas'
    },
    {
      id: 'fullRenovation',
      name: 'Full Renovation',
      description: 'Complete transformation of space'
    },
    {
      id: 'newConstruction',
      name: 'New Construction',
      description: 'Building from ground up'
    }
  ];

  const canProceed = data.projectScope !== null;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        What's the scope of work?
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        This helps us estimate the level of work involved
      </p>

      <div className="space-y-3 mb-8">
        {scopes.map(scope => (
          <button
            key={scope.id}
            onClick={() => updateData({ projectScope: scope.id })}
            className={`w-full p-5 rounded-lg border-2 transition-all text-left ${
              data.projectScope === scope.id
                ? 'border-brand-base bg-brand-base/5 shadow-md'
                : 'border-gray-200 dark:border-gray-700 hover:border-brand-light'
            }`}
          >
            <div className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
              {scope.name}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {scope.description}
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1">
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// Step 3: Project Size
function StepSize({ data, updateData, onNext, onBack }: StepProps) {
  const [sqft, setSqft] = useState(data.squareFootage?.toString() || '');

  const handleSubmit = () => {
    const value = parseInt(sqft);
    if (value > 0) {
      updateData({ squareFootage: value });
      onNext();
    }
  };

  const canProceed = sqft && parseInt(sqft) > 0;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        How large is the project area?
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Enter the approximate square footage for the work area
      </p>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Square Footage
        </label>
        <input
          type="number"
          value={sqft}
          onChange={(e) => setSqft(e.target.value)}
          placeholder="e.g., 500"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-base focus:border-transparent dark:bg-gray-700 dark:text-white"
          min="1"
        />
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Not sure? You can estimate: Kitchen (150-250), Bathroom (50-100), Basement (500-1500)
        </p>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1">
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!canProceed}
          className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// Step 4: Location
function StepLocation({ data, updateData, onNext, onBack }: StepProps) {
  const canProceed = data.location !== null;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        Where is your project located?
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        This helps us calculate travel fees and provide accurate estimates
      </p>

      <div className="space-y-3 mb-8">
        {SERVICE_AREAS.map((area, index) => (
          <button
            key={index}
            onClick={() => updateData({ location: area.name })}
            className={`w-full p-5 rounded-lg border-2 transition-all text-left ${
              data.location === area.name
                ? 'border-brand-base bg-brand-base/5 shadow-md'
                : 'border-gray-200 dark:border-gray-700 hover:border-brand-light'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                  {area.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {area.cities.join(', ')}
                </div>
              </div>
              {'travelFee' in area && area.travelFee === 0 ? (
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  No travel fee
                </span>
              ) : 'travelFeeRange' in area && area.travelFeeRange && (
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  +${area.travelFeeRange.min}-${area.travelFeeRange.max}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1">
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// Step 5: Name (Natural lead capture)
function StepName({ data, updateData, onNext, onBack }: StepProps) {
  const [name, setName] = useState(data.name || '');

  const handleSubmit = () => {
    if (name.trim()) {
      updateData({ name: name.trim() });
      onNext();
    }
  };

  const canProceed = name.trim().length > 0;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        Great! What's your name?
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        We'll personalize your estimate and use this when we reach out
      </p>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Your Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Smith"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-base focus:border-transparent dark:bg-gray-700 dark:text-white"
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        />
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1">
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!canProceed}
          className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// Step 6: Contact Info
function StepContact({ data, updateData, onNext, onBack }: StepProps) {
  const [email, setEmail] = useState(data.email || '');
  const [phone, setPhone] = useState(data.phone || '');
  const [address, setAddress] = useState(data.address || '');
  const [timeline, setTimeline] = useState(data.timeline || '');

  const handleSubmit = () => {
    if (email.trim() && phone.trim()) {
      updateData({ 
        email: email.trim(), 
        phone: phone.trim(),
        address: address.trim(),
        timeline
      });
      onNext();
    }
  };

  const isValidEmail = email.includes('@') && email.includes('.');
  const canProceed = email.trim() && phone.trim() && isValidEmail;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        How can we reach you, {data.name}?
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        We'll send your detailed estimate and follow up with next steps
      </p>

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@email.com"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-base focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(801) 555-0123"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-base focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Project Address (Optional)
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Main St, City, UT 84101"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-base focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            When are you looking to start?
          </label>
          <select
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-base focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select timeline</option>
            <option value="asap">As soon as possible</option>
            <option value="1-3months">1-3 months</option>
            <option value="3-6months">3-6 months</option>
            <option value="6-12months">6-12 months</option>
            <option value="planning">Just planning/researching</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1">
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!canProceed}
          className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// Dynamic step for area customization
function StepAreaCustomization({ area, data, updateData, onNext, onBack }: StepAreaStepProps) {
  const [tier, setTier] = useState<Tier>(data.selections[area]?.tier || 'standard');

  const handleSubmit = () => {
    updateData({
      selections: {
        ...data.selections,
        [area]: { tier }
      }
    });
    onNext();
  };

  const areaLabels: Record<string, string> = {
    kitchen: 'Kitchen',
    bathroom: 'Bathroom',
    flooring: 'Flooring',
    drywall: 'Drywall/Painting',
    electrical: 'Electrical',
    plumbing: 'Plumbing',
    framing: 'Framing',
    roofing: 'Roofing',
    windows: 'Windows/Doors',
    hvac: 'HVAC',
    basement: 'Basement',
    addition: 'Addition',
    other: 'Other Work'
  };

  const tiers: { id: Tier; name: string; description: string }[] = [
    {
      id: 'standard',
      name: 'Standard',
      description: 'Quality materials and workmanship at competitive prices'
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Higher-end materials with enhanced features'
    },
    {
      id: 'luxury',
      name: 'Luxury',
      description: 'Top-tier materials and custom finishes'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        {areaLabels[area]} - Quality Level
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        What quality level are you looking for?
      </p>

      <div className="space-y-3 mb-8">
        {tiers.map(t => (
          <button
            key={t.id}
            onClick={() => setTier(t.id)}
            className={`w-full p-5 rounded-lg border-2 transition-all text-left ${
              tier === t.id
                ? 'border-brand-base bg-brand-base/5 shadow-md'
                : 'border-gray-200 dark:border-gray-700 hover:border-brand-light'
            }`}
          >
            <div className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
              {t.name}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {t.description}
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1">
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="btn-primary flex-1"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// Results Step
function StepResults({ data }: { data: CalculatorData }) {
  const [isCalculating, setIsCalculating] = useState(true);
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);

  useEffect(() => {
    // Simulate calculation delay for better UX
    setTimeout(() => {
      const result = calculateEstimate(data);
      setEstimate(result);
      setIsCalculating(false);
      
      // Submit data to webhook
      submitToWebhook(data, result);
    }, 1500);
  }, []);

  if (isCalculating) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-base mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Calculating Your Estimate...
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Thanks {data.name}! We're generating your detailed rough guide.
        </p>
      </div>
    );
  }

  if (!estimate) return null;

  return (
    <div>
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">✨</div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Your Estimate is Ready!
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Here's your comprehensive rough guide, {data.name}
        </p>
      </div>

      {/* Total Estimate */}
      <div className="bg-gradient-to-br from-brand-dark to-brand-base text-white rounded-xl p-8 mb-6 text-center">
        <p className="text-sm uppercase tracking-wide mb-2 opacity-90">Estimated Total Investment</p>
        <p className="text-5xl font-bold mb-2">{formatCurrency(estimate.total)}</p>
        <p className="text-sm opacity-75">±10% depending on final specifications</p>
        <p className="text-sm mt-4 opacity-90">Timeline: {estimate.estimatedTimeline}</p>
      </div>

      {/* Project Summary */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
        <h3 className="font-bold text-lg mb-4">Project Summary</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Scope:</span>{' '}
            <span className="font-semibold">{estimate.projectSummary.scope}</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Size:</span>{' '}
            <span className="font-semibold">{estimate.projectSummary.squareFootage} sq ft</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Location:</span>{' '}
            <span className="font-semibold">{estimate.projectSummary.location}</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Areas:</span>{' '}
            <span className="font-semibold">{estimate.projectSummary.areas.length} selected</span>
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="space-y-4 mb-6">
        <h3 className="font-bold text-lg">Cost Breakdown</h3>
        {estimate.breakdown.map((category, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold">{category.category}</h4>
              <span className="font-bold text-brand-base">{formatCurrency(category.subtotal)}</span>
            </div>
            <div className="space-y-1 text-sm">
              {category.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>{item.name} ({item.quantity} {item.unit})</span>
                  <span>{formatCurrency(item.total)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Fees & Totals */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2 text-sm mb-6">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold">{formatCurrency(estimate.subtotal)}</span>
        </div>
        {estimate.fees.travelFee > 0 && (
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Travel Fee</span>
            <span>{formatCurrency(estimate.fees.travelFee)}</span>
          </div>
        )}
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Permit Fees</span>
          <span>{formatCurrency(estimate.fees.permitFees)}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Project Management (15%)</span>
          <span>{formatCurrency(estimate.fees.projectManagement)}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Contingency (10%)</span>
          <span>{formatCurrency(estimate.contingency)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold border-t border-gray-300 dark:border-gray-600 pt-2 mt-2">
          <span>Total Estimated Investment</span>
          <span className="text-brand-base">{formatCurrency(estimate.total)}</span>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6 text-sm">
        <p className="font-semibold mb-1">Important:</p>
        <p className="text-amber-900 dark:text-amber-200">
          This is a rough guide based on industry averages and the information provided. 
          Final costs may vary based on site conditions, specific material selections, and detailed project requirements. 
          This estimate is valid until {estimate.validUntil}.
        </p>
      </div>

      {/* CTAs */}
      <div className="space-y-3">
        <a 
          href="/thank-you"
          className="btn-secondary w-full block text-center"
        >
          Continue to Next Steps
        </a>
      </div>

      <p className="text-center text-sm text-gray-500 mt-4">
        We'll contact you at {data.email} within 1-2 business days
      </p>
    </div>
  );
}

// Helper function to submit data to webhook
async function submitToWebhook(data: CalculatorData, estimate: EstimateResult) {
  try {
    const { firstName, lastName } = splitName(data.name || '');
    const notes = buildCalculatorNotes(data, estimate);

    const payload = {
      firstname: firstName,
      lastname: lastName,
      email: data.email || '',
      phone: data.phone || '',
      notes,
      submittedAt: new Date().toISOString()
    };

    const webhookUrl = 'https://services.leadconnectorhq.com/hooks/0D3c4ZHt2RrTnSl27Qgl/webhook-trigger/3672958f-cf62-465f-b5e9-d78885b3f6f7';
    
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error('Failed to submit to webhook:', error);
    // Optionally handle error (e.g., show a message to user)
  }
}

function splitName(fullName: string) {
  const trimmed = fullName.trim();
  if (!trimmed) return { firstName: '', lastName: '' };
  const parts = trimmed.split(/\s+/);
  const firstName = parts[0] || '';
  const lastName = parts.slice(1).join(' ') || '';
  return { firstName, lastName };
}

function buildCalculatorNotes(data: CalculatorData, estimate: EstimateResult) {
  const lines = [
    'Source: Project Cost Calculator',
    `Selected Areas: ${data.selectedAreas.length ? data.selectedAreas.join(', ') : 'N/A'}`,
    `Project Scope: ${data.projectScope || 'N/A'}`,
    `Square Footage: ${data.squareFootage ?? 'N/A'}`,
    `Location: ${data.location || 'N/A'}`,
    `Address: ${data.address || 'N/A'}`,
    `Timeline: ${data.timeline || 'N/A'}`,
    `Estimate Subtotal: ${formatCurrency(estimate.subtotal)}`,
    `Estimate Total: ${formatCurrency(estimate.total)}`,
    `Estimated Timeline: ${estimate.estimatedTimeline}`
  ];

  return lines.join('\n');
}

// Helper function to download PDF (placeholder)
function handleDownloadPDF(estimate: EstimateResult, data: CalculatorData) {
  // This will be implemented with the PDF generation library
  alert('PDF generation coming soon! For now, please screenshot this page.');
  // TODO: Implement PDF generation
}

// Type definitions
interface StepProps {
  data: CalculatorData;
  updateData: (updates: Partial<CalculatorData>) => void;
  onNext: () => void;
  onBack?: () => void;
}

interface StepAreaStepProps extends StepProps {
  area: string;
}
