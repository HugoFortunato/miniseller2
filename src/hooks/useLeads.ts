import { useEffect, useCallback, useReducer } from 'react';

import type { Lead, Opportunity } from '../types';
import leadsData from '../data/leads.json';
import { initialLeadsState, leadsReducer } from './reducers/useLeadsReducer';

export function useLeads() {
  const [state, dispatch] = useReducer(leadsReducer, initialLeadsState);

  useEffect(() => {
    const loadData = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });

        await new Promise((resolve) => setTimeout(resolve, 1000));

        dispatch({ type: 'SET_LEADS', payload: leadsData as Lead[] });
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: 'Error loading leads' });
        console.error('Error loading leads:', err);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadData();
  }, []);

  const handleLeadSelect = useCallback((lead: Lead): void => {
    dispatch({ type: 'SET_SELECTED_LEAD', payload: lead });
    dispatch({ type: 'TOGGLE_DETAIL_PANEL', payload: true });
  }, []);

  const handleLeadSave = useCallback((updatedLead: Lead): void => {
    dispatch({ type: 'UPDATE_LEAD', payload: updatedLead });
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

      dispatch({ type: 'ADD_OPPORTUNITY', payload: newOpportunity });

      const updatedLead = { ...lead, status: 'converted' as const };
      dispatch({ type: 'UPDATE_LEAD', payload: updatedLead });

      dispatch({ type: 'TOGGLE_DETAIL_PANEL', payload: false });
    }, 500);
  }, []);

  const handleCloseDetailPanel = useCallback((): void => {
    dispatch({ type: 'TOGGLE_DETAIL_PANEL', payload: false });
    dispatch({ type: 'SET_SELECTED_LEAD', payload: null });
  }, []);

  return {
    ...state,
    handleLeadSelect,
    handleLeadSave,
    handleConvertToOpportunity,
    handleCloseDetailPanel,
  };
}
