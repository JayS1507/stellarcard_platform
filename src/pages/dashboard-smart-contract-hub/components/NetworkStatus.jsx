import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const NetworkStatus = () => {
  const [networkData, setNetworkData] = useState({
    status: 'connected',
    blockHeight: 45234567,
    networkFee: 0.00001,
    tps: 1247,
    validators: 156,
    lastUpdate: new Date()
  });

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Simulate real-time network updates
    const interval = setInterval(() => {
      setNetworkData(prev => ({
        ...prev,
        blockHeight: prev?.blockHeight + Math.floor(Math.random() * 3) + 1,
        tps: Math.floor(Math.random() * 500) + 800,
        networkFee: (Math.random() * 0.00005 + 0.00001)?.toFixed(6),
        lastUpdate: new Date()
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (networkData?.status) {
      case 'connected':
        return 'text-success bg-success/10';
      case 'slow':
        return 'text-warning bg-warning/10';
      case 'disconnected':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const getStatusText = () => {
    switch (networkData?.status) {
      case 'connected':
        return 'Stellar Network Online';
      case 'slow':
        return 'Network Congested';
      case 'disconnected':
        return 'Network Offline';
      default:
        return 'Unknown Status';
    }
  };

  const formatNumber = (num) => {
    return num?.toLocaleString();
  };

  const formatTimestamp = (timestamp) => {
    return timestamp?.toLocaleTimeString();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Network Status</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-md hover:bg-muted transition-colors duration-150"
        >
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="text-muted-foreground" 
          />
        </button>
      </div>
      {/* Status Overview */}
      <div className="flex items-center space-x-3 mb-4">
        <div className={`w-3 h-3 rounded-full ${
          networkData?.status === 'connected' ? 'bg-success pulse-gentle' : 
          networkData?.status === 'slow' ? 'bg-warning' : 'bg-error'
        }`} />
        <span className="font-medium text-foreground">{getStatusText()}</span>
        <span className="text-sm text-muted-foreground">
          Updated {formatTimestamp(networkData?.lastUpdate)}
        </span>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Block Height</p>
          <p className="text-lg font-bold text-foreground">{formatNumber(networkData?.blockHeight)}</p>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Network Fee</p>
          <p className="text-lg font-bold text-foreground">{networkData?.networkFee} XLM</p>
        </div>
      </div>
      {/* Expanded Details */}
      {isExpanded && (
        <div className="space-y-4 pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Transactions/sec</span>
                <span className="text-sm font-medium text-foreground">{formatNumber(networkData?.tps)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Validators</span>
                <span className="text-sm font-medium text-foreground">{networkData?.validators}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Network Version</span>
                <span className="text-sm font-medium text-foreground">v20.0.0</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Consensus</span>
                <span className="text-sm font-medium text-foreground">Stellar Consensus Protocol</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg Block Time</span>
                <span className="text-sm font-medium text-foreground">5.2s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Network Load</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-success rounded-full" />
                  </div>
                  <span className="text-sm font-medium text-foreground">75%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Network Health Indicators */}
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-success/10 rounded-lg">
              <Icon name="CheckCircle" size={20} className="text-success mx-auto mb-1" />
              <p className="text-xs text-success font-medium">Healthy</p>
            </div>
            <div className="text-center p-3 bg-success/10 rounded-lg">
              <Icon name="Zap" size={20} className="text-success mx-auto mb-1" />
              <p className="text-xs text-success font-medium">Fast</p>
            </div>
            <div className="text-center p-3 bg-success/10 rounded-lg">
              <Icon name="Shield" size={20} className="text-success mx-auto mb-1" />
              <p className="text-xs text-success font-medium">Secure</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkStatus;