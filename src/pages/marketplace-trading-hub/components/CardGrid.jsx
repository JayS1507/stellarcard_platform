import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CardGrid = ({ cards, onCardSelect, onQuickBuy }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })?.format(price);
  };

  const formatVolume = (volume) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000)?.toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `${(volume / 1000)?.toFixed(1)}K`;
    }
    return volume?.toString();
  };

  const getYieldColor = (yield_rate) => {
    if (yield_rate >= 15) return 'text-success';
    if (yield_rate >= 10) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getRiskBadgeColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'low': return 'bg-success/10 text-success border-success/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'high': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  if (!cards || cards?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Icon name="Search" size={48} className="text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No cards found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 lg:p-6">
      {cards?.map((card) => (
        <div
          key={card?.id}
          className="bg-card border border-border rounded-lg overflow-hidden hover-lift cursor-pointer transition-all duration-200"
          onMouseEnter={() => setHoveredCard(card?.id)}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => onCardSelect(card)}
        >
          {/* Card Image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={card?.image}
              alt={card?.name}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay on Hover */}
            {hoveredCard === card?.id && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Button
                  variant="default"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onQuickBuy(card);
                  }}
                  iconName="ShoppingCart"
                  iconPosition="left"
                >
                  Quick Buy
                </Button>
              </div>
            )}

            {/* Status Badges */}
            <div className="absolute top-3 left-3 flex flex-col space-y-1">
              {card?.isNew && (
                <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-md">
                  New
                </span>
              )}
              {card?.isFeatured && (
                <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-md">
                  Featured
                </span>
              )}
            </div>

            {/* Risk Badge */}
            <div className="absolute top-3 right-3">
              <span className={`px-2 py-1 text-xs font-medium rounded-md border ${getRiskBadgeColor(card?.risk)}`}>
                {card?.risk} Risk
              </span>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                  {card?.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  by {card?.issuer}
                </p>
              </div>
              <div className="flex items-center space-x-1 ml-2">
                <Icon name="Star" size={14} className="text-warning fill-current" />
                <span className="text-sm font-medium">{card?.rating}</span>
              </div>
            </div>

            {/* Price and Volume */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-lg font-bold text-foreground">
                  {formatPrice(card?.price)} XLM
                </div>
                <div className="text-xs text-muted-foreground">
                  Vol: {formatVolume(card?.volume)}
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${getYieldColor(card?.yield)}`}>
                  {card?.yield}% APY
                </div>
                <div className="text-xs text-muted-foreground">
                  {card?.change >= 0 ? '+' : ''}{card?.change}%
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center p-2 bg-muted rounded-md">
                <div className="text-xs text-muted-foreground">Liquidity</div>
                <div className="text-sm font-medium">{formatVolume(card?.liquidity)}</div>
              </div>
              <div className="text-center p-2 bg-muted rounded-md">
                <div className="text-xs text-muted-foreground">Holders</div>
                <div className="text-sm font-medium">{card?.holders}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e?.stopPropagation();
                  onCardSelect(card);
                }}
                iconName="Eye"
                iconPosition="left"
                fullWidth
              >
                View
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={(e) => {
                  e?.stopPropagation();
                  onQuickBuy(card);
                }}
                iconName="ShoppingCart"
                iconPosition="left"
                fullWidth
              >
                Buy
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardGrid;