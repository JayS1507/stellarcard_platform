import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityInfo = ({ className = '' }) => {
  const securityFeatures = [
    {
      icon: "Shield",
      title: "Non-Custodial Security",
      description: "Your private keys remain in your wallet. We never store or access your funds."
    },
    {
      icon: "Lock",
      title: "Transaction Signing",
      description: "All transactions require your explicit approval and signature through your wallet."
    },
    {
      icon: "Eye",
      title: "Read-Only Access",
      description: "We only request permission to view your public address and account information."
    },
    {
      icon: "Zap",
      title: "Stellar Network",
      description: "Built on Stellar's secure, fast, and low-cost blockchain infrastructure."
    }
  ];

  return (
    <div className={`bg-muted/30 border border-border rounded-xl p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="ShieldCheck" size={20} className="text-success" />
        <h3 className="text-lg font-semibold text-foreground">Security & Privacy</h3>
      </div>
      <div className="space-y-4">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={feature?.icon} size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground mb-1">
                {feature?.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-accent mt-0.5" />
          <div className="flex-1">
            <p className="text-xs text-accent-foreground">
              <strong>Important:</strong> Always verify the URL is correct before connecting your wallet. 
              StellarCard will never ask for your private keys or seed phrase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityInfo;