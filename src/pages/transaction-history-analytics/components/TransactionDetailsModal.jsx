import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionDetailsModal = ({ isOpen, onClose, transaction }) => {
  if (!isOpen || !transaction) return null;

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
        return 'text-success bg-success/10 border-success/20';
      case 'pending':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'failed':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const formatAmount = (amount, direction) => {
    const prefix = direction === 'incoming' ? '+' : '-';
    return `${prefix}${amount} XLM`;
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const detailSections = [
    {
      title: 'Transaction Details',
      items: [
        { label: 'Transaction ID', value: transaction?.hash, copyable: true },
        { label: 'Type', value: transaction?.type?.replace('_', ' ')?.toUpperCase() },
        { label: 'Description', value: transaction?.description },
        { label: 'Amount', value: formatAmount(transaction?.amount, transaction?.direction) },
        { label: 'Direction', value: transaction?.direction?.charAt(0)?.toUpperCase() + transaction?.direction?.slice(1) },
        { label: 'Status', value: transaction?.status?.charAt(0)?.toUpperCase() + transaction?.status?.slice(1) }
      ]
    },
    {
      title: 'Network Information',
      items: [
        { label: 'Network', value: 'Stellar Mainnet' },
        { label: 'Block Height', value: '45,892,341' },
        { label: 'Confirmations', value: '1,247' },
        { label: 'Network Fee', value: '0.00001 XLM' },
        { label: 'Gas Used', value: transaction?.type === 'smart_contract' ? '21,000' : 'N/A' }
      ]
    },
    {
      title: 'Counterparty Details',
      items: [
        { label: 'Name/Address', value: transaction?.counterparty, copyable: true },
        { label: 'Account Type', value: 'Verified Account' },
        { label: 'Trust Level', value: 'High' }
      ]
    }
  ];

  if (transaction?.cardName) {
    detailSections?.push({
      title: 'Card Information',
      items: [
        { label: 'Card Name', value: transaction?.cardName },
        { label: 'Card Type', value: 'Premium' },
        { label: 'Last 4 Digits', value: '****1234' }
      ]
    });
  }

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    // You could add a toast notification here
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-1200" onClick={onClose} />
      {/* Modal */}
      <div className="fixed inset-0 z-1300 flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={getTransactionIcon(transaction?.type)} size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Transaction Details</h3>
                <p className="text-sm text-muted-foreground">{formatDate(transaction?.timestamp)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(transaction?.status)}`}>
                {transaction?.status?.charAt(0)?.toUpperCase() + transaction?.status?.slice(1)}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                iconName="X"
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <div className="space-y-6">
              {detailSections?.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-4">
                  <h4 className="text-sm font-semibold text-foreground border-b border-border pb-2">
                    {section?.title}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section?.items?.map((item, itemIndex) => (
                      <div key={itemIndex} className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          {item?.label}
                        </p>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm text-foreground font-mono break-all">
                            {item?.value}
                          </p>
                          {item?.copyable && (
                            <Button
                              variant="ghost"
                              size="xs"
                              onClick={() => handleCopy(item?.value)}
                              iconName="Copy"
                              iconSize={14}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Additional Actions */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h4>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`https://stellar.expert/explorer/public/tx/${transaction?.hash}`, '_blank')}
                    iconName="ExternalLink"
                    iconPosition="left"
                  >
                    View on Explorer
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(transaction?.hash)}
                    iconName="Copy"
                    iconPosition="left"
                  >
                    Copy Hash
                  </Button>
                  {transaction?.status === 'confirmed' && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="AlertCircle"
                      iconPosition="left"
                    >
                      Report Issue
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant="default"
              onClick={() => window.print()}
              iconName="Printer"
              iconPosition="left"
            >
              Print Details
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionDetailsModal;