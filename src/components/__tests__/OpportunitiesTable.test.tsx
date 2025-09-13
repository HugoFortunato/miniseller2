import { render, screen } from '@testing-library/react';
import { OpportunitiesTable } from '../OpportunitiesTable';
import type { Opportunity } from '../../types';

const mockOpportunities: Opportunity[] = [
  {
    id: 1,
    name: 'Test Opportunity 1',
    stage: 'prospecting',
    amount: 50000,
    accountName: 'Company ABC',
  },
  {
    id: 2,
    name: 'Test Opportunity 2',
    stage: 'qualification',
    amount: 75000,
    accountName: 'Company XYZ',
  },
  {
    id: 3,
    name: 'Test Opportunity 3',
    stage: 'proposal',
    accountName: 'Company 123',
  },
];

describe('OpportunitiesTable Component', () => {
  it('renders table with opportunities', () => {
    render(<OpportunitiesTable opportunities={mockOpportunities} />);

    expect(screen.getByText('Opportunities (3)')).toBeInTheDocument();
    expect(screen.getByText('Test Opportunity 1')).toBeInTheDocument();
    expect(screen.getByText('Test Opportunity 2')).toBeInTheDocument();
    expect(screen.getByText('Test Opportunity 3')).toBeInTheDocument();
  });

  it('displays correct stage labels', () => {
    render(<OpportunitiesTable opportunities={mockOpportunities} />);

    expect(screen.getByText('Prospecting')).toBeInTheDocument();
    expect(screen.getByText('Qualification')).toBeInTheDocument();
    expect(screen.getByText('Proposal')).toBeInTheDocument();
  });

  it('formats currency correctly', () => {
    render(<OpportunitiesTable opportunities={mockOpportunities} />);

    expect(screen.getByText('R$ 50.000,00')).toBeInTheDocument();
    expect(screen.getByText('R$ 75.000,00')).toBeInTheDocument();
  });

  it('shows dash for opportunities without amount', () => {
    render(<OpportunitiesTable opportunities={mockOpportunities} />);

    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('displays account names', () => {
    render(<OpportunitiesTable opportunities={mockOpportunities} />);

    expect(screen.getByText('Company ABC')).toBeInTheDocument();
    expect(screen.getByText('Company XYZ')).toBeInTheDocument();
    expect(screen.getByText('Company 123')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<OpportunitiesTable opportunities={[]} loading={true} />);

    expect(screen.getByText('Loading opportunities...')).toBeInTheDocument();
  });

  it('shows empty state when no opportunities', () => {
    render(<OpportunitiesTable opportunities={[]} />);

    expect(screen.getByText('No opportunities found')).toBeInTheDocument();
    expect(
      screen.getByText('Convert leads to create opportunities')
    ).toBeInTheDocument();
  });

  it('renders table headers', () => {
    render(<OpportunitiesTable opportunities={mockOpportunities} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Stage')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
  });
});
