import type { Opportunity } from '../types';

interface OpportunitiesTableProps {
  opportunities: Opportunity[];
  loading?: boolean;
}

const stageLabels: Record<Opportunity['stage'], string> = {
  prospecting: 'Prospecting',
  qualification: 'Qualification',
  proposal: 'Proposal',
  negotiation: 'Negotiation',
  'closed-won': 'Closed - Won',
  'closed-lost': 'Closed - Lost',
};

const stageColors: Record<Opportunity['stage'], string> = {
  prospecting: 'bg-blue-100 text-blue-800',
  qualification: 'bg-yellow-100 text-yellow-800',
  proposal: 'bg-purple-100 text-purple-800',
  negotiation: 'bg-orange-100 text-orange-800',
  'closed-won': 'bg-green-100 text-green-800',
  'closed-lost': 'bg-red-100 text-red-800',
};

export function OpportunitiesTable({
  opportunities,
  loading = false,
}: OpportunitiesTableProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-gray-500">Loading opportunities...</div>
      </div>
    );
  }

  if (opportunities.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 mb-2">No opportunities found</div>
        <p className="text-sm text-gray-400">
          Convert leads to create opportunities
        </p>
      </div>
    );
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Opportunities ({opportunities.length})
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Account
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {opportunities.map((opportunity) => (
              <tr key={opportunity.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {opportunity.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${stageColors[opportunity.stage]}`}
                  >
                    {stageLabels[opportunity.stage]}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {opportunity.amount
                    ? formatCurrency(opportunity.amount)
                    : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {opportunity.accountName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
