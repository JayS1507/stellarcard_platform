import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionCard = ({ transaction, onViewDetails }) => {
  const getTransactionIcon = (type) => {
    switch (type) {
      case 'card_payment':
        return 'CreditCard';
      case 'smart_contract':
        return 'FileCode';
      case 'transfer':
        return 'ArrowUpDown';
      case 'stake':
        return 'TrendingUp';
      case 'reward':
        return 'Gift';
      default:
        return 'Activity';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'failed':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getAmountColor = (type) => {
    return type === 'incoming' ? 'text-success' : 'text-foreground';
  };

  const formatAmount = (amount, type) => {
    const prefix = type === 'incoming' ? '+' : '-';
    return `${prefix}${amount} XLM`;
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-card transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name={getTransactionIcon(transaction?.type)} size={20} className="text-primary" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-medium text-foreground truncate">
                {transaction?.description}
              </h3>
              <span className={`text-sm font-medium ${getAmountColor(transaction?.direction)}`}>
                {formatAmount(transaction?.amount, transaction?.direction)}
              </span>
            </div>
            
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs text-muted-foreground">
                {transaction?.counterparty}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                {formatDate(transaction?.timestamp)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction?.status)}`}>
                  {transaction?.status}
                </span>
                {transaction?.cardName && (
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {transaction?.cardName}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => window.open(`https://stellar.expert/explorer/public/tx/${transaction?.hash}`, '_blank')}
                  iconName="ExternalLink"
                  iconSize={14}
                >
                  Explorer
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => onViewDetails(transaction)}
                  iconName="Eye"
                  iconSize={14}
                >
                  Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;