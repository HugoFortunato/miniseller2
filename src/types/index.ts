export interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
}

export interface Opportunity {
  id: number;
  name: string;
  stage:
    | 'prospecting'
    | 'qualification'
    | 'proposal'
    | 'negotiation'
    | 'closed-won'
    | 'closed-lost';
  amount?: number;
  accountName: string;
}

export type LeadStatus = Lead['status'];
export type OpportunityStage = Opportunity['stage'];
