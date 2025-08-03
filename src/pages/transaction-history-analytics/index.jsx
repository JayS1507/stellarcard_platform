import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import NetworkStatusBanner from '../../components/ui/NetworkStatusBanner';
import WalletStatusIndicator from '../../components/ui/WalletStatusIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import TransactionCard from './components/TransactionCard';
import FilterPanel from './components/FilterPanel';
import AnalyticsChart from './components/AnalyticsChart';
import TransactionTable from './components/TransactionTable';
import ExportModal from './components/ExportModal';
import TransactionDetailsModal from './components/TransactionDetailsModal';

const TransactionHistoryAnalytics = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    type: 'all',
    status: 'all',
    card: 'all',
    minAmount: '',
    maxAmount: '',
    showIncoming: true,
    showOutgoing: true
  });

  // Mock transaction data
  const mockTransactions = [
    {
      id: 'tx_001',
      hash: 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
      type: 'card_payment',
      description: 'Coffee Shop Purchase',
      counterparty: 'Stellar Cafe Downtown',
      amount: 12.50,
      direction: 'outgoing',
      status: 'confirmed',
      timestamp: new Date('2025-08-02T08:30:00'),
      cardName: 'Stellar Premium Card',
      fees: 0.00001
    },
    {
      id: 'tx_002',
      hash: 'b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567a',
      type: 'smart_contract',
      description: 'Staking Reward Distribution',
      counterparty: 'StellarCard Staking Pool',
      amount: 25.75,
      direction: 'incoming',
      status: 'confirmed',
      timestamp: new Date('2025-08-01T14:22:00'),
      cardName: null,
      fees: 0.00002
    },
    {
      id: 'tx_003',
      hash: 'c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567ab2',
      type: 'transfer',
      description: 'P2P Transfer to Friend',
      counterparty: 'GDQP2KPQGKIHYJGXNUIYOMHARUARCA7DJT5FO2FFOOKY3B2WSQHG4W37',
      amount: 50.00,
      direction: 'outgoing',
      status: 'pending',
      timestamp: new Date('2025-08-01T11:15:00'),
      cardName: 'Stellar Basic Card',
      fees: 0.00001
    },
    {
      id: 'tx_004',
      hash: 'd4e5f6789012345678901234567890abcdef1234567890abcdef1234567ab2c3',
      type: 'card_payment',
      description: 'Online Shopping - Electronics',
      counterparty: 'TechMart Online Store',
      amount: 299.99,
      direction: 'outgoing',
      status: 'confirmed',
      timestamp: new Date('2025-07-31T16:45:00'),
      cardName: 'Stellar Premium Card',
      fees: 0.00001
    },
    {
      id: 'tx_005',
      hash: 'e5f6789012345678901234567890abcdef1234567890abcdef1234567ab2c3d4',
      type: 'reward',
      description: 'Cashback Reward',
      counterparty: 'StellarCard Rewards Program',
      amount: 15.00,
      direction: 'incoming',
      status: 'confirmed',
      timestamp: new Date('2025-07-31T09:30:00'),
      cardName: 'Stellar Premium Card',
      fees: 0.00000
    },
    {
      id: 'tx_006',
      hash: 'f6789012345678901234567890abcdef1234567890abcdef1234567ab2c3d4e5',
      type: 'stake',
      description: 'XLM Staking Deposit',
      counterparty: 'Stellar Validator Network',
      amount: 1000.00,
      direction: 'outgoing',
      status: 'confirmed',
      timestamp: new Date('2025-07-30T13:20:00'),
      cardName: null,
      fees: 0.00003
    },
    {
      id: 'tx_007',
      hash: '6789012345678901234567890abcdef1234567890abcdef1234567ab2c3d4e5f',
      type: 'card_payment',
      description: 'Gas Station Fill-up',
      counterparty: 'Shell Station #4521',
      amount: 45.80,
      direction: 'outgoing',
      status: 'failed',
      timestamp: new Date('2025-07-30T07:45:00'),
      cardName: 'Stellar Basic Card',
      fees: 0.00001
    },
    {
      id: 'tx_008',
      hash: '789012345678901234567890abcdef1234567890abcdef1234567ab2c3d4e5f6',
      type: 'transfer',
      description: 'Salary Payment Received',
      counterparty: 'Stellar Corp Payroll',
      amount: 2500.00,
      direction: 'incoming',
      status: 'confirmed',
      timestamp: new Date('2025-07-29T12:00:00'),
      cardName: null,
      fees: 0.00001
    }
  ];

  useEffect(() => {
    const checkWalletConnection = () => {
      const connected = localStorage.getItem('walletConnected') === 'true';
      setIsWalletConnected(connected);
      setIsLoading(false);
    };

    checkWalletConnection();
    window.addEventListener('storage', checkWalletConnection);
    return () => window.removeEventListener('storage', checkWalletConnection);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailsOpen(true);
  };

  const handleBulkAction = (action, transactionIds) => {
    console.log(`Bulk ${action} for transactions:`, transactionIds);
    // Handle bulk actions like export, dispute, etc.
  };

  const handleExport = (config) => {
    console.log('Exporting with config:', config);
    // Handle export functionality
  };

  const filteredTransactions = mockTransactions?.filter(transaction => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      if (!transaction?.description?.toLowerCase()?.includes(query) &&
          !transaction?.counterparty?.toLowerCase()?.includes(query) &&
          !transaction?.hash?.toLowerCase()?.includes(query)) {
        return false;
      }
    }

    // Type filter
    if (filters?.type !== 'all' && transaction?.type !== filters?.type) {
      return false;
    }

    // Status filter
    if (filters?.status !== 'all' && transaction?.status !== filters?.status) {
      return false;
    }

    // Direction filter
    if (!filters?.showIncoming && transaction?.direction === 'incoming') {
      return false;
    }
    if (!filters?.showOutgoing && transaction?.direction === 'outgoing') {
      return false;
    }

    // Amount filter
    if (filters?.minAmount && transaction?.amount < parseFloat(filters?.minAmount)) {
      return false;
    }
    if (filters?.maxAmount && transaction?.amount > parseFloat(filters?.maxAmount)) {
      return false;
    }

    // Date filter
    if (filters?.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      if (transaction?.timestamp < fromDate) {
        return false;
      }
    }
    if (filters?.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate?.setHours(23, 59, 59, 999);
      if (transaction?.timestamp > toDate) {
        return false;
      }
    }

    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <NetworkStatusBanner />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading transaction history...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isWalletConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Transaction History & Analytics - StellarCard Platform</title>
          <meta name="description" content="View and analyze your blockchain transaction history with comprehensive filtering and analytics tools." />
        </Helmet>
        
        <Header />
        <NetworkStatusBanner />
        
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Wallet" size={32} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Connect Your Wallet</h2>
            <p className="text-muted-foreground mb-6">
              Please connect your Stellar wallet to view your transaction history and analytics.
            </p>
            <Button
              variant="default"
              onClick={() => window.location.href = '/wallet-connection-authentication'}
              iconName="Wallet"
              iconPosition="left"
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Transaction History & Analytics - StellarCard Platform</title>
        <meta name="description" content="View and analyze your blockchain transaction history with comprehensive filtering and analytics tools." />
      </Helmet>
      <Header />
      <NetworkStatusBanner />
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        {/* Breadcrumbs */}
        <NavigationBreadcrumbs className="mb-6" />
        
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl font-bold text-foreground mb-2">Transaction History</h1>
            <p className="text-muted-foreground">
              Track and analyze your blockchain activities across all cards and contracts
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <WalletStatusIndicator />
            <Button
              variant="outline"
              onClick={() => setIsExportOpen(true)}
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search transactions, addresses, or hashes..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e?.target?.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(true)}
                iconName="Filter"
                iconPosition="left"
              >
                Filters
              </Button>
              
              <div className="flex items-center bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'cards' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('cards')}
                  iconName="LayoutGrid"
                  className="rounded-md"
                />
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  iconName="Table"
                  className="rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="mb-8">
          <AnalyticsChart />
        </div>

        {/* Transactions Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Panel - Desktop */}
          <div className="hidden lg:block">
            <FilterPanel
              isOpen={true}
              onClose={() => {}}
              filters={filters}
              onFiltersChange={setFilters}
              onApplyFilters={() => {}}
              onClearFilters={() => setFilters({
                dateFrom: '',
                dateTo: '',
                type: 'all',
                status: 'all',
                card: 'all',
                minAmount: '',
                maxAmount: '',
                showIncoming: true,
                showOutgoing: true
              })}
            />
          </div>

          {/* Transactions List */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                Recent Transactions ({filteredTransactions?.length})
              </h2>
              <Button
                variant="ghost"
                size="sm"
                iconName="RefreshCw"
                iconPosition="left"
              >
                Refresh
              </Button>
            </div>

            {filteredTransactions?.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No transactions found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or filters to find transactions.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {viewMode === 'cards' ? (
                  filteredTransactions?.map((transaction) => (
                    <TransactionCard
                      key={transaction?.id}
                      transaction={transaction}
                      onViewDetails={handleViewDetails}
                    />
                  ))
                ) : (
                  <TransactionTable
                    transactions={filteredTransactions}
                    onViewDetails={handleViewDetails}
                    onBulkAction={handleBulkAction}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Filter Panel */}
      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        onApplyFilters={() => {}}
        onClearFilters={() => setFilters({
          dateFrom: '',
          dateTo: '',
          type: 'all',
          status: 'all',
          card: 'all',
          minAmount: '',
          maxAmount: '',
          showIncoming: true,
          showOutgoing: true
        })}
      />
      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        onExport={handleExport}
      />
      {/* Transaction Details Modal */}
      <TransactionDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        transaction={selectedTransaction}
      />
    </div>
  );
};

export default TransactionHistoryAnalytics;