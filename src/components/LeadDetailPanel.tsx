import { useState, useEffect } from 'react';
import { X, Save, XCircle, Edit3 } from 'lucide-react';

import { Button } from './ui/button';
import type { Lead, LeadStatus } from '../types';

interface LeadDetailPanelProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (lead: Lead) => void;
  onConvertToOpportunity: (lead: Lead) => void;
}

const statusLabels: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  converted: 'Converted',
  lost: 'Lost',
};

const statusOptions: { value: LeadStatus; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'converted', label: 'Converted' },
  { value: 'lost', label: 'Lost' },
];

export function LeadDetailPanel({
  lead,
  isOpen,
  onClose,
  onSave,
  onConvertToOpportunity,
}: LeadDetailPanelProps) {
  const [editedLead, setEditedLead] = useState<Lead | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    if (lead) {
      setEditedLead({ ...lead });
      setIsEditing(false);
      setEmailError('');
    }
  }, [lead]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (email: string): void => {
    setEditedLead((prev) => (prev ? { ...prev, email } : null));
    if (email && !validateEmail(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handleStatusChange = (status: LeadStatus): void => {
    setEditedLead((prev) => (prev ? { ...prev, status } : null));
  };

  const handleSave = (): void => {
    if (!editedLead) return;

    if (editedLead.email && !validateEmail(editedLead.email)) {
      setEmailError('Invalid email format');
      return;
    }

    onSave(editedLead);
    setIsEditing(false);
    setEmailError('');
  };

  const handleCancel = (): void => {
    if (lead) {
      setEditedLead({ ...lead });
    }
    setIsEditing(false);
    setEmailError('');
  };

  const handleConvertToOpportunity = (): void => {
    if (lead) {
      onConvertToOpportunity(lead);
    }
  };

  if (!isOpen || !lead || !editedLead) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-gray-100 opacity-75 bg-opacity-50"
        onClick={onClose}
      />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Lead Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                {editedLead.name}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company
              </label>
              <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                {editedLead.company}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              {isEditing ? (
                <div>
                  <input
                    type="email"
                    value={editedLead.email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      emailError ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter email"
                  />
                  {emailError && (
                    <p className="mt-1 text-sm text-red-600">{emailError}</p>
                  )}
                </div>
              ) : (
                <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                  {editedLead.email}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Source
              </label>
              <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                {editedLead.source}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Score
              </label>
              <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    editedLead.score >= 80
                      ? 'bg-green-100 text-green-800'
                      : editedLead.score >= 60
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}
                >
                  {editedLead.score}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              {isEditing ? (
                <select
                  value={editedLead.status}
                  onChange={(e) =>
                    handleStatusChange(e.target.value as LeadStatus)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      editedLead.status === 'new'
                        ? 'bg-blue-100 text-blue-800'
                        : editedLead.status === 'contacted'
                          ? 'bg-yellow-100 text-yellow-800'
                          : editedLead.status === 'qualified'
                            ? 'bg-green-100 text-green-800'
                            : editedLead.status === 'converted'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {statusLabels[editedLead.status]}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 p-6 space-y-3">
            {!isEditing ? (
              <div className="flex gap-3">
                <Button
                  onClick={() => setIsEditing(true)}
                  className="flex-1"
                  variant="outline"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  onClick={handleConvertToOpportunity}
                  className="flex-1"
                  disabled={editedLead.status === 'converted'}
                >
                  Convert to Opportunity
                </Button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="flex-1"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="flex-1"
                  disabled={!!emailError}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
