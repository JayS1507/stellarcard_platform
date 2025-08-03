import React from 'react';
import Icon from '../../../components/AppIcon';

const CardPreview = ({ cardData, className = '' }) => {
  const {
    cardName = 'My Stellar Card',
    cardType = 'standard',
    backgroundColor = '#1B365D',
    textColor = '#FFFFFF',
    balance = '0',
    assetCode = 'XLM',
    cardNumber = '****-****-****-1234',
    expiryDate = '12/28',
    holderName = 'JOHN DOE'
  } = cardData;

  const getCardGradient = () => {
    switch (cardType) {
      case 'premium':
        return 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600';
      case 'business':
        return 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900';
      case 'standard':
      default:
        return 'bg-gradient-to-br from-primary via-secondary to-primary';
    }
  };

  return (
    <div className={`${className}`}>
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="CreditCard" size={20} className="mr-2" />
          Card Preview
        </h3>
        
        {/* Card Display */}
        <div className="relative">
          <div className={`w-full aspect-[1.6/1] rounded-2xl p-6 text-white shadow-lg ${getCardGradient()}`}>
            {/* Card Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-sm opacity-80">StellarCard</p>
                <p className="text-xs opacity-60">{cardType?.toUpperCase()}</p>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="Zap" size={16} />
                </div>
                <Icon name="Wifi" size={16} className="opacity-80" />
              </div>
            </div>

            {/* Balance */}
            <div className="mb-6">
              <p className="text-xs opacity-60 mb-1">Available Balance</p>
              <p className="text-2xl font-bold">{balance} {assetCode}</p>
            </div>

            {/* Card Number */}
            <div className="mb-4">
              <p className="text-lg font-mono tracking-wider">{cardNumber}</p>
            </div>

            {/* Card Footer */}
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs opacity-60 mb-1">CARD HOLDER</p>
                <p className="text-sm font-medium">{holderName}</p>
              </div>
              <div>
                <p className="text-xs opacity-60 mb-1">EXPIRES</p>
                <p className="text-sm font-medium">{expiryDate}</p>
              </div>
            </div>

            {/* Chip */}
            <div className="absolute top-20 left-6 w-12 h-9 bg-white/30 rounded-md"></div>
          </div>

          {/* Card Stats */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <p className="text-sm font-medium text-success">Active</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Network</p>
              <p className="text-sm font-medium text-foreground">Stellar</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Type</p>
              <p className="text-sm font-medium text-foreground capitalize">{cardType}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;