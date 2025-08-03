import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const WalletComparison = ({ wallets, className = '' }) => {
  const comparisonFeatures = [
    { key: 'security', label: 'Security Level', icon: 'Shield' },
    { key: 'ease', label: 'Ease of Use', icon: 'Smile' },
    { key: 'features', label: 'Features', icon: 'Star' },
    { key: 'mobile', label: 'Mobile Support', icon: 'Smartphone' },
    { key: 'hardware', label: 'Hardware Support', icon: 'HardDrive' }
  ];

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={12}
        className={index < rating ? 'text-warning fill-current' : 'text-muted'}
      />
    ));
  };

  return (
    <div className={`bg-card border border-border rounded-xl p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="GitCompare" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Wallet Comparison</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                Feature
              </th>
              {wallets?.slice(0, 3)?.map((wallet) => (
                <th key={wallet?.id} className="text-center py-3 px-2 min-w-24">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                      {wallet?.icon ? (
                        <Image 
                          src={wallet?.icon} 
                          alt={`${wallet?.name} logo`}
                          className="w-6 h-6 object-contain"
                        />
                      ) : (
                        <Icon name="Wallet" size={16} className="text-muted-foreground" />
                      )}
                    </div>
                    <span className="text-xs font-medium text-foreground">
                      {wallet?.name}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonFeatures?.map((feature) => (
              <tr key={feature?.key} className="border-b border-border/50">
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-2">
                    <Icon name={feature?.icon} size={14} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{feature?.label}</span>
                  </div>
                </td>
                {wallets?.slice(0, 3)?.map((wallet) => (
                  <td key={wallet?.id} className="py-4 px-2 text-center">
                    <div className="flex justify-center space-x-0.5">
                      {getRatingStars(wallet?.ratings?.[feature?.key] || 4)}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Recommendation */}
      <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-accent-foreground mb-1">
              Our Recommendation
            </h4>
            <p className="text-xs text-accent-foreground">
              For beginners, we recommend Freighter for its ease of use and strong security. 
              Advanced users might prefer Albedo for additional features and customization options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletComparison;