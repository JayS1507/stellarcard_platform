import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onActionClick }) => {
  const quickActions = [
    {
      id: 'create-card',
      title: 'Create New Card',
      description: 'Issue a new blockchain card with custom parameters',
      icon: 'CreditCard',
      color: 'bg-primary/10 text-primary',
      route: '/card-creation-management',
      action: () => onActionClick('create-card')
    },
    {
      id: 'transfer-assets',
      title: 'Transfer Assets',
      description: 'Send XLM or other assets to another wallet',
      icon: 'Send',
      color: 'bg-secondary/10 text-secondary',
      action: () => onActionClick('transfer-assets')
    },
    {
      id: 'deploy-contract',
      title: 'Deploy Contract',
      description: 'Deploy a new Soroban smart contract',
      icon: 'Code',
      color: 'bg-accent/10 text-accent',
      action: () => onActionClick('deploy-contract')
    },
    {
      id: 'view-marketplace',
      title: 'Browse Marketplace',
      description: 'Explore and trade cards in the marketplace',
      icon: 'Store',
      color: 'bg-success/10 text-success',
      route: '/marketplace-trading-hub',
      action: () => onActionClick('view-marketplace')
    },
    {
      id: 'stake-rewards',
      title: 'Stake & Earn',
      description: 'Stake your cards to earn rewards',
      icon: 'TrendingUp',
      color: 'bg-warning/10 text-warning',
      action: () => onActionClick('stake-rewards')
    },
    {
      id: 'view-history',
      title: 'Transaction History',
      description: 'View your complete transaction history',
      icon: 'History',
      color: 'bg-error/10 text-error',
      route: '/transaction-history-analytics',
      action: () => onActionClick('view-history')
    }
  ];

  const handleActionClick = (action) => {
    if (action?.route) {
      // Navigation will be handled by Link component
      return;
    }
    action?.action();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <Icon name="Zap" size={20} className="text-muted-foreground" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions?.map((action) => {
          const ActionWrapper = action?.route ? Link : 'div';
          const wrapperProps = action?.route ? { to: action?.route } : {};

          return (
            <ActionWrapper key={action?.id} {...wrapperProps}>
              <div
                className="p-4 border border-border rounded-lg hover:border-primary/50 hover-lift cursor-pointer transition-all duration-150 group"
                onClick={() => handleActionClick(action)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action?.color}`}>
                    <Icon name={action?.icon} size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-150">
                      {action?.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {action?.description}
                    </p>
                  </div>
                  <Icon 
                    name="ArrowRight" 
                    size={16} 
                    className="text-muted-foreground group-hover:text-primary transition-colors duration-150" 
                  />
                </div>
              </div>
            </ActionWrapper>
          );
        })}
      </div>
      {/* Featured Action */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-foreground mb-1">New to StellarCard?</h4>
            <p className="text-sm text-muted-foreground">
              Create your first blockchain card and start exploring the decentralized ecosystem
            </p>
          </div>
          <Link to="/card-creation-management">
            <Button variant="default" iconName="Plus" iconPosition="left">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;