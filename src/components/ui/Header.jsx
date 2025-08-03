import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [networkStatus, setNetworkStatus] = useState('connected');
  const location = useLocation();

  useEffect(() => {
    const checkWalletConnection = () => {
      const connected = localStorage.getItem('walletConnected') === 'true';
      const address = localStorage.getItem('walletAddress') || '';
      setIsWalletConnected(connected);
      setWalletAddress(address);
    };

    checkWalletConnection();
    window.addEventListener('storage', checkWalletConnection);
    return () => window.removeEventListener('storage', checkWalletConnection);
  }, []);

  const handleWalletConnect = () => {
    if (isWalletConnected) {
      localStorage.removeItem('walletConnected');
      localStorage.removeItem('walletAddress');
      setIsWalletConnected(false);
      setWalletAddress('');
    } else {
      window.location.href = '/wallet-connection-authentication';
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const publicNavItems = [
    { label: 'Home', path: '/hero-landing-page', icon: 'Home' }
  ];

  const authenticatedNavItems = [
    { label: 'Dashboard', path: '/dashboard-smart-contract-hub', icon: 'LayoutDashboard' },
    { label: 'Cards', path: '/card-creation-management', icon: 'CreditCard' },
    { label: 'Marketplace', path: '/marketplace-trading-hub', icon: 'Store' },
    { label: 'History', path: '/transaction-history-analytics', icon: 'History' }
  ];

  const navItems = isWalletConnected ? authenticatedNavItems : publicNavItems;

  const formatWalletAddress = (address) => {
    if (!address) return '';
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-1000">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <Link to="/hero-landing-page" className="flex items-center mr-8" onClick={closeMenu}>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} color="white" />
              </div>
              <span className="text-xl font-bold text-foreground">StellarCard</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 flex-1">
            {navItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 hover:bg-muted ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>

          {/* Wallet Status & Connection */}
          <div className="hidden lg:flex items-center space-x-4">
            {isWalletConnected && (
              <div className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  networkStatus === 'connected' ? 'bg-success pulse-gentle' : 'bg-warning'
                }`} />
                <span className="text-sm font-mono text-muted-foreground">
                  {formatWalletAddress(walletAddress)}
                </span>
              </div>
            )}
            <Button
              variant={isWalletConnected ? "outline" : "default"}
              onClick={handleWalletConnect}
              iconName={isWalletConnected ? "LogOut" : "Wallet"}
              iconPosition="left"
            >
              {isWalletConnected ? 'Disconnect' : 'Connect Wallet'}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-150"
            aria-label="Toggle menu"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border">
            <nav className="px-4 py-4 space-y-2">
              {navItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMenu}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    isActivePath(item?.path)
                      ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </Link>
              ))}
              
              {/* Mobile Wallet Section */}
              <div className="pt-4 mt-4 border-t border-border">
                {isWalletConnected && (
                  <div className="flex items-center space-x-3 px-3 py-2 mb-3 bg-muted rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      networkStatus === 'connected' ? 'bg-success pulse-gentle' : 'bg-warning'
                    }`} />
                    <span className="text-sm font-mono text-muted-foreground">
                      {formatWalletAddress(walletAddress)}
                    </span>
                  </div>
                )}
                <Button
                  variant={isWalletConnected ? "outline" : "default"}
                  onClick={handleWalletConnect}
                  iconName={isWalletConnected ? "LogOut" : "Wallet"}
                  iconPosition="left"
                  fullWidth
                >
                  {isWalletConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
      {/* Header Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Header;