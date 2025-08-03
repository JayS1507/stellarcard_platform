import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConnectionSuccess = ({ 
  walletAddress, 
  walletName, 
  balance, 
  networkStatus,
  onContinue,
  className = '' 
}) => {
  const navigate = useNavigate();

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address?.slice(0, 8)}...${address?.slice(-8)}`;
  };

  const formatBalance = (balance) => {
    if (!balance) return '0.00';
    return parseFloat(balance)?.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 7
    });
  };

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    } else {
      navigate('/dashboard-smart-contract-hub');
    }
  };

  return (
    <div className={`bg-card border border-success/20 rounded-xl p-8 text-center ${className}`}>
      {/* Success Icon */}
      <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon name="CheckCircle" size={32} className="text-success" />
      </div>
      {/* Success Message */}
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Wallet Connected Successfully!
      </h2>
      <p className="text-muted-foreground mb-8">
        Your {walletName} wallet has been connected to StellarCard platform.
      </p>
      {/* Account Information */}
      <div className="bg-muted/30 rounded-lg p-6 mb-8 space-y-4">
        {/* Wallet Address */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Wallet Address:</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-mono text-foreground">
              {formatAddress(walletAddress)}
            </span>
            <button
              onClick={() => navigator.clipboard?.writeText(walletAddress)}
              className="p-1 hover:bg-muted rounded transition-colors duration-150"
              title="Copy address"
            >
              <Icon name="Copy" size={14} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Balance */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">XLM Balance:</span>
          <span className="text-sm font-semibold text-foreground">
            {formatBalance(balance)} XLM
          </span>
        </div>

        {/* Network Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Network Status:</span>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              networkStatus === 'connected' ? 'bg-success pulse-gentle' : 'bg-warning'
            }`} />
            <span className="text-sm text-foreground capitalize">
              {networkStatus || 'Connected'}
            </span>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          onClick={() => navigate('/hero-landing-page')}
          iconName="ArrowLeft"
          iconPosition="left"
          className="flex-1"
        >
          Back to Home
        </Button>
        <Button
          variant="default"
          onClick={handleContinue}
          iconName="ArrowRight"
          iconPosition="right"
          className="flex-1"
        >
          Continue to Dashboard
        </Button>
      </div>
      {/* Additional Info */}
      <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
          <p className="text-xs text-accent-foreground text-left">
            <strong>Next Steps:</strong> You can now create cards, manage your assets, 
            and interact with Soroban smart contracts. Your wallet connection will persist 
            across browser sessions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectionSuccess;