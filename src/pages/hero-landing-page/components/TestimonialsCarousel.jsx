import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "DeFi Developer",
      company: "BlockTech Solutions",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: `StellarCard has revolutionized how we handle decentralized payments. The Soroban integration is seamless, and the transaction speeds are incredible. Our users love the transparency and security it provides.`,
      rating: 5,
      verified: true
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Blockchain Architect",
      company: "CryptoFinance Corp",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: `The platform's smart contract capabilities are outstanding. We've been able to automate complex financial workflows that previously required multiple intermediaries. The cost savings alone justify the switch.`,
      rating: 5,
      verified: true
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Product Manager",
      company: "NextGen Payments",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: `What impressed me most is the user experience. Despite being built on blockchain, it feels as intuitive as traditional payment systems. The real-time network status gives our team confidence in reliability.`,
      rating: 5,
      verified: true
    },
    {
      id: 4,
      name: "David Kim",
      role: "CTO",
      company: "Digital Assets Inc",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: `The decentralized card management features are game-changing. Our clients can now have full control over their digital assets without relying on traditional banking infrastructure. Stellar's speed makes it perfect for real-world use.`,
      rating: 5,
      verified: true
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials?.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? "text-warning fill-current" : "text-muted"}
      />
    ));
  };

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            <Icon name="MessageSquare" size={16} className="mr-2" />
            Customer Stories
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what blockchain professionals and companies are saying about their experience with StellarCard.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="bg-background border border-border rounded-2xl p-8 md:p-12 shadow-card">
            <div className="text-center mb-8">
              {/* Quote Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Icon name="Quote" size={32} className="text-primary" />
              </div>

              {/* Rating */}
              <div className="flex justify-center space-x-1 mb-6">
                {renderStars(testimonials?.[currentIndex]?.rating)}
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">
                "{testimonials?.[currentIndex]?.content}"
              </blockquote>
            </div>

            {/* Author Info */}
            <div className="flex items-center justify-center space-x-4">
              <div className="relative">
                <Image
                  src={testimonials?.[currentIndex]?.avatar}
                  alt={testimonials?.[currentIndex]?.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                {testimonials?.[currentIndex]?.verified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} color="white" />
                  </div>
                )}
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-foreground">
                  {testimonials?.[currentIndex]?.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {testimonials?.[currentIndex]?.role}
                </p>
                <p className="text-sm text-primary font-medium">
                  {testimonials?.[currentIndex]?.company}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors duration-200 shadow-card"
            aria-label="Previous testimonial"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors duration-200 shadow-card"
            aria-label="Next testimonial"
          >
            <Icon name="ChevronRight" size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-primary' : 'bg-muted hover:bg-muted-foreground'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play Indicator */}
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-success animate-pulse' : 'bg-muted'}`}></div>
              <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-2">99%</div>
            <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;