import { LeadsList } from './components/LeadsList';
import { LeadDetailPanel } from './components/LeadDetailPanel';
import { OpportunitiesTable } from './components/OpportunitiesTable';
import { useLeads } from './hooks/useLeads';
import { useLeadFilters } from './hooks/useLeadFilters';
import { Users, Target } from 'lucide-react';

function App() {
  const {
    leads,
    error,
    loading,
    selectedLead,
    opportunities,
    isDetailPanelOpen,

    handleLeadSave,
    handleLeadSelect,
    handleConvertToOpportunity,
    handleCloseDetailPanel,
  } = useLeads();

  const { filters, updateFilters, resetFilters } = useLeadFilters();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg font-semibold mb-2">
            Error loading data
          </div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">
                Mini Seller Console
              </h1>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Target className="h-4 w-4 mr-1" />
              {opportunities.length} opportunities
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <section>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Leads ({leads.length})
              </h2>
              <p className="text-sm text-gray-600">
                Manage and convert your leads into opportunities
              </p>
            </div>
            <LeadsList
              leads={leads}
              onLeadSelect={handleLeadSelect}
              loading={loading}
              filters={filters}
              onFiltersChange={updateFilters}
              onResetFilters={resetFilters}
            />
          </section>

          {opportunities.length > 0 && (
            <section>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Opportunities
                </h2>
                <p className="text-sm text-gray-600">
                  Track the progress of your opportunities
                </p>
              </div>
              <OpportunitiesTable opportunities={opportunities} />
            </section>
          )}
        </div>
      </main>

      <LeadDetailPanel
        lead={selectedLead}
        isOpen={isDetailPanelOpen}
        onClose={handleCloseDetailPanel}
        onSave={handleLeadSave}
        onConvertToOpportunity={handleConvertToOpportunity}
      />
    </div>
  );
}

export default App;
