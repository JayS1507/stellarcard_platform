import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CallToAction = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e?.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  const quickLinks = [
    { label: 'Documentation', icon: 'BookOpen', path: '#' },
    { label: 'API Reference', icon: 'Code', path: '#' },
    { label: 'Community', icon: 'Users', path: '#' },
    { label: 'Support', icon: 'HelpCircle', path: '#' }
  ];

  const socialLinks = [
    { label: 'Twitter', icon: 'Twitter', path: '#' },
    { label: 'Discord', icon: 'MessageCircle', path: '#' },
    { label: 'GitHub', icon: 'Github', path: '#' },
    { label: 'LinkedIn', icon: 'Linkedin', path: '#' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary via-secondary to-primary/90 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-accent rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-accent/60 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent/40 rounded-full animate-ping"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          {/* Main CTA */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your
              <span className="block text-accent">Financial Future?</span>
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join thousands of users who are already experiencing the power of decentralized 
              finance with StellarCard. Start your blockchain journey today.
            </p>

            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/wallet-connection-authentication">
                <Button 
                  size="lg"
                  iconName="Wallet"
                  iconPosition="left"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 min-w-56"
                >
                  Connect Wallet & Start
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                iconName="PlayCircle"
                iconPosition="left"
                className="border-white/30 text-white hover:bg-white/10 min-w-56"
              >
                Watch Platform Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-white/80 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} />
                <span>Bank-grade Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={16} />
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Globe" size={16} />
                <span>Global Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="DollarSign" size={16} />
                <span>Low Fees</span>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-4">
              Stay Updated with StellarCard
            </h3>
            <p className="text-white/80 mb-6">
              Get the latest updates, features, and blockchain insights delivered to your inbox.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e?.target?.value)}
                    required
                    className="bg-white/20 border-white/30 text-white placeholder-white/60"
                  />
                </div>
                <Button
                  type="submit"
                  loading={isLoading}
                  iconName="Send"
                  iconPosition="right"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 min-w-32"
                >
                  Subscribe
                </Button>
              </form>
            ) : (
              <div className="flex items-center justify-center space-x-2 text-accent">
                <Icon name="CheckCircle" size={24} />
                <span className="font-medium">Thank you for subscribing!</span>
              </div>
            )}

            <p className="text-xs text-white/60 mt-3">
              No spam, unsubscribe at any time. Read our{' '}
              <a href="#" className="text-accent hover:underline">Privacy Policy</a>
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {quickLinks?.map((link, index) => (
              <a
                key={index}
                href={link?.path}
                className="flex items-center justify-center space-x-2 p-4 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-white/20 transition-colors duration-200"
              >
                <Icon name={link?.icon} size={20} />
                <span className="font-medium">{link?.label}</span>
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 mb-8">
            {socialLinks?.map((social, index) => (
              <a
                key={index}
                href={social?.path}
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
                aria-label={social?.label}
              >
                <Icon name={social?.icon} size={20} />
              </a>
            ))}
          </div>

          {/* Final Message */}
          <div className="text-center">
            <p className="text-white/80 text-lg mb-4">
              Join the decentralized finance revolution today
            </p>
            <div className="flex items-center justify-center space-x-2 text-accent">
              <Icon name="Sparkles" size={20} />
              <span className="font-medium">Built on Stellar • Powered by Innovation</span>
              <Icon name="Sparkles" size={20} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;