import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LiquidityPoolsSection = ({ onJoinPool, onCalculateImpermanentLoss }) => {
  const [selectedPool, setSelectedPool] = useState(null);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [calculatorValues, setCalculatorValues] = useState({
    amount: '',
    token1: '',
    token2: ''
  });

  const liquidityPools = [
    {
      id: 'xlm-usdc',
      name: 'XLM/USDC',
      token1: { symbol: 'XLM', name: 'Stellar Lumens' },
      token2: { symbol: 'USDC', name: 'USD Coin' },
      apy: 12.5,
      tvl: 2450000,
      volume24h: 125000,
      fees24h: 1250,
      myLiquidity: 0,
      poolShare: 0,
      risk: 'Low'
    },
    {
      id: 'xlm-btc',
      name: 'XLM/BTC',
      token1: { symbol: 'XLM', name: 'Stellar Lumens' },
      token2: { symbol: 'BTC', name: 'Bitcoin' },
      apy: 18.7,
      tvl: 1850000,
      volume24h: 95000,
      fees24h: 950,
      myLiquidity: 1250,
      poolShare: 0.067,
      risk: 'Medium'
    },
    {
      id: 'usdc-eth',
      name: 'USDC/ETH',
      token1: { symbol: 'USDC', name: 'USD Coin' },
      token2: { symbol: 'ETH', name: 'Ethereum' },
      apy: 15.3,
      tvl: 3200000,
      volume24h: 180000,
      fees24h: 1800,
      myLiquidity: 0,
      poolShare: 0,
      risk: 'Medium'
    },
    {
      id: 'xlm-yxlm',
      name: 'XLM/yXLM',
      token1: { symbol: 'XLM', name: 'Stellar Lumens' },
      token2: { symbol: 'yXLM', name: 'Yield XLM' },
      apy: 25.8,
      tvl: 890000,
      volume24h: 45000,
      fees24h: 450,
      myLiquidity: 0,
      poolShare: 0,
      risk: 'High'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000)?.toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000)?.toFixed(1)}K`;
    }
    return num?.toString();
  };

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const handleCalculatorSubmit = (e) => {
    e?.preventDefault();
    onCalculateImpermanentLoss(calculatorValues);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Liquidity Pools</h2>
          <p className="text-muted-foreground">Provide liquidity and earn trading fees</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setCalculatorOpen(!calculatorOpen)}
          iconName="Calculator"
          iconPosition="left"
        >
          IL Calculator
        </Button>
      </div>
      {/* Impermanent Loss Calculator */}
      {calculatorOpen && (
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-4">Impermanent Loss Calculator</h3>
          <form onSubmit={handleCalculatorSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Amount"
              type="number"
              placeholder="Enter amount"
              value={calculatorValues?.amount}
              onChange={(e) => setCalculatorValues(prev => ({ ...prev, amount: e?.target?.value }))}
            />
            <Input
              label="Token 1 Price Change (%)"
              type="number"
              placeholder="e.g., 50"
              value={calculatorValues?.token1}
              onChange={(e) => setCalculatorValues(prev => ({ ...prev, token1: e?.target?.value }))}
            />
            <Input
              label="Token 2 Price Change (%)"
              type="number"
              placeholder="e.g., -20"
              value={calculatorValues?.token2}
              onChange={(e) => setCalculatorValues(prev => ({ ...prev, token2: e?.target?.value }))}
            />
            <div className="md:col-span-3">
              <Button type="submit" iconName="Calculator" iconPosition="left">
                Calculate IL
              </Button>
            </div>
          </form>
        </div>
      )}
      {/* Pools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {liquidityPools?.map((pool) => (
          <div
            key={pool?.id}
            className="bg-card border border-border rounded-lg p-6 hover-lift transition-all duration-200"
          >
            {/* Pool Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-foreground">
                      {pool?.token1?.symbol?.charAt(0)}
                    </span>
                  </div>
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center -ml-2">
                    <span className="text-xs font-bold text-secondary-foreground">
                      {pool?.token2?.symbol?.charAt(0)}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{pool?.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {pool?.token1?.name} / {pool?.token2?.name}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-success">{pool?.apy}%</div>
                <div className="text-xs text-muted-foreground">APY</div>
              </div>
            </div>

            {/* Pool Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">TVL:</span>
                  <span className="text-sm font-medium">{formatCurrency(pool?.tvl)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">24h Volume:</span>
                  <span className="text-sm font-medium">{formatCurrency(pool?.volume24h)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">24h Fees:</span>
                  <span className="text-sm font-medium">{formatCurrency(pool?.fees24h)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">My Liquidity:</span>
                  <span className="text-sm font-medium">{formatCurrency(pool?.myLiquidity)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Pool Share:</span>
                  <span className="text-sm font-medium">{pool?.poolShare}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Risk:</span>
                  <span className={`text-sm font-medium ${getRiskColor(pool?.risk)}`}>
                    {pool?.risk}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              {pool?.myLiquidity > 0 ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onJoinPool(pool, 'add')}
                    iconName="Plus"
                    iconPosition="left"
                    fullWidth
                  >
                    Add
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onJoinPool(pool, 'remove')}
                    iconName="Minus"
                    iconPosition="left"
                    fullWidth
                  >
                    Remove
                  </Button>
                </>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onJoinPool(pool, 'join')}
                  iconName="Plus"
                  iconPosition="left"
                  fullWidth
                >
                  Join Pool
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Pool Statistics Summary */}
      <div className="bg-muted rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-3">Your Liquidity Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(liquidityPools?.reduce((sum, pool) => sum + pool?.myLiquidity, 0))}
            </div>
            <div className="text-sm text-muted-foreground">Total Liquidity</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {liquidityPools?.filter(pool => pool?.myLiquidity > 0)?.length}
            </div>
            <div className="text-sm text-muted-foreground">Active Pools</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(liquidityPools?.reduce((sum, pool) => sum + (pool?.myLiquidity * pool?.apy / 100), 0))}
            </div>
            <div className="text-sm text-muted-foreground">Est. Annual Rewards</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidityPoolsSection;