import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ isOpen, onClose, filters, onFiltersChange, onApplyFilters, onClearFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const transactionTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'card_payment', label: 'Card Payments' },
    { value: 'smart_contract', label: 'Smart Contracts' },
    { value: 'transfer', label: 'Transfers' },
    { value: 'stake', label: 'Staking' },
    { value: 'reward', label: 'Rewards' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' }
  ];

  const cardOptions = [
    { value: 'all', label: 'All Cards' },
    { value: 'stellar-premium', label: 'Stellar Premium Card' },
    { value: 'stellar-basic', label: 'Stellar Basic Card' },
    { value: 'stellar-business', label: 'Stellar Business Card' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
  };

  const handleApply = () => {
    onFiltersChange(localFilters);
    onApplyFilters();
    onClose();
  };

  const handleClear = () => {
    const clearedFilters = {
      dateFrom: '',
      dateTo: '',
      type: 'all',
      status: 'all',
      card: 'all',
      minAmount: '',
      maxAmount: '',
      showIncoming: true,
      showOutgoing: true
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    onClearFilters();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-1000 lg:hidden"
        onClick={onClose}
      />
      {/* Filter Panel */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-card border-l border-border z-1100 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } lg:relative lg:transform-none lg:w-full lg:h-auto lg:border-l-0 lg:border lg:rounded-lg`}>
        <div className="flex items-center justify-between p-4 border-b border-border lg:border-b-0">
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            className="lg:hidden"
          />
        </div>
        
        <div className="p-4 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
          {/* Date Range */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Date Range</h4>
            <div className="grid grid-cols-1 gap-3">
              <Input
                type="date"
                label="From"
                value={localFilters?.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
              />
              <Input
                type="date"
                label="To"
                value={localFilters?.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
              />
            </div>
          </div>

          {/* Transaction Type */}
          <div className="space-y-3">
            <Select
              label="Transaction Type"
              options={transactionTypes}
              value={localFilters?.type}
              onChange={(value) => handleFilterChange('type', value)}
            />
          </div>

          {/* Status */}
          <div className="space-y-3">
            <Select
              label="Status"
              options={statusOptions}
              value={localFilters?.status}
              onChange={(value) => handleFilterChange('status', value)}
            />
          </div>

          {/* Card */}
          <div className="space-y-3">
            <Select
              label="Card"
              options={cardOptions}
              value={localFilters?.card}
              onChange={(value) => handleFilterChange('card', value)}
            />
          </div>

          {/* Amount Range */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Amount Range (XLM)</h4>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                label="Min"
                placeholder="0"
                value={localFilters?.minAmount}
                onChange={(e) => handleFilterChange('minAmount', e?.target?.value)}
              />
              <Input
                type="number"
                label="Max"
                placeholder="1000"
                value={localFilters?.maxAmount}
                onChange={(e) => handleFilterChange('maxAmount', e?.target?.value)}
              />
            </div>
          </div>

          {/* Direction */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Direction</h4>
            <div className="space-y-2">
              <Checkbox
                label="Show Incoming"
                checked={localFilters?.showIncoming}
                onChange={(e) => handleFilterChange('showIncoming', e?.target?.checked)}
              />
              <Checkbox
                label="Show Outgoing"
                checked={localFilters?.showOutgoing}
                onChange={(e) => handleFilterChange('showOutgoing', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handleClear}
              fullWidth
            >
              Clear All
            </Button>
            <Button
              variant="default"
              onClick={handleApply}
              fullWidth
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;