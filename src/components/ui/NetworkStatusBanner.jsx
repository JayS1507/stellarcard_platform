import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NetworkStatusBanner = () => {
  const [networkStatus, setNetworkStatus] = useState('connected');
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [bannerType, setBannerType] = useState('info');

  useEffect(() => {
    // Simulate network status monitoring
    const checkNetworkStatus = () => {
      const statuses = ['connected', 'slow', 'maintenance', 'error'];
      const weights = [0.7, 0.15, 0.1, 0.05]; // Probability weights
      
      let random = Math.random();
      let selectedStatus = 'connected';
      
      for (let i = 0; i < statuses?.length; i++) {
        if (random < weights?.[i]) {
          selectedStatus = statuses?.[i];
          break;
        }
        random -= weights?.[i];
      }

      setNetworkStatus(selectedStatus);
      updateBannerContent(selectedStatus);
    };

    const updateBannerContent = (status) => {
      switch (status) {
        case 'slow': setMessage('Network experiencing slower than usual response times. Transactions may take longer to process.');
          setBannerType('warning');
          setIsVisible(true);
          break;
        case 'maintenance': setMessage('Scheduled maintenance in progress. Some features may be temporarily unavailable.');
          setBannerType('info');
          setIsVisible(true);
          break;
        case 'error': setMessage('Network connectivity issues detected. Please check your connection and try again.');
          setBannerType('error');
          setIsVisible(true);
          break;
        case 'connected':
        default:
          setIsVisible(false);
          break;
      }
    };

    checkNetworkStatus();
    const interval = setInterval(checkNetworkStatus, 45000);

    return () => clearInterval(interval);
  }, []);

  const getBannerStyles = () => {
    switch (bannerType) {
      case 'warning':
        return 'bg-warning/10 border-warning/20 text-warning-foreground';
      case 'error':
        return 'bg-error/10 border-error/20 text-error-foreground';
      case 'info':
      default:
        return 'bg-accent/10 border-accent/20 text-accent-foreground';
    }
  };

  const getIcon = () => {
    switch (bannerType) {
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'AlertCircle';
      case 'info':
      default:
        return 'Info';
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const handleRefresh = () => {
    window.location?.reload();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`fixed top-16 left-0 right-0 z-900 border-b ${getBannerStyles()}`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-3">
            <Icon name={getIcon()} size={20} />
            <div className="flex-1">
              <p className="text-sm font-medium">{message}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            {bannerType === 'error' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                iconName="RefreshCw"
                iconPosition="left"
              >
                Retry
              </Button>
            )}
            <button
              onClick={handleDismiss}
              className="p-1 rounded-md hover:bg-black/10 transition-colors duration-150"
              aria-label="Dismiss notification"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkStatusBanner;