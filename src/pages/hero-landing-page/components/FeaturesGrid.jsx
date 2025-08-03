import React from 'react';
import Icon from '../../../components/AppIcon';

const FeaturesGrid = () => {
  const features = [
    {
      id: 1,
      icon: "Star",
      title: "Stellar Network Integration",
      description: "Built on the fast, secure, and low-cost Stellar blockchain network for seamless global transactions.",
      benefits: ["Sub-second transactions", "Minimal fees", "Global reach"],
      color: "from-accent to-accent/80"
    },
    {
      id: 2,
      icon: "Code",
      title: "Soroban Smart Contracts",
      description: "Leverage advanced smart contract functionality with Soroban for automated, trustless card operations.",
      benefits: ["Automated execution", "Trustless operations", "Programmable logic"],
      color: "from-secondary to-primary"
    },
    {
      id: 3,
      icon: "CreditCard",
      title: "Decentralized Card Management",
      description: "Complete control over your digital cards with decentralized issuance, management, and trading capabilities.",
      benefits: ["Full ownership", "Peer-to-peer trading", "No intermediaries"],
      color: "from-primary to-secondary"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Icon name="Sparkles" size={16} className="mr-2" />
            Platform Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose StellarCard?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of digital finance with our cutting-edge blockchain technology 
            and user-centric design approach.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features?.map((feature, index) => (
            <div 
              key={feature?.id}
              className="group relative bg-card border border-border rounded-2xl p-8 hover:shadow-modal transition-all duration-300 hover:-translate-y-1"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature?.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature?.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={feature?.icon} size={28} color="white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                {feature?.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {feature?.description}
              </p>

              {/* Benefits List */}
              <ul className="space-y-2">
                {feature?.benefits?.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center text-sm text-muted-foreground">
                    <Icon name="Check" size={16} className="text-success mr-2 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>

              {/* Hover Effect Arrow */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Icon name="ArrowUpRight" size={20} className="text-primary" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Ready to experience the future of decentralized finance?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200">
              <Icon name="Rocket" size={18} className="mr-2" />
              Get Started
            </button>
            <button className="inline-flex items-center px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors duration-200">
              <Icon name="BookOpen" size={18} className="mr-2" />
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;