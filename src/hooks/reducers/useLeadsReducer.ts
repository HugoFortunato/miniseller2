import type { Lead, Opportunity } from '@/types';

export type LeadsState = {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  isDetailPanelOpen: boolean;
  selectedLead: Lead | null;
  opportunities: Opportunity[];
};

export type LeadsAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_LEADS'; payload: Lead[] }
  | { type: 'SET_SELECTED_LEAD'; payload: Lead | null }
  | { type: 'TOGGLE_DETAIL_PANEL'; payload: boolean }
  | { type: 'UPDATE_LEAD'; payload: Lead }
  | { type: 'ADD_OPPORTUNITY'; payload: Opportunity };

export const initialLeadsState: LeadsState = {
  leads: [],
  loading: true,
  error: null,
  isDetailPanelOpen: false,
  selectedLead: null,
  opportunities: [],
};

export function leadsReducer(
  state: LeadsState,
  action: LeadsAction
): LeadsState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_LEADS':
      return { ...state, leads: action.payload };
    case 'SET_SELECTED_LEAD':
      return { ...state, selectedLead: action.payload };
    case 'TOGGLE_DETAIL_PANEL':
      return { ...state, isDetailPanelOpen: action.payload };
    case 'UPDATE_LEAD':
      return {
        ...state,
        leads: state.leads.map((l) =>
          l.id === action.payload.id ? action.payload : l
        ),
        selectedLead: action.payload,
      };
    case 'ADD_OPPORTUNITY':
      return {
        ...state,
        opportunities: [...state.opportunities, action.payload],
      };
    default:
      return state;
  }
}
