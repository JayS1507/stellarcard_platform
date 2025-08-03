import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import HeroLandingPage from './pages/hero-landing-page';
import TransactionHistoryAnalytics from './pages/transaction-history-analytics';
import CardCreationManagement from './pages/card-creation-management';
import MarketplaceTradingHub from './pages/marketplace-trading-hub';
import WalletConnectionAuthentication from './pages/wallet-connection-authentication';
import DashboardSmartContractHub from './pages/dashboard-smart-contract-hub';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CardCreationManagement />} />
        <Route path="/hero-landing-page" element={<HeroLandingPage />} />
        <Route path="/transaction-history-analytics" element={<TransactionHistoryAnalytics />} />
        <Route path="/card-creation-management" element={<CardCreationManagement />} />
        <Route path="/marketplace-trading-hub" element={<MarketplaceTradingHub />} />
        <Route path="/wallet-connection-authentication" element={<WalletConnectionAuthentication />} />
        <Route path="/dashboard-smart-contract-hub" element={<DashboardSmartContractHub />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
