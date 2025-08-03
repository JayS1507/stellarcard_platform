import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const WalletOption = ({ 
  wallet, 
  onConnect, 
  isConnecting, 
  connectingWallet,
  className = '' 
}) => {
  const isCurrentlyConnecting = isConnecting && connectingWallet === wallet?.id;

  return (
    <div className={`bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-200 hover-lift ${className}`}>
      <div className="flex items-start space-x-4">
        {/* Wallet Icon */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
            {wallet?.icon ? (
              <Image 
                src={wallet?.icon} 
                alt={`${wallet?.name} logo`}
                className="w-8 h-8 object-contain"
              />
            ) : (
              <Icon name="Wallet" size={24} className="text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Wallet Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-foreground">{wallet?.name}</h3>
            {wallet?.isRecommended && (
              <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-md">
                Recommended
              </span>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            {wallet?.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {wallet?.features?.map((feature, index) => (
              <div key={index} className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Icon name="Check" size={12} className="text-success" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Connection Status */}
          {wallet?.status && (
            <div className="flex items-center space-x-2 mb-4">
              <div className={`w-2 h-2 rounded-full ${
                wallet?.status === 'available' ? 'bg-success' : 
                wallet?.status === 'unavailable' ? 'bg-error' : 'bg-warning'
              }`} />
              <span className="text-xs text-muted-foreground">
                {wallet?.status === 'available' ? 'Available' : 
                 wallet?.status === 'unavailable' ? 'Not Installed' : 'Checking...'}
              </span>
            </div>
          )}

          {/* Connect Button */}
          <Button
            variant={wallet?.isRecommended ? "default" : "outline"}
            onClick={() => onConnect(wallet)}
            disabled={isConnecting || wallet?.status === 'unavailable'}
            loading={isCurrentlyConnecting}
            iconName={wallet?.status === 'unavailable' ? "ExternalLink" : "Wallet"}
            iconPosition="left"
            fullWidth
          >
            {wallet?.status === 'unavailable' ? 'Install Wallet' : 
             isCurrentlyConnecting ? 'Connecting...' : 'Connect Wallet'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WalletOption;