import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    "Stellar Network Integration",
    "Soroban Smart Contracts", 
    "Decentralized Card Management",
    "Multi-Signature Security"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features?.length);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [features?.length]);

  const cardVariants = {
    initial: { 
      rotateY: 0, 
      rotateX: 0, 
      scale: 1,
      z: 0
    },
    hover: { 
      rotateY: 15, 
      rotateX: 15, 
      scale: 1.05,
      z: 50,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const floatingElementVariants = {
    animate: (custom) => ({
      y: [0, -30, 0],
      x: [0, custom * 10, 0],
      rotateZ: [0, custom * 5, 0],
      transition: {
        duration: 6 + custom,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary via-secondary to-primary/80 dark:from-background dark:via-card dark:to-primary/20 overflow-hidden transition-all duration-500">
      {/* Enhanced 3D Background Animation */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-accent rounded-full depth-glow"
          variants={floatingElementVariants}
          animate="animate"
          custom={1}
        />
        <motion.div 
          className="absolute top-40 right-20 w-24 h-24 bg-accent/60 rounded-full depth-glow"
          variants={floatingElementVariants}
          animate="animate"
          custom={-1}
        />
        <motion.div 
          className="absolute bottom-32 left-1/4 w-16 h-16 bg-accent/40 rounded-full depth-glow"
          variants={floatingElementVariants}
          animate="animate"
          custom={2}
        />
        <motion.div 
          className="absolute bottom-20 right-1/3 w-20 h-20 bg-accent/80 rounded-full depth-glow"
          variants={floatingElementVariants}
          animate="animate"
          custom={-2}
        />
        
        {/* 3D Geometric Shapes */}
        <motion.div 
          className="absolute top-1/4 left-1/3 w-8 h-8 bg-primary/30 rotate-3d"
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-secondary/30 rotate-3d"
          style={{ clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' }}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="inline-flex items-center px-4 py-2 bg-accent/20 dark:bg-accent/10 text-accent rounded-full text-sm font-medium glass">
                <Icon name="Zap" size={16} className="mr-2" />
                Powered by Stellar Network
              </span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white dark:text-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Decentralized
              <motion.span 
                className="block text-accent"
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(0, 212, 255, 0)",
                    "0 0 20px rgba(0, 212, 255, 0.5)",
                    "0 0 0px rgba(0, 212, 255, 0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Card Platform
              </motion.span>
              for the Future
            </motion.h1>

            <motion.p 
              className="text-xl text-white/90 dark:text-muted-foreground mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Experience the next generation of financial cards built on Stellar blockchain. 
              Secure, transparent, and fully decentralized card management with Soroban smart contracts.
            </motion.p>

            {/* Rotating Features with 3D effect */}
            <div className="mb-8 h-8 transform-3d">
              <motion.div 
                className={`transition-all duration-500 ${isAnimating ? 'opacity-0 transform translate-y-2 rotateX(90deg)' : 'opacity-100 transform translate-y-0 rotateX(0deg)'}`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-center justify-center lg:justify-start text-accent font-medium">
                  <Icon name="CheckCircle" size={20} className="mr-2" />
                  {features?.[currentFeature]}
                </div>
              </motion.div>
            </div>

            {/* CTA Buttons with enhanced animations */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Link to="/wallet-connection-authentication">
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Button 
                    variant="default" 
                    size="lg"
                    iconName="Wallet"
                    iconPosition="left"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 min-w-48 depth-glow"
                  >
                    Connect Wallet
                  </Button>
                </motion.div>
              </Link>
              <motion.div
                whileHover={{ scale: 1.05, rotateY: -5 }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  iconName="Play"
                  iconPosition="left"
                  className="border-white/30 dark:border-accent/30 text-white dark:text-foreground hover:bg-white/10 dark:hover:bg-accent/10 min-w-48"
                >
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats with 3D hover effects */}
            <motion.div 
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20 dark:border-accent/20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {[
                { value: "10K+", label: "Active Cards" },
                { value: "$50M+", label: "Volume Processed" },
                { value: "99.9%", label: "Uptime" }
              ]?.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center lg:text-left"
                  whileHover={{ 
                    scale: 1.1, 
                    rotateY: 10,
                    z: 20
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="text-2xl font-bold text-white dark:text-foreground">{stat?.value}</div>
                  <div className="text-sm text-white/70 dark:text-muted-foreground">{stat?.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Enhanced 3D Card Visualization */}
          <motion.div 
            className="relative transform-3d"
            initial={{ opacity: 0, x: 50, rotateY: -30 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="relative max-w-md mx-auto lg:max-w-none">
              {/* Main Card with advanced 3D effects */}
              <motion.div 
                className="relative"
                variants={cardVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="bg-gradient-to-br from-accent to-accent/80 dark:from-primary dark:to-accent/60 rounded-2xl p-8 shadow-2xl depth-glow glass card-3d">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <div className="text-white/80 dark:text-foreground/80 text-sm mb-1">StellarCard</div>
                      <div className="text-white dark:text-foreground font-bold text-lg">Premium</div>
                    </div>
                    <motion.div
                      animate={{ rotateZ: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Icon name="Zap" size={32} color="white" />
                    </motion.div>
                  </div>
                  
                  <div className="mb-8">
                    <div className="text-white/80 dark:text-foreground/80 text-sm mb-2">Card Number</div>
                    <div className="text-white dark:text-foreground font-mono text-lg tracking-wider">
                      •••• •••• •••• 8742
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-white/80 dark:text-foreground/80 text-xs mb-1">Valid Thru</div>
                      <div className="text-white dark:text-foreground font-mono">12/28</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white/80 dark:text-foreground/80 text-xs mb-1">Balance</div>
                      <div className="text-white dark:text-foreground font-bold">1,250 XLM</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Background Cards with layered 3D effect */}
              <motion.div 
                className="absolute -top-4 -left-4 opacity-60"
                animate={{ 
                  rotateY: [12, 18, 12],
                  rotateX: [0, 5, 0],
                  z: [-20, -10, -20]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="bg-gradient-to-br from-secondary to-primary dark:from-card dark:to-primary/40 rounded-2xl p-8 w-80 h-48 depth-glow"></div>
              </motion.div>
              <motion.div 
                className="absolute -top-8 -left-8 opacity-30"
                animate={{ 
                  rotateY: [18, 24, 18],
                  rotateX: [0, -5, 0],
                  z: [-40, -30, -40]
                }}
                transition={{ duration: 10, repeat: Infinity }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="bg-gradient-to-br from-primary to-secondary dark:from-primary/20 dark:to-card/40 rounded-2xl p-8 w-80 h-48"></div>
              </motion.div>

              {/* Enhanced Floating Elements */}
              <motion.div 
                className="absolute -top-6 -right-6 bg-accent/20 dark:bg-primary/20 backdrop-blur-sm rounded-full p-4 glass depth-glow"
                animate={{ 
                  y: [0, -20, 0],
                  rotateX: [0, 360, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <Icon name="Shield" size={24} color="white" />
              </motion.div>
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-accent/20 dark:bg-primary/20 backdrop-blur-sm rounded-full p-4 glass depth-glow"
                animate={{ 
                  y: [0, 20, 0],
                  rotateY: [0, 360, 0],
                  scale: [1, 0.9, 1]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                <Icon name="Lock" size={24} color="white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Enhanced Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Icon name="ChevronDown" size={24} color="white" className="opacity-70 dark:text-accent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;