import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBreadcrumbs = ({ customBreadcrumbs = null, className = '' }) => {
  const location = useLocation();

  const routeMap = {
    '/hero-landing-page': { label: 'Home', icon: 'Home' },
    '/wallet-connection-authentication': { label: 'Connect Wallet', icon: 'Wallet' },
    '/dashboard-smart-contract-hub': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/card-creation-management': { label: 'Card Management', icon: 'CreditCard' },
    '/transaction-history-analytics': { label: 'Transaction History', icon: 'History' },
    '/marketplace-trading-hub': { label: 'Marketplace', icon: 'Store' }
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [];

    // Always start with Home if not on home page
    if (location.pathname !== '/hero-landing-page') {
      breadcrumbs?.push({
        label: 'Home',
        path: '/hero-landing-page',
        icon: 'Home'
      });
    }

    // Add current page
    const currentRoute = routeMap?.[location.pathname];
    if (currentRoute && location.pathname !== '/hero-landing-page') {
      breadcrumbs?.push({
        label: currentRoute?.label,
        path: location.pathname,
        icon: currentRoute?.icon,
        isActive: true
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on home page or if only one item
  if (location.pathname === '/hero-landing-page' || breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((crumb, index) => (
          <li key={crumb?.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="text-muted-foreground mx-2" 
              />
            )}
            
            {crumb?.isActive ? (
              <div className="flex items-center space-x-2 text-foreground font-medium">
                <Icon name={crumb?.icon} size={14} />
                <span>{crumb?.label}</span>
              </div>
            ) : (
              <Link
                to={crumb?.path}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                <Icon name={crumb?.icon} size={14} />
                <span>{crumb?.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default NavigationBreadcrumbs;