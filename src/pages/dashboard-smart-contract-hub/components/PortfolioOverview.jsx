import React from 'react';
import Icon from '../../../components/AppIcon';

const PortfolioOverview = ({ portfolioData }) => {
  const formatCurrency = (amount, currency = 'XLM') => {
    return `${amount?.toLocaleString()} ${currency}`;
  };

  const formatPercentage = (value) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value?.toFixed(2)}%`;
  };

  const getPercentageColor = (value) => {
    if (value > 0) return 'text-success';
    if (value < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Balance Card */}
      <div className="bg-card border border-border rounded-lg p-6 hover-lift">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Wallet" size={16} className="text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Total Balance</span>
          </div>
          <Icon name="TrendingUp" size={16} className="text-success" />
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold text-foreground">
            {formatCurrency(portfolioData?.totalBalance)}
          </p>
          <p className={`text-sm ${getPercentageColor(portfolioData?.balanceChange)}`}>
            {formatPercentage(portfolioData?.balanceChange)} from last month
          </p>
        </div>
      </div>
      {/* Active Cards */}
      <div className="bg-card border border-border rounded-lg p-6 hover-lift">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="CreditCard" size={16} className="text-secondary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Active Cards</span>
          </div>
          <Icon name="Plus" size={16} className="text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold text-foreground">{portfolioData?.activeCards}</p>
          <p className="text-sm text-muted-foreground">
            {portfolioData?.newCardsThisMonth} new this month
          </p>
        </div>
      </div>
      {/* Smart Contracts */}
      <div className="bg-card border border-border rounded-lg p-6 hover-lift">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Code" size={16} className="text-accent" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Smart Contracts</span>
          </div>
          <Icon name="Activity" size={16} className="text-accent" />
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold text-foreground">{portfolioData?.activeContracts}</p>
          <p className="text-sm text-muted-foreground">
            {portfolioData?.contractExecutions} executions today
          </p>
        </div>
      </div>
      {/* Recent Transactions */}
      <div className="bg-card border border-border rounded-lg p-6 hover-lift">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="ArrowUpDown" size={16} className="text-warning" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Transactions</span>
          </div>
          <Icon name="Clock" size={16} className="text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold text-foreground">{portfolioData?.recentTransactions}</p>
          <p className="text-sm text-muted-foreground">Last 24 hours</p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioOverview;