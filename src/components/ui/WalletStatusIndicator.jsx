import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const WalletStatusIndicator = ({ className = '' }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [networkStatus, setNetworkStatus] = useState('connected');
  const [networkName, setNetworkName] = useState('Stellar Mainnet');

  useEffect(() => {
    const checkWalletStatus = () => {
      const connected = localStorage.getItem('walletConnected') === 'true';
      const address = localStorage.getItem('walletAddress') || '';
      setIsConnected(connected);
      setWalletAddress(address);
    };

    checkWalletStatus();
    window.addEventListener('storage', checkWalletStatus);

    // Simulate network status monitoring
    const networkInterval = setInterval(() => {
      const statuses = ['connected', 'slow', 'disconnected'];
      const randomStatus = statuses?.[Math.floor(Math.random() * statuses?.length)];
      setNetworkStatus(randomStatus);
    }, 30000);

    return () => {
      window.removeEventListener('storage', checkWalletStatus);
      clearInterval(networkInterval);
    };
  }, []);

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  const getStatusColor = () => {
    switch (networkStatus) {
      case 'connected':
        return 'bg-success';
      case 'slow':
        return 'bg-warning';
      case 'disconnected':
        return 'bg-error';
      default:
        return 'bg-muted';
    }
  };

  const getStatusText = () => {
    switch (networkStatus) {
      case 'connected':
        return 'Connected';
      case 'slow':
        return 'Slow Network';
      case 'disconnected':
        return 'Disconnected';
      default:
        return 'Unknown';
    }
  };

  if (!isConnected) {
    return null;
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Network Status */}
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${getStatusColor()} ${
          networkStatus === 'connected' ? 'pulse-gentle' : ''
        }`} />
        <span className="text-xs text-muted-foreground hidden sm:inline">
          {networkName}
        </span>
      </div>

      {/* Wallet Address */}
      <div className="flex items-center space-x-2 px-2 py-1 bg-muted rounded-md">
        <Icon name="Wallet" size={14} className="text-muted-foreground" />
        <span className="text-xs font-mono text-foreground">
          {formatAddress(walletAddress)}
        </span>
      </div>

      {/* Status Tooltip on Hover */}
      <div className="relative group">
        <Icon 
          name="Info" 
          size={14} 
          className="text-muted-foreground cursor-help" 
        />
        <div className="absolute right-0 top-6 bg-popover border border-border rounded-lg p-3 shadow-modal opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-1100 min-w-48">
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className="text-foreground">{getStatusText()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Network:</span>
              <span className="text-foreground">{networkName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Address:</span>
              <span className="text-foreground font-mono">{formatAddress(walletAddress)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletStatusIndicator;