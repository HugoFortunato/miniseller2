import { useState, useEffect, useCallback } from 'react';

import type { Lead, Opportunity } from '../types';
import leadsData from '../data/leads.json';

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setLeads(leadsData as Lead[]);
      } catch (err) {
        setError('Error loading leads');
        console.error('Error loading leads:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleLeadSelect = useCallback((lead: Lead): void => {
    setSelectedLead(lead);
    setIsDetailPanelOpen(true);
  }, []);

  const handleLeadSave = useCallback((updatedLead: Lead): void => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead))
    );
    setSelectedLead(updatedLead);
  }, []);

  const handleConvertToOpportunity = useCallback((lead: Lead): void => {
    setTimeout(() => {
      const newOpportunity: Opportunity = {
        id: Date.now(),
        name: lead.name,
        stage: 'prospecting',
        amount:
          lead.score > 80
            ? Math.floor(Math.random() * 50000) + 10000
            : undefined,
        accountName: lead.company,
      };

      setOpportunities((prev) => [...prev, newOpportunity]);

      const updatedLead = { ...lead, status: 'converted' as const };
      setLeads((prevLeads) =>
        prevLeads.map((l) => (l.id === lead.id ? updatedLead : l))
      );
      setSelectedLead(updatedLead);

      setIsDetailPanelOpen(false);
    }, 500);
  }, []);

  const handleCloseDetailPanel = useCallback((): void => {
    setIsDetailPanelOpen(false);
    setSelectedLead(null);
  }, []);

  return {
    leads,
    opportunities,
    loading,
    error,
    selectedLead,
    isDetailPanelOpen,
    handleLeadSelect,
    handleLeadSave,
    handleConvertToOpportunity,
    handleCloseDetailPanel,
  };
}
