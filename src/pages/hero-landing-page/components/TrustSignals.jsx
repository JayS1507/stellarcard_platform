import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const partners = [
    {
      id: 1,
      name: "Stellar Development Foundation",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop",
      type: "Foundation Partner"
    },
    {
      id: 2,
      name: "Soroban Labs",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=120&h=60&fit=crop",
      type: "Technology Partner"
    },
    {
      id: 3,
      name: "Blockchain Security Alliance",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&h=60&fit=crop",
      type: "Security Partner"
    },
    {
      id: 4,
      name: "DeFi Consortium",
      logo: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=120&h=60&fit=crop",
      type: "Industry Partner"
    }
  ];

  const certifications = [
    {
      id: 1,
      title: "SOC 2 Type II Compliant",
      description: "Independently verified security controls and data protection standards",
      icon: "Shield",
      status: "verified",
      date: "Valid until Dec 2025"
    },
    {
      id: 2,
      title: "Smart Contract Audited",
      description: "Comprehensive security audit by leading blockchain security firms",
      icon: "FileCheck",
      status: "verified",
      date: "Audited Jan 2025"
    },
    {
      id: 3,
      title: "ISO 27001 Certified",
      description: "International standard for information security management systems",
      icon: "Award",
      status: "verified",
      date: "Valid until Mar 2026"
    },
    {
      id: 4,
      title: "Open Source Verified",
      description: "Transparent, community-reviewed codebase available on GitHub",
      icon: "Github",
      status: "verified",
      date: "Updated daily"
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "Stellar Community Fund Winner",
      description: "Recognized for innovation in decentralized finance solutions",
      year: "2024",
      amount: "$250K"
    },
    {
      id: 2,
      title: "Best DeFi Platform",
      description: "Blockchain Innovation Awards - Outstanding Achievement",
      year: "2024",
      amount: "Gold"
    },
    {
      id: 3,
      title: "Security Excellence Award",
      description: "Recognized for best practices in smart contract security",
      year: "2024",
      amount: "Platinum"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-success/10 text-success rounded-full text-sm font-medium mb-4">
            <Icon name="CheckCircle" size={16} className="mr-2" />
            Trusted & Verified
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Built on Trust & Security
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform is backed by industry-leading partnerships, certifications, 
            and security standards to ensure your assets are always protected.
          </p>
        </div>

        {/* Partners Section */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-foreground text-center mb-8">
            Trusted by Industry Leaders
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners?.map((partner) => (
              <div 
                key={partner?.id}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-card transition-shadow duration-200"
              >
                <div className="mb-4 flex justify-center">
                  <Image
                    src={partner?.logo}
                    alt={partner?.name}
                    className="h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-200"
                  />
                </div>
                <h4 className="font-medium text-foreground text-sm mb-1">
                  {partner?.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {partner?.type}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-foreground text-center mb-8">
            Security & Compliance Certifications
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {certifications?.map((cert) => (
              <div 
                key={cert?.id}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-card transition-shadow duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                      <Icon name={cert?.icon} size={24} className="text-success" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-foreground">{cert?.title}</h4>
                      <Icon name="CheckCircle" size={16} className="text-success" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {cert?.description}
                    </p>
                    <p className="text-xs text-success font-medium">
                      {cert?.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-foreground text-center mb-8">
            Awards & Recognition
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {achievements?.map((achievement) => (
              <div 
                key={achievement?.id}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-card transition-shadow duration-200"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Trophy" size={28} color="white" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  {achievement?.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {achievement?.description}
                </p>
                <div className="flex justify-center items-center space-x-4 text-xs">
                  <span className="text-primary font-medium">{achievement?.year}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-accent font-medium">{achievement?.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Stats */}
        <div className="bg-card border border-border rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Security by the Numbers
            </h3>
            <p className="text-muted-foreground">
              Our commitment to security is reflected in our track record
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-2">0</div>
              <div className="text-sm text-muted-foreground">Security Breaches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">99.99%</div>
              <div className="text-sm text-muted-foreground">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-2">$50M+</div>
              <div className="text-sm text-muted-foreground">Assets Secured</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Monitoring</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Ready to experience enterprise-grade security?
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200">
            <Icon name="Shield" size={18} className="mr-2" />
            View Security Details
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;