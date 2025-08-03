import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NetworkStatusBanner from '../../components/ui/NetworkStatusBanner';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import WalletStatusIndicator from '../../components/ui/WalletStatusIndicator';
import PortfolioOverview from './components/PortfolioOverview';
import CardCarousel from './components/CardCarousel';
import SmartContractPanel from './components/SmartContractPanel';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';
import NetworkStatus from './components/NetworkStatus';
import Icon from '../../components/AppIcon';

const DashboardSmartContractHub = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for portfolio overview
  const portfolioData = {
    totalBalance: 125847.50,
    balanceChange: 12.5,
    activeCards: 8,
    newCardsThisMonth: 3,
    activeContracts: 12,
    contractExecutions: 47,
    recentTransactions: 156
  };

  // Mock data for cards
  const mockCards = [
    {
      id: 'card_001',
      name: 'Premium Rewards Card',
      type: 'Rewards',
      cardId: 'SC_001_XLM',
      balance: 15420.75,
      currency: 'XLM',
      status: 'active',
      createdAt: '2025-01-15T10:30:00Z'
    },
    {
      id: 'card_002',
      name: 'Business Travel Card',
      type: 'Business',
      cardId: 'SC_002_USD',
      balance: 8750.00,
      currency: 'USDC',
      status: 'active',
      createdAt: '2025-01-20T14:15:00Z'
    },
    {
      id: 'card_003',
      name: 'Savings Card',
      type: 'Savings',
      cardId: 'SC_003_XLM',
      balance: 25600.25,
      currency: 'XLM',
      status: 'pending',
      createdAt: '2025-01-28T09:45:00Z'
    }
  ];

  // Mock data for smart contracts
  const mockContracts = [
    {
      id: 'contract_001',
      name: 'Card Issuance Contract',
      description: 'Handles automated card creation and validation',
      address: 'CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQAHHAGK',
      status: 'deployed',
      deployedAt: '2025-01-10T08:30:00Z',
      gasUsed: 0.0045,
      executionCount: 23,
      recentExecutions: [
        { function: 'createCard', timestamp: '2025-02-02T08:45:00Z', status: 'success' },
        { function: 'validateCard', timestamp: '2025-02-02T07:30:00Z', status: 'success' },
        { function: 'updateBalance', timestamp: '2025-02-02T06:15:00Z', status: 'success' }
      ]
    },
    {
      id: 'contract_002',
      name: 'Rewards Distribution',
      description: 'Manages reward calculations and distributions',
      address: 'CBLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQAHHBGK',
      status: 'executing',
      deployedAt: '2025-01-18T12:00:00Z',
      gasUsed: 0.0032,
      executionCount: 156,
      recentExecutions: [
        { function: 'calculateRewards', timestamp: '2025-02-02T09:00:00Z', status: 'success' },
        { function: 'distributeRewards', timestamp: '2025-02-02T08:30:00Z', status: 'success' },
        { function: 'updateRewardRate', timestamp: '2025-02-02T07:45:00Z', status: 'failed' }
      ]
    }
  ];

  // Mock data for recent activities
  const mockActivities = [
    {
      id: 'activity_001',
      type: 'card_created',
      title: 'New Card Created',
      description: 'Premium Rewards Card successfully issued',
      amount: null,
      currency: null,
      status: 'completed',
      timestamp: '2025-02-02T09:30:00Z'
    },
    {
      id: 'activity_002',
      type: 'asset_transfer',
      title: 'Asset Transfer',
      description: 'Sent XLM to external wallet',
      amount: 1500,
      currency: 'XLM',
      status: 'completed',
      timestamp: '2025-02-02T08:15:00Z'
    },
    {
      id: 'activity_003',
      type: 'contract_executed',
      title: 'Smart Contract Executed',
      description: 'Rewards distribution contract executed successfully',
      amount: null,
      currency: null,
      status: 'completed',
      timestamp: '2025-02-02T07:45:00Z'
    },
    {
      id: 'activity_004',
      type: 'rewards_earned',
      title: 'Rewards Earned',
      description: 'Monthly rewards credited to account',
      amount: 245.50,
      currency: 'XLM',
      status: 'completed',
      timestamp: '2025-02-02T06:00:00Z'
    },
    {
      id: 'activity_005',
      type: 'card_traded',
      title: 'Card Traded',
      description: 'Business Travel Card sold in marketplace',
      amount: 2500,
      currency: 'XLM',
      status: 'pending',
      timestamp: '2025-02-01T18:30:00Z'
    }
  ];

  useEffect(() => {
    // Check wallet connection
    const isWalletConnected = localStorage.getItem('walletConnected') === 'true';
    if (!isWalletConnected) {
      navigate('/wallet-connection-authentication');
      return;
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'create-card': navigate('/card-creation-management');
        break;
      case 'transfer-assets':
        // Handle transfer assets modal/flow
        console.log('Transfer assets clicked');
        break;
      case 'deploy-contract':
        // Handle deploy contract modal/flow
        console.log('Deploy contract clicked');
        break;
      case 'view-marketplace': navigate('/marketplace-trading-hub');
        break;
      case 'stake-rewards':
        // Handle stake rewards modal/flow
        console.log('Stake rewards clicked');
        break;
      case 'view-history': navigate('/transaction-history-analytics');
        break;
      default:
        console.log('Unknown action:', actionId);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'cards', label: 'My Cards', icon: 'CreditCard' },
    { id: 'contracts', label: 'Smart Contracts', icon: 'Code' },
    { id: 'activity', label: 'Recent Activity', icon: 'Activity' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <NetworkStatusBanner />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NetworkStatusBanner />
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        {/* Breadcrumbs and Wallet Status */}
        <div className="flex items-center justify-between mb-6">
          <NavigationBreadcrumbs />
          <WalletStatusIndicator />
        </div>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your blockchain cards and smart contracts
            </p>
          </div>
          <div className="hidden lg:block">
            <NetworkStatus />
          </div>
        </div>

        {/* Portfolio Overview */}
        <PortfolioOverview portfolioData={portfolioData} />

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap ${
                activeTab === tab?.id
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <CardCarousel cards={mockCards} />
                <QuickActions onActionClick={handleQuickAction} />
              </div>
              <div className="space-y-6">
                <SmartContractPanel contracts={mockContracts} />
                <div className="lg:hidden">
                  <NetworkStatus />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cards' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <CardCarousel cards={mockCards} />
              </div>
              <div>
                <QuickActions onActionClick={handleQuickAction} />
              </div>
            </div>
          )}

          {activeTab === 'contracts' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SmartContractPanel contracts={mockContracts} />
              <div className="space-y-6">
                <NetworkStatus />
                <QuickActions onActionClick={handleQuickAction} />
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RecentActivity activities={mockActivities} />
              </div>
              <div className="space-y-6">
                <NetworkStatus />
                <QuickActions onActionClick={handleQuickAction} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardSmartContractHub;