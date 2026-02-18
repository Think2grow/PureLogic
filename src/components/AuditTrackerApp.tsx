import React, { useState, useEffect } from 'react';

interface ProjectAudit {
  id: string;
  date: string;
  projectName: string;
  category: 'Kitchen' | 'Bathroom' | 'Flooring' | 'Combined' | 'Other';
  squareFootage: number;
  tier: 'standard' | 'premium' | 'luxury';
  estimatedTotal: number;
  actualTotal: number;
  varianceDollars: number;
  variancePercent: number;
  notes: string;
}

const STORAGE_KEY = 'purelogic_audits';
const LOCAL_BACKUP_KEY = 'purelogic_audits_backup';

export default function AuditTracker() {
  const [audits, setAudits] = useState<ProjectAudit[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    projectName: '',
    category: 'Kitchen' as const,
    squareFootage: '',
    tier: 'standard' as const,
    estimatedTotal: '',
    actualTotal: '',
    notes: ''
  });

  // Load data on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setAudits(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load audits');
      }
    }
  }, []);

  // Save to localStorage whenever audits change
  useEffect(() => {
    if (audits.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(audits));
      // Also create a backup
      localStorage.setItem(LOCAL_BACKUP_KEY, JSON.stringify(audits));
    }
  }, [audits]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const estimated = parseFloat(formData.estimatedTotal);
    const actual = parseFloat(formData.actualTotal);
    
    if (!formData.projectName || !formData.squareFootage || !estimated || !actual) {
      alert('Please fill in all required fields');
      return;
    }

    const varianceDollars = estimated - actual;
    const variancePercent = (varianceDollars / actual) * 100;

    const newAudit: ProjectAudit = {
      id: editingId || Date.now().toString(),
      date: formData.date,
      projectName: formData.projectName,
      category: formData.category,
      squareFootage: parseFloat(formData.squareFootage),
      tier: formData.tier,
      estimatedTotal: estimated,
      actualTotal: actual,
      varianceDollars,
      variancePercent
    } as ProjectAudit;

    if (editingId) {
      setAudits(prev => prev.map(a => a.id === editingId ? { ...newAudit, notes: formData.notes } : a));
      setEditingId(null);
    } else {
      setAudits(prev => [{ ...newAudit, notes: formData.notes }, ...prev]);
    }

    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      projectName: '',
      category: 'Kitchen',
      squareFootage: '',
      tier: 'standard',
      estimatedTotal: '',
      actualTotal: '',
      notes: ''
    });
    setShowForm(false);
  };

  const handleEdit = (audit: ProjectAudit) => {
    setFormData({
      date: audit.date,
      projectName: audit.projectName,
      category: audit.category,
      squareFootage: audit.squareFootage.toString(),
      tier: audit.tier,
      estimatedTotal: audit.estimatedTotal.toString(),
      actualTotal: audit.actualTotal.toString(),
      notes: audit.notes
    });
    setEditingId(audit.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this audit entry?')) {
      setAudits(prev => prev.filter(a => a.id !== id));
    }
  };

  const calculateStats = () => {
    if (audits.length === 0) return null;
    
    const avgVariance = audits.reduce((sum, a) => sum + a.variancePercent, 0) / audits.length;
    const highVariance = audits.filter(a => Math.abs(a.variancePercent) > 10).length;
    const byCategory = audits.reduce((acc, a) => {
      if (!acc[a.category]) acc[a.category] = [];
      acc[a.category].push(a);
      return acc;
    }, {} as Record<string, ProjectAudit[]>);

    return {
      total: audits.length,
      avgVariance,
      highVariance,
      byCategory
    };
  };

  const stats = calculateStats();

  const getVarianceColor = (variance: number) => {
    if (Math.abs(variance) <= 5) return 'text-green-600 dark:text-green-400';
    if (Math.abs(variance) <= 8) return 'text-blue-600 dark:text-blue-400';
    if (Math.abs(variance) <= 10) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getVarianceBgColor = (variance: number) => {
    if (Math.abs(variance) <= 5) return 'bg-green-50 dark:bg-green-900/20';
    if (Math.abs(variance) <= 8) return 'bg-blue-50 dark:bg-blue-900/20';
    if (Math.abs(variance) <= 10) return 'bg-yellow-50 dark:bg-yellow-900/20';
    return 'bg-red-50 dark:bg-red-900/20';
  };

  return (
    <div className="space-y-8">
      {/* Stats Summary */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-brand-base/10 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Projects</div>
            <div className="text-3xl font-bold text-brand-base">{stats.total}</div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg Variance</div>
            <div className={`text-3xl font-bold ${getVarianceColor(stats.avgVariance)}`}>
              {stats.avgVariance.toFixed(1)}%
            </div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">Outside ±10%</div>
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.highVariance}</div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">By Category</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {Object.keys(stats.byCategory).length}
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {editingId ? 'Edit Project' : 'Add New Project'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  placeholder="e.g., Smith Kitchen Remodel"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option>Kitchen</option>
                  <option>Bathroom</option>
                  <option>Flooring</option>
                  <option>Combined</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Square Footage *
                </label>
                <input
                  type="number"
                  name="squareFootage"
                  value={formData.squareFootage}
                  onChange={handleInputChange}
                  placeholder="e.g., 500"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tier
                </label>
                <select
                  name="tier"
                  value={formData.tier}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Estimated Total *
                </label>
                <input
                  type="number"
                  name="estimatedTotal"
                  value={formData.estimatedTotal}
                  onChange={handleInputChange}
                  placeholder="$"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Actual Total *
                </label>
                <input
                  type="number"
                  name="actualTotal"
                  value={formData.actualTotal}
                  onChange={handleInputChange}
                  placeholder="$"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any notes about this project..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-brand-base hover:bg-brand-base/90 text-white font-semibold rounded-lg transition-colors"
              >
                {editingId ? 'Update' : 'Add'} Project
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({
                    date: new Date().toISOString().split('T')[0],
                    projectName: '',
                    category: 'Kitchen',
                    squareFootage: '',
                    tier: 'standard',
                    estimatedTotal: '',
                    actualTotal: '',
                    notes: ''
                  });
                }}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Project Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-brand-base hover:bg-brand-base/90 text-white font-semibold rounded-lg transition-colors"
        >
          + Add New Project
        </button>
      )}

      {/* Projects Table */}
      {audits.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400">No projects tracked yet</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">Add your first project to get started</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Project</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Type</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Estimated</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Actual</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Variance</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {audits.map(audit => (
                <tr key={audit.id} className={`${getVarianceBgColor(audit.variancePercent)}`}>
                  <td className="px-4 py-3 text-gray-900 dark:text-white">{audit.date}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-gray-900 dark:text-white">{audit.projectName}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{audit.squareFootage} sqft • {audit.tier}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-white">{audit.category}</td>
                  <td className="px-4 py-3 text-gray-900 dark:text-white">${audit.estimatedTotal.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-900 dark:text-white">${audit.actualTotal.toLocaleString()}</td>
                  <td className={`px-4 py-3 font-semibold ${getVarianceColor(audit.variancePercent)}`}>
                    <div>{audit.variancePercent.toFixed(1)}%</div>
                    <div className="text-xs">${audit.varianceDollars.toLocaleString()}</div>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(audit)}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(audit.id)}
                      className="text-red-600 dark:text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Export/Backup Section */}
      {audits.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Data Management</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                const csv = [
                  ['Date', 'Project', 'Category', 'Sqft', 'Tier', 'Estimated', 'Actual', 'Variance %', 'Notes'],
                  ...audits.map(a => [
                    a.date,
                    a.projectName,
                    a.category,
                    a.squareFootage,
                    a.tier,
                    a.estimatedTotal,
                    a.actualTotal,
                    a.variancePercent.toFixed(1),
                    a.notes
                  ])
                ].map(row => row.join(',')).join('\n');
                
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `audit-tracker-${new Date().toISOString().split('T')[0]}.csv`;
                a.click();
              }}
              className="px-4 py-2 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              Export as CSV
            </button>
            <button
              onClick={() => {
                const json = JSON.stringify(audits, null, 2);
                const blob = new Blob([json], { type: 'application/json' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `audit-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
                a.click();
              }}
              className="px-4 py-2 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              Backup as JSON
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
