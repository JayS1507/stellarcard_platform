import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import NetworkStatusBanner from '../../components/ui/NetworkStatusBanner';
import WalletStatusIndicator from '../../components/ui/WalletStatusIndicator';
import MarketplaceHeader from './components/MarketplaceHeader';
import CardGrid from './components/CardGrid';
import LiquidityPoolsSection from './components/LiquidityPoolsSection';
import TradingHistorySection from './components/TradingHistorySection';
import MyListingsSection from './components/MyListingsSection';
import QuickBuyModal from './components/QuickBuyModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MarketplaceTradingHub = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [showQuickBuyModal, setShowQuickBuyModal] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  // Mock marketplace data
  const marketplaceCards = [
    {
      id: 'card_001',
      name: 'DeFi Yield Optimizer Pro',
      issuer: 'StellarDeFi Labs',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
      price: 125.50,
      volume: 45000,
      yield: 15.8,
      change: 2.3,
      liquidity: 890000,
      holders: 1247,
      rating: 4.8,
      risk: 'Medium',
      isNew: true,
      isFeatured: false,
      maxQuantity: 50
    },
    {
      id: 'card_002',
      name: 'NFT Collectible Alpha',
      issuer: 'ArtChain Studios',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop',
      price: 89.25,
      volume: 23000,
      yield: 8.5,
      change: -1.2,
      liquidity: 450000,
      holders: 892,
      rating: 4.6,
      risk: 'High',
      isNew: false,
      isFeatured: true,
      maxQuantity: 25
    },
    {
      id: 'card_003',
      name: 'Governance Token Beta',
      issuer: 'DecentralDAO',
      image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop',
      price: 67.80,
      volume: 78000,
      yield: 12.3,
      change: 5.7,
      liquidity: 1200000,
      holders: 2156,
      rating: 4.9,
      risk: 'Low',
      isNew: false,
      isFeatured: false,
      maxQuantity: 100
    },
    {
      id: 'card_004',
      name: 'Utility Card Gamma',
      issuer: 'StellarUtils Inc',
      image: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=400&h=300&fit=crop',
      price: 156.90,
      volume: 34000,
      yield: 18.7,
      change: 3.1,
      liquidity: 670000,
      holders: 743,
      rating: 4.7,
      risk: 'Medium',
      isNew: true,
      isFeatured: true,
      maxQuantity: 30
    },
    {
      id: 'card_005',
      name: 'Staking Rewards Delta',
      issuer: 'StakeMax Protocol',
      image: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=400&h=300&fit=crop',
      price: 234.15,
      volume: 67000,
      yield: 22.4,
      change: 8.9,
      liquidity: 1500000,
      holders: 1834,
      rating: 4.8,
      risk: 'High',
      isNew: false,
      isFeatured: false,
      maxQuantity: 20
    },
    {
      id: 'card_006',
      name: 'Cross-Chain Bridge Card',
      issuer: 'BridgeWorks',
      image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&h=300&fit=crop',
      price: 98.45,
      volume: 56000,
      yield: 14.2,
      change: -0.8,
      liquidity: 780000,
      holders: 1456,
      rating: 4.5,
      risk: 'Medium',
      isNew: false,
      isFeatured: false,
      maxQuantity: 75
    }
  ];

  useEffect(() => {
    // Check wallet connection status
    const checkWalletConnection = () => {
      const connected = localStorage.getItem('walletConnected') === 'true';
      setIsWalletConnected(connected);
      
      if (!connected) {
        // Redirect to wallet connection if not connected
        navigate('/wallet-connection-authentication');
      }
    };

    checkWalletConnection();
    window.addEventListener('storage', checkWalletConnection);
    return () => window.removeEventListener('storage', checkWalletConnection);
  }, [navigate]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (key, value) => {
    if (key === 'reset') {
      setFilters({});
    } else {
      setFilters(prev => ({
        ...prev,
        [key]: value
      }));
    }
  };

  const handleCardSelect = (card) => {
    setSelectedCard(card);
    // Navigate to detailed card view (would be implemented)
    console.log('Selected card:', card);
  };

  const handleQuickBuy = (card) => {
    setSelectedCard(card);
    setShowQuickBuyModal(true);
  };

  const handleConfirmPurchase = (purchaseData) => {
    console.log('Purchase confirmed:', purchaseData);
    setShowQuickBuyModal(false);
    setSelectedCard(null);
    // Implement purchase logic here
  };

  const handleJoinPool = (pool, action) => {
    console.log('Pool action:', action, pool);
    // Implement pool joining logic
  };

  const handleCalculateImpermanentLoss = (values) => {
    console.log('Calculate IL:', values);
    // Implement IL calculation
  };

  const handleExportHistory = () => {
    console.log('Exporting trading history...');
    // Implement CSV export
  };

  const handleViewTransaction = (tx) => {
    console.log('View transaction:', tx);
    // Navigate to transaction details
  };

  const handleEditListing = (listing) => {
    console.log('Edit listing:', listing);
    // Implement listing edit
  };

  const handleCancelListing = (listing) => {
    console.log('Cancel listing:', listing);
    // Implement listing cancellation
  };

  const handleCreateListing = () => {
    console.log('Create new listing');
    // Implement listing creation
  };

  const filteredCards = marketplaceCards?.filter(card => {
    // Search filter
    if (searchQuery && !card?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) &&
        !card?.issuer?.toLowerCase()?.includes(searchQuery?.toLowerCase())) {
      return false;
    }

    // Card type filter
    if (filters?.cardType && filters?.cardType !== 'all') {
      const cardType = card?.name?.toLowerCase();
      switch (filters?.cardType) {
        case 'defi':
          if (!cardType?.includes('defi') && !cardType?.includes('yield') && !cardType?.includes('staking')) return false;
          break;
        case 'nft':
          if (!cardType?.includes('nft') && !cardType?.includes('collectible')) return false;
          break;
        case 'utility':
          if (!cardType?.includes('utility') && !cardType?.includes('bridge')) return false;
          break;
        case 'governance':
          if (!cardType?.includes('governance')) return false;
          break;
      }
    }

    // Price range filter
    if (filters?.priceRange && filters?.priceRange !== 'all') {
      const [min, max] = filters?.priceRange?.split('-')?.map(p => p?.replace('+', ''));
      const minPrice = parseFloat(min) || 0;
      const maxPrice = max ? parseFloat(max) : Infinity;
      
      if (card?.price < minPrice || card?.price > maxPrice) return false;
    }

    return true;
  });

  // Sort filtered cards
  const sortedCards = [...filteredCards]?.sort((a, b) => {
    switch (filters?.sortBy) {
      case 'price-low':
        return a?.price - b?.price;
      case 'price-high':
        return b?.price - a?.price;
      case 'volume':
        return b?.volume - a?.volume;
      case 'yield':
        return b?.yield - a?.yield;
      case 'newest':
      default:
        return b?.isNew - a?.isNew;
    }
  });

  const tabs = [
    { id: 'browse', label: 'Browse Cards', icon: 'Search' },
    { id: 'listings', label: 'My Listings', icon: 'Package' },
    { id: 'pools', label: 'Liquidity Pools', icon: 'Droplets' },
    { id: 'history', label: 'Trading History', icon: 'History' }
  ];

  if (!isWalletConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <NetworkStatusBanner />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <Icon name="Wallet" size={64} className="text-muted-foreground mb-4 mx-auto" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">Wallet Connection Required</h2>
            <p className="text-muted-foreground mb-6">Please connect your wallet to access the marketplace</p>
            <Button
              variant="default"
              onClick={() => navigate('/wallet-connection-authentication')}
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
      <Header />
      <NetworkStatusBanner />
      <main className="pb-8">
        {/* Page Header */}
        <div className="bg-card border-b border-border">
          <div className="px-4 lg:px-6 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <NavigationBreadcrumbs />
                <h1 className="text-3xl font-bold text-foreground mt-2">Marketplace & Trading Hub</h1>
                <p className="text-muted-foreground mt-1">
                  Discover, trade, and invest in blockchain cards with advanced DeFi features
                </p>
              </div>
              <WalletStatusIndicator />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-card border-b border-border">
          <div className="px-4 lg:px-6">
            <div className="flex space-x-1 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-150 ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1">
          {activeTab === 'browse' && (
            <>
              <MarketplaceHeader
                onSearchChange={handleSearchChange}
                onFilterChange={handleFilterChange}
                activeFilters={filters}
              />
              <CardGrid
                cards={sortedCards}
                onCardSelect={handleCardSelect}
                onQuickBuy={handleQuickBuy}
              />
            </>
          )}

          {activeTab === 'listings' && (
            <div className="p-4 lg:p-6">
              <MyListingsSection
                onEditListing={handleEditListing}
                onCancelListing={handleCancelListing}
                onCreateListing={handleCreateListing}
              />
            </div>
          )}

          {activeTab === 'pools' && (
            <div className="p-4 lg:p-6">
              <LiquidityPoolsSection
                onJoinPool={handleJoinPool}
                onCalculateImpermanentLoss={handleCalculateImpermanentLoss}
              />
            </div>
          )}

          {activeTab === 'history' && (
            <div className="p-4 lg:p-6">
              <TradingHistorySection
                onExportHistory={handleExportHistory}
                onViewTransaction={handleViewTransaction}
              />
            </div>
          )}
        </div>
      </main>
      {/* Quick Buy Modal */}
      <QuickBuyModal
        card={selectedCard}
        isOpen={showQuickBuyModal}
        onClose={() => {
          setShowQuickBuyModal(false);
          setSelectedCard(null);
        }}
        onConfirmPurchase={handleConfirmPurchase}
      />
    </div>
  );
};

export default MarketplaceTradingHub;