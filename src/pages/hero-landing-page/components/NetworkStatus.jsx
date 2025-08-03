import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const NetworkStatus = () => {
  const [networkData, setNetworkData] = useState({
    status: 'operational',
    latency: 0.8,
    transactions: 1247,
    validators: 156,
    lastUpdate: new Date()
  });

  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const updateNetworkData = () => {
      setNetworkData(prev => ({
        ...prev,
        latency: (Math.random() * 2 + 0.5)?.toFixed(1),
        transactions: prev?.transactions + Math.floor(Math.random() * 10),
        validators: 156 + Math.floor(Math.random() * 5),
        lastUpdate: new Date()
      }));
    };

    const interval = setInterval(updateNetworkData, 3000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (networkData?.status) {
      case 'operational':
        return 'text-success';
      case 'degraded':
        return 'text-warning';
      case 'down':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = () => {
    switch (networkData?.status) {
      case 'operational':
        return 'CheckCircle';
      case 'degraded':
        return 'AlertTriangle';
      case 'down':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-success/10 text-success rounded-full text-sm font-medium mb-4">
            <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></div>
            Live Network Status
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Stellar Network Health
          </h2>
          <p className="text-muted-foreground">
            Real-time monitoring of the Stellar blockchain network performance and reliability.
          </p>
        </div>

        {/* Status Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Network Status */}
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <Icon 
                name={getStatusIcon()} 
                size={32} 
                className={`${getStatusColor()}`} 
              />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Network Status</h3>
            <p className={`text-sm font-medium capitalize ${getStatusColor()}`}>
              {networkData?.status}
            </p>
          </div>

          {/* Latency */}
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <Icon name="Zap" size={32} className="text-accent" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Avg. Latency</h3>
            <p className="text-sm font-medium text-accent">
              {networkData?.latency}s
            </p>
          </div>

          {/* Transactions */}
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <Icon name="Activity" size={32} className="text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Transactions/min</h3>
            <p className="text-sm font-medium text-primary">
              {networkData?.transactions?.toLocaleString()}
            </p>
          </div>

          {/* Validators */}
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <Icon name="Shield" size={32} className="text-secondary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Active Validators</h3>
            <p className="text-sm font-medium text-secondary">
              {networkData?.validators}
            </p>
          </div>
        </div>

        {/* Detailed Status */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Network Details</h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-success animate-pulse' : 'bg-muted'}`}></div>
              <span>Last updated: {networkData?.lastUpdate?.toLocaleTimeString()}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Performance Metrics */}
            <div>
              <h4 className="font-medium text-foreground mb-4">Performance Metrics</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Transaction Throughput</span>
                  <span className="text-sm font-medium text-foreground">~1,000 TPS</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Block Time</span>
                  <span className="text-sm font-medium text-foreground">5 seconds</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Network Fee</span>
                  <span className="text-sm font-medium text-foreground">0.00001 XLM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Uptime (30d)</span>
                  <span className="text-sm font-medium text-success">99.98%</span>
                </div>
              </div>
            </div>

            {/* Network Health */}
            <div>
              <h4 className="font-medium text-foreground mb-4">Network Health</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Consensus</span>
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span className="text-sm font-medium text-success">Healthy</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">API Services</span>
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span className="text-sm font-medium text-success">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Horizon</span>
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span className="text-sm font-medium text-success">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Soroban RPC</span>
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span className="text-sm font-medium text-success">Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetworkStatus;