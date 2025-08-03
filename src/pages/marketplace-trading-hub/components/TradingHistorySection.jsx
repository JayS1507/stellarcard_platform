import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const TradingHistorySection = ({ onExportHistory, onViewTransaction }) => {
  const [timeFilter, setTimeFilter] = useState('7d');
  const [typeFilter, setTypeFilter] = useState('all');

  const tradingHistory = [
    {
      id: 'tx_001',
      type: 'buy',
      cardName: 'DeFi Yield Card Alpha',
      amount: 2.5,
      price: 125.50,
      total: 313.75,
      fee: 1.25,
      timestamp: new Date('2025-08-02T08:30:00'),
      status: 'completed',
      txHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12'
    },
    {
      id: 'tx_002',
      type: 'sell',
      cardName: 'NFT Collectible Beta',
      amount: 1.0,
      price: 89.25,
      total: 89.25,
      fee: 0.45,
      timestamp: new Date('2025-08-01T15:45:00'),
      status: 'completed',
      txHash: '0x2b3c4d5e6f7890abcdef1234567890abcdef123a'
    },
    {
      id: 'tx_003',
      type: 'liquidity_add',
      cardName: 'XLM/USDC Pool',
      amount: 500.0,
      price: 0.12,
      total: 60.0,
      fee: 0.30,
      timestamp: new Date('2025-08-01T10:20:00'),
      status: 'completed',
      txHash: '0x3c4d5e6f7890abcdef1234567890abcdef123a2b'
    },
    {
      id: 'tx_004',
      type: 'buy',
      cardName: 'Governance Token Gamma',
      amount: 10.0,
      price: 45.80,
      total: 458.0,
      fee: 2.29,
      timestamp: new Date('2025-07-31T14:15:00'),
      status: 'pending',
      txHash: '0x4d5e6f7890abcdef1234567890abcdef123a2b3c'
    },
    {
      id: 'tx_005',
      type: 'sell',
      cardName: 'Utility Card Delta',
      amount: 5.0,
      price: 78.90,
      total: 394.50,
      fee: 1.97,
      timestamp: new Date('2025-07-30T09:30:00'),
      status: 'failed',
      txHash: '0x5e6f7890abcdef1234567890abcdef123a2b3c4d'
    },
    {
      id: 'tx_006',
      type: 'liquidity_remove',
      cardName: 'XLM/BTC Pool',
      amount: 250.0,
      price: 0.000025,
      total: 0.00625,
      fee: 0.15,
      timestamp: new Date('2025-07-29T16:45:00'),
      status: 'completed',
      txHash: '0x6f7890abcdef1234567890abcdef123a2b3c4d5e'
    }
  ];

  const timeFilterOptions = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: 'all', label: 'All Time' }
  ];

  const typeFilterOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'buy', label: 'Purchases' },
    { value: 'sell', label: 'Sales' },
    { value: 'liquidity_add', label: 'Liquidity Added' },
    { value: 'liquidity_remove', label: 'Liquidity Removed' }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'buy': return 'ArrowUpCircle';
      case 'sell': return 'ArrowDownCircle';
      case 'liquidity_add': return 'Plus';
      case 'liquidity_remove': return 'Minus';
      default: return 'Activity';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'buy': return 'text-success';
      case 'sell': return 'text-error';
      case 'liquidity_add': return 'text-primary';
      case 'liquidity_remove': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'failed':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(date);
  };

  const formatTxHash = (hash) => {
    return `${hash?.slice(0, 6)}...${hash?.slice(-4)}`;
  };

  const filteredHistory = tradingHistory?.filter(tx => {
    if (typeFilter !== 'all' && tx?.type !== typeFilter) return false;
    
    const now = new Date();
    const txDate = tx?.timestamp;
    
    switch (timeFilter) {
      case '24h':
        return (now - txDate) <= 24 * 60 * 60 * 1000;
      case '7d':
        return (now - txDate) <= 7 * 24 * 60 * 60 * 1000;
      case '30d':
        return (now - txDate) <= 30 * 24 * 60 * 60 * 1000;
      case '90d':
        return (now - txDate) <= 90 * 24 * 60 * 60 * 1000;
      default:
        return true;
    }
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Trading History</h2>
          <p className="text-muted-foreground">Track your marketplace transactions</p>
        </div>
        <Button
          variant="outline"
          onClick={onExportHistory}
          iconName="Download"
          iconPosition="left"
        >
          Export CSV
        </Button>
      </div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select
          label="Time Period"
          options={timeFilterOptions}
          value={timeFilter}
          onChange={setTimeFilter}
          className="sm:w-48"
        />
        <Select
          label="Transaction Type"
          options={typeFilterOptions}
          value={typeFilter}
          onChange={setTypeFilter}
          className="sm:w-48"
        />
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground">
            {filteredHistory?.filter(tx => tx?.status === 'completed')?.length}
          </div>
          <div className="text-sm text-muted-foreground">Completed</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-success">
            {formatCurrency(filteredHistory?.filter(tx => tx?.type === 'buy' && tx?.status === 'completed')?.reduce((sum, tx) => sum + tx?.total, 0)
            )} XLM
          </div>
          <div className="text-sm text-muted-foreground">Total Bought</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-error">
            {formatCurrency(filteredHistory?.filter(tx => tx?.type === 'sell' && tx?.status === 'completed')?.reduce((sum, tx) => sum + tx?.total, 0)
            )} XLM
          </div>
          <div className="text-sm text-muted-foreground">Total Sold</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-warning">
            {formatCurrency(filteredHistory?.filter(tx => tx?.status === 'completed')?.reduce((sum, tx) => sum + tx?.fee, 0)
            )} XLM
          </div>
          <div className="text-sm text-muted-foreground">Total Fees</div>
        </div>
      </div>
      {/* Transaction List */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {filteredHistory?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Activity" size={48} className="text-muted-foreground mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No transactions found</h3>
            <p className="text-muted-foreground">Try adjusting your filter criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4 font-medium text-foreground">Type</th>
                  <th className="text-left p-4 font-medium text-foreground">Asset</th>
                  <th className="text-right p-4 font-medium text-foreground">Amount</th>
                  <th className="text-right p-4 font-medium text-foreground">Price</th>
                  <th className="text-right p-4 font-medium text-foreground">Total</th>
                  <th className="text-center p-4 font-medium text-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-foreground">Date</th>
                  <th className="text-center p-4 font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory?.map((tx) => (
                  <tr key={tx?.id} className="border-t border-border hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={getTypeIcon(tx?.type)} 
                          size={16} 
                          className={getTypeColor(tx?.type)} 
                        />
                        <span className="text-sm font-medium capitalize">
                          {tx?.type?.replace('_', ' ')}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-medium text-foreground line-clamp-1">
                        {tx?.cardName}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <span className="text-sm font-medium">{formatCurrency(tx?.amount)}</span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="text-sm">{formatCurrency(tx?.price)} XLM</span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="text-sm font-medium">{formatCurrency(tx?.total)} XLM</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 text-xs font-medium rounded-md border ${getStatusBadge(tx?.status)}`}>
                        {tx?.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground">
                        {formatDate(tx?.timestamp)}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewTransaction(tx)}
                        iconName="ExternalLink"
                      >
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradingHistorySection;