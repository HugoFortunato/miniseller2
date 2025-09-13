import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LeadsList } from '../LeadsList';
import type { Lead } from '../../types';

const mockLeads: Lead[] = [
  {
    id: 1,
    name: 'John Silva',
    company: 'TechCorp Solutions',
    email: 'john.silva@techcorp.com',
    source: 'Website',
    score: 85,
    status: 'new',
  },
  {
    id: 2,
    name: 'Maria Santos',
    company: 'Digital Innovation',
    email: 'maria@digitalinnovation.com',
    source: 'LinkedIn',
    score: 92,
    status: 'contacted',
  },
  {
    id: 3,
    name: 'Peter Costa',
    company: 'StartupXYZ',
    email: 'peter.costa@startupxyz.com',
    source: 'Referral',
    score: 78,
    status: 'qualified',
  },
];

const defaultFilters = {
  searchTerm: '',
  statusFilter: 'all' as const,
  sortBy: 'score' as const,
  sortOrder: 'desc' as const,
};

const mockProps = {
  leads: mockLeads,
  onLeadSelect: jest.fn(),
  loading: false,
  filters: defaultFilters,
  onFiltersChange: jest.fn(),
  onResetFilters: jest.fn(),
};

describe('LeadsList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders leads table with correct data', () => {
    render(<LeadsList {...mockProps} />);

    expect(screen.getByText('John Silva')).toBeInTheDocument();
    expect(screen.getByText('Maria Santos')).toBeInTheDocument();
    expect(screen.getByText('Peter Costa')).toBeInTheDocument();

    expect(screen.getByText('TechCorp Solutions')).toBeInTheDocument();
    expect(screen.getByText('Digital Innovation')).toBeInTheDocument();
    expect(screen.getByText('StartupXYZ')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<LeadsList {...mockProps} loading={true} />);

    expect(screen.getByText('Loading leads...')).toBeInTheDocument();
  });

  it('shows empty state when no leads', () => {
    render(<LeadsList {...mockProps} leads={[]} />);

    expect(screen.getByText('No leads found')).toBeInTheDocument();
  });

  it('calls onLeadSelect when row is clicked', async () => {
    const user = userEvent.setup();
    render(<LeadsList {...mockProps} />);

    const firstRow = screen.getByText('John Silva').closest('tr');
    await user.click(firstRow!);

    expect(mockProps.onLeadSelect).toHaveBeenCalledWith(mockLeads[0]);
  });

  it('sorts leads by different columns', async () => {
    const user = userEvent.setup();
    render(<LeadsList {...mockProps} />);

    const nameHeader = screen.getByText('Name');
    await user.click(nameHeader);

    expect(mockProps.onFiltersChange).toHaveBeenCalledWith({
      sortBy: 'name',
      sortOrder: 'desc',
    });
  });

  it('shows reset filters button when filters are active', () => {
    const filtersWithSearch = {
      ...defaultFilters,
      searchTerm: 'test',
    };

    render(<LeadsList {...mockProps} filters={filtersWithSearch} />);

    expect(screen.getByText('Clear Filters')).toBeInTheDocument();
  });

  it('calls onResetFilters when reset button is clicked', async () => {
    const user = userEvent.setup();
    const filtersWithSearch = {
      ...defaultFilters,
      searchTerm: 'test',
    };

    render(<LeadsList {...mockProps} filters={filtersWithSearch} />);

    const resetButton = screen.getByText('Clear Filters');
    await user.click(resetButton);

    expect(mockProps.onResetFilters).toHaveBeenCalled();
  });

  it('displays score with correct color coding', () => {
    render(<LeadsList {...mockProps} />);

    const highScore = screen.getByText('85');
    expect(highScore).toHaveClass('bg-green-100');

    const mediumScore = screen.getByText('78');
    expect(mediumScore).toHaveClass('bg-yellow-100');
  });

  it('shows no results message when filtered leads are empty', () => {
    const filtersWithSearch = {
      ...defaultFilters,
      searchTerm: 'nonexistent',
    };

    render(<LeadsList {...mockProps} filters={filtersWithSearch} />);

    expect(
      screen.getByText('No leads found with applied filters')
    ).toBeInTheDocument();
  });
});
