import { useState, useEffect } from 'react';

import type { LeadStatus } from '../types';

interface LeadFilters {
  searchTerm: string;
  statusFilter: LeadStatus | 'all';
  sortBy: 'score' | 'name' | 'company';
  sortOrder: 'asc' | 'desc';
}

const STORAGE_KEY = 'miniseller-lead-filters';

const defaultFilters: LeadFilters = {
  searchTerm: '',
  statusFilter: 'all',
  sortBy: 'score',
  sortOrder: 'desc',
};

export function useLeadFilters() {
  let savedFilters: LeadFilters = defaultFilters;

  const raw = localStorage.getItem(STORAGE_KEY);

  if (raw) {
    try {
      savedFilters = JSON.parse(raw);
    } catch (err) {
      console.warn('Invalid JSON in localStorage, using defaults', err);
      savedFilters = defaultFilters;
    }
  }

  const [filters, setFilters] = useState<LeadFilters>(savedFilters);

  useEffect(() => {
    try {
      const savedFilters = localStorage.getItem(STORAGE_KEY);
      if (savedFilters) {
        const parsedFilters = JSON.parse(savedFilters) as Partial<LeadFilters>;
        setFilters({ ...defaultFilters, ...parsedFilters });
      }
    } catch (error) {
      console.warn('Error loading filters from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
    } catch (error) {
      console.warn('Error saving filters to localStorage:', error);
    }
  }, [filters]);

  const updateFilters = (newFilters: Partial<LeadFilters>): void => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = (): void => {
    setFilters(defaultFilters);
  };

  return {
    filters,
    updateFilters,
    resetFilters,
  };
}
