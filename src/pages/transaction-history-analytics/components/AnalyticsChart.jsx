import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

import Button from '../../../components/ui/Button';

const AnalyticsChart = () => {
  const [activeChart, setActiveChart] = useState('spending');

  const spendingData = [
    { month: 'Jan', amount: 2400, transactions: 45 },
    { month: 'Feb', amount: 1398, transactions: 32 },
    { month: 'Mar', amount: 9800, transactions: 78 },
    { month: 'Apr', amount: 3908, transactions: 56 },
    { month: 'May', amount: 4800, transactions: 67 },
    { month: 'Jun', amount: 3800, transactions: 54 },
    { month: 'Jul', amount: 4300, transactions: 61 }
  ];

  const cardUsageData = [
    { name: 'Stellar Premium', value: 45, color: '#1B365D' },
    { name: 'Stellar Basic', value: 30, color: '#2E5984' },
    { name: 'Stellar Business', value: 25, color: '#00D4FF' }
  ];

  const contractActivityData = [
    { week: 'W1', executions: 12, gas: 0.45 },
    { week: 'W2', executions: 19, gas: 0.67 },
    { week: 'W3', executions: 8, gas: 0.32 },
    { week: 'W4', executions: 15, gas: 0.54 }
  ];

  const chartTypes = [
    { id: 'spending', label: 'Spending Trends', icon: 'TrendingUp' },
    { id: 'cards', label: 'Card Usage', icon: 'CreditCard' },
    { id: 'contracts', label: 'Smart Contracts', icon: 'FileCode' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-foreground">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              <span style={{ color: entry?.color }}>●</span>
              {` ${entry?.dataKey}: ${entry?.value}${entry?.dataKey === 'amount' ? ' XLM' : ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (activeChart) {
      case 'spending':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={spendingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'cards':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={cardUsageData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {cardUsageData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'contracts':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={contractActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis 
                dataKey="week" 
                tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="executions" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  const getChartStats = () => {
    switch (activeChart) {
      case 'spending':
        return [
          { label: 'Total Spent', value: '28,408 XLM', change: '+12.5%' },
          { label: 'Avg Monthly', value: '4,058 XLM', change: '+8.2%' },
          { label: 'Transactions', value: '393', change: '+15.3%' }
        ];
      case 'cards':
        return [
          { label: 'Most Used', value: 'Premium Card', change: '45%' },
          { label: 'Total Cards', value: '3 Active', change: '+1' },
          { label: 'Usage Rate', value: '87%', change: '+5.2%' }
        ];
      case 'contracts':
        return [
          { label: 'Executions', value: '54', change: '+23.1%' },
          { label: 'Gas Used', value: '1.98 XLM', change: '-8.4%' },
          { label: 'Success Rate', value: '96.3%', change: '+2.1%' }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Analytics</h3>
        <div className="flex items-center space-x-2">
          {chartTypes?.map((type) => (
            <Button
              key={type?.id}
              variant={activeChart === type?.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveChart(type?.id)}
              iconName={type?.icon}
              iconPosition="left"
              iconSize={16}
            >
              {type?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Chart */}
      <div className="mb-6">
        {renderChart()}
      </div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {getChartStats()?.map((stat, index) => (
          <div key={index} className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat?.label}</p>
                <p className="text-lg font-semibold text-foreground">{stat?.value}</p>
              </div>
              <div className={`text-sm font-medium ${
                stat?.change?.startsWith('+') ? 'text-success' : 'text-error'
              }`}>
                {stat?.change}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsChart;