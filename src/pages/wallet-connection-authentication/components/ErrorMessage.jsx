import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ErrorMessage = ({ 
  error, 
  onRetry, 
  onDismiss,
  showTroubleshooting = true,
  className = '' 
}) => {
  const getErrorIcon = () => {
    switch (error?.type) {
      case 'connection':
        return 'WifiOff';
      case 'permission':
        return 'ShieldAlert';
      case 'network':
        return 'AlertTriangle';
      case 'timeout':
        return 'Clock';
      default:
        return 'AlertCircle';
    }
  };

  const getErrorTitle = () => {
    switch (error?.type) {
      case 'connection':
        return 'Connection Failed';
      case 'permission':
        return 'Permission Denied';
      case 'network':
        return 'Network Error';
      case 'timeout':
        return 'Connection Timeout';
      default:
        return 'Connection Error';
    }
  };

  const getTroubleshootingSteps = () => {
    switch (error?.type) {
      case 'connection':
        return [
          'Check if your wallet extension is installed and enabled',
          'Refresh the page and try again',
          'Make sure your wallet is unlocked'
        ];
      case 'permission':
        return [
          'Click "Connect" when prompted by your wallet',
          'Make sure you approve the connection request',
          'Check if the website is trusted in your wallet settings'
        ];
      case 'network':
        return [
          'Check your internet connection',
          'Try switching to a different network',
          'Wait a moment and retry the connection'
        ];
      case 'timeout':
        return [
          'The connection request timed out',
          'Make sure your wallet is responsive',
          'Try connecting again with a faster response'
        ];
      default:
        return [
          'Refresh the page and try again',
          'Make sure your wallet is installed and unlocked',
          'Contact support if the problem persists'
        ];
    }
  };

  if (!error) return null;

  return (
    <div className={`bg-error/5 border border-error/20 rounded-xl p-6 ${className}`}>
      {/* Error Header */}
      <div className="flex items-start space-x-3 mb-4">
        <div className="flex-shrink-0 w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
          <Icon name={getErrorIcon()} size={20} className="text-error" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-error mb-1">
            {getErrorTitle()}
          </h3>
          <p className="text-sm text-error/80">
            {error?.message || 'An unexpected error occurred while connecting to your wallet.'}
          </p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 p-1 hover:bg-error/10 rounded transition-colors duration-150"
            aria-label="Dismiss error"
          >
            <Icon name="X" size={16} className="text-error" />
          </button>
        )}
      </div>
      {/* Troubleshooting Steps */}
      {showTroubleshooting && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3">
            Troubleshooting Steps:
          </h4>
          <ul className="space-y-2">
            {getTroubleshootingSteps()?.map((step, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                <span className="flex-shrink-0 w-5 h-5 bg-muted rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {onRetry && (
          <Button
            variant="outline"
            onClick={onRetry}
            iconName="RefreshCw"
            iconPosition="left"
            className="flex-1"
          >
            Try Again
          </Button>
        )}
        <Button
          variant="ghost"
          onClick={() => window.open('https://stellar.org/wallets', '_blank')}
          iconName="ExternalLink"
          iconPosition="right"
          className="flex-1"
        >
          Get Help
        </Button>
      </div>
      {/* Additional Support */}
      <div className="mt-4 pt-4 border-t border-error/10">
        <p className="text-xs text-muted-foreground text-center">
          Still having trouble? Contact our support team at{' '}
          <a 
            href="mailto:support@stellarcard.io" 
            className="text-primary hover:underline"
          >
            support@stellarcard.io
          </a>
        </p>
      </div>
    </div>
  );
};

export default ErrorMessage;