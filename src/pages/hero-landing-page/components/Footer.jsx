import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { label: "Dashboard", path: "/dashboard-smart-contract-hub" },
        { label: "Card Management", path: "/card-creation-management" },
        { label: "Marketplace", path: "/marketplace-trading-hub" },
        { label: "Transaction History", path: "/transaction-history-analytics" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", path: "#" },
        { label: "API Reference", path: "#" },
        { label: "Developer Tools", path: "#" },
        { label: "Smart Contracts", path: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", path: "#" },
        { label: "Careers", path: "#" },
        { label: "Press Kit", path: "#" },
        { label: "Contact", path: "#" }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", path: "#" },
        { label: "Community", path: "#" },
        { label: "Status Page", path: "#" },
        { label: "Bug Reports", path: "#" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Twitter", icon: "Twitter", url: "#" },
    { name: "Discord", icon: "MessageCircle", url: "#" },
    { name: "GitHub", icon: "Github", url: "#" },
    { name: "LinkedIn", icon: "Linkedin", url: "#" },
    { name: "Telegram", icon: "Send", url: "#" }
  ];

  const legalLinks = [
    { label: "Privacy Policy", path: "#" },
    { label: "Terms of Service", path: "#" },
    { label: "Cookie Policy", path: "#" },
    { label: "Security", path: "#" }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link to="/hero-landing-page" className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={24} color="white" />
                </div>
                <span className="text-2xl font-bold text-foreground">StellarCard</span>
              </Link>
              
              <p className="text-muted-foreground mb-6 max-w-md">
                The future of decentralized finance is here. Experience secure, transparent, 
                and efficient blockchain-based card services built on the Stellar network.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.url}
                    className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                    aria-label={social?.name}
                  >
                    <Icon name={social?.icon} size={18} />
                  </a>
                ))}
              </div>

              {/* Network Status */}
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-foreground">Stellar Network Status</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  All systems operational • Last updated: {new Date()?.toLocaleTimeString()}
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections?.map((section) => (
              <div key={section?.title}>
                <h3 className="font-semibold text-foreground mb-4">{section?.title}</h3>
                <ul className="space-y-3">
                  {section?.links?.map((link) => (
                    <li key={link?.label}>
                      <Link
                        to={link?.path}
                        className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        {link?.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Stay in the loop</h3>
              <p className="text-sm text-muted-foreground">
                Get updates on new features, security improvements, and blockchain insights.
              </p>
            </div>
            <div className="flex space-x-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © {currentYear} StellarCard Platform. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center space-x-6">
              {legalLinks?.map((link, index) => (
                <React.Fragment key={link?.label}>
                  <Link
                    to={link?.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link?.label}
                  </Link>
                  {index < legalLinks?.length - 1 && (
                    <span className="text-muted-foreground">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground space-y-2 md:space-y-0">
              <div className="flex items-center space-x-4">
                <span>Built on Stellar Network</span>
                <span>•</span>
                <span>Powered by Soroban Smart Contracts</span>
                <span>•</span>
                <span>Open Source</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={14} />
                <span>Enterprise Security</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;