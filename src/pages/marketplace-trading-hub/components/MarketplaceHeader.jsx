import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const MarketplaceHeader = ({ onSearchChange, onFilterChange, activeFilters }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    // Mock wallet balance
    const balance = localStorage.getItem('walletBalance') || '1,247.85';
    setWalletBalance(balance);
  }, []);

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    onSearchChange(value);
  };

  const cardTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'defi', label: 'DeFi Cards' },
    { value: 'nft', label: 'NFT Cards' },
    { value: 'utility', label: 'Utility Cards' },
    { value: 'governance', label: 'Governance Cards' }
  ];

  const priceRangeOptions = [
    { value: 'all', label: 'All Prices' },
    { value: '0-100', label: '0 - 100 XLM' },
    { value: '100-500', label: '100 - 500 XLM' },
    { value: '500-1000', label: '500 - 1,000 XLM' },
    { value: '1000+', label: '1,000+ XLM' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'volume', label: 'Trading Volume' },
    { value: 'yield', label: 'Highest Yield' }
  ];

  return (
    <div className="bg-card border-b border-border">
      <div className="px-4 lg:px-6 py-4">
        {/* Top Row - Search and Wallet */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <Input
                type="search"
                placeholder="Search cards, issuers, or assets..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg">
              <Icon name="Wallet" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium">{walletBalance} XLM</span>
            </div>
            
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              iconName="Filter"
              iconPosition="left"
              className="lg:hidden"
            >
              Filters
            </Button>
          </div>
        </div>

        {/* Filters Row */}
        <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Card Type"
              options={cardTypeOptions}
              value={activeFilters?.cardType || 'all'}
              onChange={(value) => onFilterChange('cardType', value)}
            />
            
            <Select
              label="Price Range"
              options={priceRangeOptions}
              value={activeFilters?.priceRange || 'all'}
              onChange={(value) => onFilterChange('priceRange', value)}
            />
            
            <Select
              label="Sort By"
              options={sortOptions}
              value={activeFilters?.sortBy || 'newest'}
              onChange={(value) => onFilterChange('sortBy', value)}
            />

            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => onFilterChange('reset')}
                iconName="RotateCcw"
                iconPosition="left"
                fullWidth
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {Object.keys(activeFilters)?.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {Object.entries(activeFilters)?.map(([key, value]) => (
              value !== 'all' && (
                <div
                  key={key}
                  className="flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
                >
                  <span>{value}</span>
                  <button
                    onClick={() => onFilterChange(key, 'all')}
                    className="hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceHeader;