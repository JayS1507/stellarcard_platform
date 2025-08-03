import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import WalletOption from './components/WalletOption';
import ConnectionProgress from './components/ConnectionProgress';
import SecurityInfo from './components/SecurityInfo';
import ConnectionSuccess from './components/ConnectionSuccess';
import ErrorMessage from './components/ErrorMessage';
import WalletComparison from './components/WalletComparison';

const WalletConnectionAuthentication = () => {
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectingWallet, setConnectingWallet] = useState(null);
  const [connectionStep, setConnectionStep] = useState(0);
  const [connectionError, setConnectionError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [showComparison, setShowComparison] = useState(false);

  // Mock wallet data
  const wallets = [
    {
      id: 'freighter',
      name: 'Freighter',
      description: 'The most popular Stellar wallet extension with seamless browser integration and user-friendly interface.',
      icon: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=64&h=64&fit=crop&crop=center',
      features: ['Browser Extension', 'Hardware Support', 'Multi-Account'],
      status: 'available',
      isRecommended: true,
      ratings: { security: 5, ease: 5, features: 4, mobile: 3, hardware: 5 }
    },
    {
      id: 'albedo',
      name: 'Albedo',
      description: 'Web-based wallet with advanced features for power users and developers working with Stellar network.',
      icon: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=64&h=64&fit=crop&crop=center',
      features: ['Web-Based', 'Advanced Features', 'Developer Tools'],
      status: 'available',
      isRecommended: false,
      ratings: { security: 4, ease: 3, features: 5, mobile: 4, hardware: 3 }
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      description: 'Connect your mobile wallet securely using QR code scanning for cross-device compatibility.',
      icon: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=64&h=64&fit=crop&crop=center',
      features: ['Mobile Support', 'QR Code', 'Cross-Platform'],
      status: 'available',
      isRecommended: false,
      ratings: { security: 4, ease: 4, features: 3, mobile: 5, hardware: 2 }
    },
    {
      id: 'lobstr',
      name: 'LOBSTR',
      description: 'Mobile-first wallet with built-in trading features and comprehensive asset management.',
      icon: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=64&h=64&fit=crop&crop=center',
      features: ['Mobile App', 'Built-in Trading', 'Asset Management'],
      status: 'unavailable',
      isRecommended: false,
      ratings: { security: 4, ease: 5, features: 4, mobile: 5, hardware: 2 }
    }
  ];

  const connectionSteps = [
    {
      id: 'select',
      title: 'Select Wallet',
      description: 'Choose your preferred Stellar wallet',
      action: 'Click on a wallet option above'
    },
    {
      id: 'authorize',
      title: 'Authorize Connection',
      description: 'Approve the connection request in your wallet',
      action: 'Check your wallet for a connection prompt'
    },
    {
      id: 'verify',
      title: 'Verify Account',
      description: 'Confirm your account details and network',
      action: 'Verifying account information...'
    },
    {
      id: 'complete',
      title: 'Connection Complete',
      description: 'Your wallet is now connected to StellarCard',
      action: 'Ready to use the platform'
    }
  ];

  // Check existing connection on mount
  useEffect(() => {
    const checkExistingConnection = () => {
      const walletConnected = localStorage.getItem('walletConnected') === 'true';
      const walletAddress = localStorage.getItem('walletAddress');
      const walletName = localStorage.getItem('walletName');

      if (walletConnected && walletAddress) {
        setIsConnected(true);
        setConnectedWallet({
          name: walletName || 'Unknown Wallet',
          address: walletAddress,
          balance: '1,247.5634',
          networkStatus: 'connected'
        });
        setConnectionStep(3);
      }
    };

    checkExistingConnection();
  }, []);

  const handleWalletConnect = async (wallet) => {
    if (wallet?.status === 'unavailable') {
      window.open('https://stellar.org/wallets', '_blank');
      return;
    }

    setIsConnecting(true);
    setConnectingWallet(wallet?.id);
    setConnectionError(null);
    setConnectionStep(0);

    try {
      // Step 1: Select wallet
      await new Promise(resolve => setTimeout(resolve, 800));
      setConnectionStep(1);

      // Step 2: Authorize connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random connection failure (20% chance)
      if (Math.random() < 0.2) {
        throw new Error('User rejected the connection request');
      }
      
      setConnectionStep(2);

      // Step 3: Verify account
      await new Promise(resolve => setTimeout(resolve, 1500));
      setConnectionStep(3);

      // Mock successful connection
      const mockAddress = 'GCKFBEIYTKP74Q7SMPFIIHFGPHAU6GIIKO2FBFM2BEWEVHQG4OBAAHZPF';
      const mockBalance = '1,247.5634';

      // Store connection in localStorage
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('walletAddress', mockAddress);
      localStorage.setItem('walletName', wallet?.name);

      setConnectedWallet({
        name: wallet?.name,
        address: mockAddress,
        balance: mockBalance,
        networkStatus: 'connected'
      });

      setIsConnected(true);
      setIsConnecting(false);

    } catch (error) {
      setConnectionError({
        type: 'permission',
        message: error?.message || 'Failed to connect to wallet. Please try again.'
      });
      setIsConnecting(false);
      setConnectionStep(0);
    }
  };

  const handleRetryConnection = () => {
    setConnectionError(null);
    setConnectionStep(0);
    if (connectingWallet) {
      const wallet = wallets?.find(w => w?.id === connectingWallet);
      if (wallet) {
        handleWalletConnect(wallet);
      }
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletName');
    setIsConnected(false);
    setConnectedWallet(null);
    setConnectionStep(0);
  };

  const handleBackToHome = () => {
    navigate('/hero-landing-page');
  };

  if (isConnected && connectedWallet) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Wallet Connected - StellarCard Platform</title>
          <meta name="description" content="Your Stellar wallet has been successfully connected to StellarCard platform." />
        </Helmet>
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              onClick={handleBackToHome}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Home
            </Button>
            <Button
              variant="outline"
              onClick={handleDisconnect}
              iconName="LogOut"
              iconPosition="left"
            >
              Disconnect
            </Button>
          </div>

          <ConnectionSuccess
            walletAddress={connectedWallet?.address}
            walletName={connectedWallet?.name}
            balance={connectedWallet?.balance}
            networkStatus={connectedWallet?.networkStatus}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Connect Wallet - StellarCard Platform</title>
        <meta name="description" content="Connect your Stellar wallet to access StellarCard's decentralized card platform and smart contract features." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={handleBackToHome}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Back to Home
          </Button>
          <Button
            variant="ghost"
            onClick={() => setShowComparison(!showComparison)}
            iconName="GitCompare"
            iconPosition="left"
          >
            {showComparison ? 'Hide' : 'Compare'} Wallets
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Page Header */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Connect Your Stellar Wallet
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Choose your preferred wallet to access StellarCard's decentralized platform 
                and start managing your blockchain-based cards.
              </p>
            </div>

            {/* Error Message */}
            {connectionError && (
              <ErrorMessage
                error={connectionError}
                onRetry={handleRetryConnection}
                onDismiss={() => setConnectionError(null)}
              />
            )}

            {/* Wallet Options */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Available Wallets
              </h2>
              {wallets?.map((wallet) => (
                <WalletOption
                  key={wallet?.id}
                  wallet={wallet}
                  onConnect={handleWalletConnect}
                  isConnecting={isConnecting}
                  connectingWallet={connectingWallet}
                />
              ))}
            </div>

            {/* Wallet Comparison */}
            {showComparison && (
              <WalletComparison wallets={wallets} />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Connection Progress */}
            {(isConnecting || connectionStep > 0) && (
              <ConnectionProgress
                currentStep={connectionStep}
                steps={connectionSteps}
                isConnecting={isConnecting}
              />
            )}

            {/* Security Information */}
            <SecurityInfo />

            {/* Help Section */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="HelpCircle" size={20} className="text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Need Help?</h3>
              </div>
              <div className="space-y-3">
                <Button
                  variant="ghost"
                  onClick={() => window.open('https://stellar.org/wallets', '_blank')}
                  iconName="ExternalLink"
                  iconPosition="right"
                  fullWidth
                >
                  Wallet Setup Guide
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => window.open('https://developers.stellar.org', '_blank')}
                  iconName="Book"
                  iconPosition="left"
                  fullWidth
                >
                  Stellar Documentation
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => window.open('mailto:support@stellarcard.io', '_blank')}
                  iconName="Mail"
                  iconPosition="left"
                  fullWidth
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnectionAuthentication;