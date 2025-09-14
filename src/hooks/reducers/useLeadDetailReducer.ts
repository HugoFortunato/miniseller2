import { useReducer, useEffect } from 'react';

import { validateEmail } from '@/helpers/validateEmail';
import type { Lead, LeadStatus } from '@/types';

type State = {
  emailError: string;
  isEditing: boolean;
  editedLead: Lead | null;
};

type Action =
  | { type: 'INIT'; payload: Lead }
  | { type: 'SET_EDITING'; payload: boolean }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_STATUS'; payload: LeadStatus }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'RESET'; payload: Lead };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INIT':
      return {
        editedLead: { ...action.payload },
        isEditing: false,
        emailError: '',
      };

    case 'SET_EDITING':
      return { ...state, isEditing: action.payload };

    case 'SET_EMAIL': {
      if (!state.editedLead) return state;

      const newLead = { ...state.editedLead, email: action.payload };

      const emailError =
        action.payload && !validateEmail(action.payload)
          ? 'Invalid email format'
          : '';

      return { ...state, editedLead: newLead, emailError };
    }

    case 'SET_STATUS': {
      if (!state.editedLead) return state;

      const newLead = { ...state.editedLead, status: action.payload };

      return { ...state, editedLead: newLead };
    }

    case 'SET_ERROR':
      return { ...state, emailError: action.payload };

    case 'RESET':
      return {
        editedLead: { ...action.payload },
        isEditing: false,
        emailError: '',
      };

    default:
      return state;
  }
}

export function useLeadDetailReducer(
  lead: Lead | null,
  onSave: (lead: Lead) => void,
  onConvertToOpportunity: (lead: Lead) => void
) {
  const [state, dispatch] = useReducer(reducer, {
    emailError: '',
    isEditing: false,
    editedLead: null,
  });

  const handleEmailChange = (email: string): void => {
    dispatch({ type: 'SET_EMAIL', payload: email });

    if (email && !validateEmail(email)) {
      dispatch({ type: 'SET_ERROR', payload: 'Invalid email format' });
    } else {
      dispatch({ type: 'SET_ERROR', payload: '' });
    }
  };

  const handleStatusChange = (status: LeadStatus): void => {
    dispatch({ type: 'SET_STATUS', payload: status });
  };

  const handleSave = (): void => {
    if (!state.editedLead) return;

    if (state.editedLead.email && !validateEmail(state.editedLead.email)) {
      dispatch({ type: 'SET_ERROR', payload: 'Invalid email format' });

      return;
    }

    onSave(state.editedLead);

    dispatch({ type: 'SET_EDITING', payload: false });
    dispatch({ type: 'SET_STATUS', payload: 'new' });
    dispatch({ type: 'SET_ERROR', payload: '' });
  };

  const handleCancel = (): void => {
    if (lead) {
      dispatch({ type: 'RESET', payload: lead });
    }
    dispatch({ type: 'SET_EDITING', payload: false });
    dispatch({ type: 'SET_ERROR', payload: '' });
  };

  const handleConvertToOpportunity = (): void => {
    if (lead) {
      onConvertToOpportunity(lead);
    }

    dispatch({ type: 'SET_EDITING', payload: false });
    dispatch({ type: 'SET_ERROR', payload: '' });
  };

  useEffect(() => {
    if (lead) {
      dispatch({ type: 'INIT', payload: lead });
    }
  }, [lead]);

  useEffect(() => {
    if (lead) {
      dispatch({ type: 'INIT', payload: lead });
      dispatch({ type: 'SET_EDITING', payload: false });
      dispatch({ type: 'SET_ERROR', payload: '' });
    }
  }, [lead, dispatch]);

  return {
    state,

    dispatch,
    handleSave,
    handleCancel,
    handleEmailChange,
    handleStatusChange,
    handleConvertToOpportunity,
  };
}
