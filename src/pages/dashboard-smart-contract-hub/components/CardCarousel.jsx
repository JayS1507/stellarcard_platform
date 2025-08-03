import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CardCarousel = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cards?.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cards?.length) % cards?.length);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'suspended':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatBalance = (balance, currency) => {
    return `${balance?.toLocaleString()} ${currency}`;
  };

  if (!cards || cards?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Icon name="CreditCard" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Cards Found</h3>
        <p className="text-muted-foreground mb-4">Create your first blockchain card to get started</p>
        <Link to="/card-creation-management">
          <Button variant="default" iconName="Plus" iconPosition="left">
            Create Card
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">My Cards</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} of {cards?.length}
          </span>
          <div className="flex space-x-1">
            <button
              onClick={prevCard}
              disabled={cards?.length <= 1}
              className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            <button
              onClick={nextCard}
              disabled={cards?.length <= 1}
              className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>
        </div>
      </div>
      {/* Card Display */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {cards?.map((card, index) => (
            <div key={card?.id} className="w-full flex-shrink-0 px-2">
              <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-white relative overflow-hidden">
                {/* Card Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-32 h-32 rounded-full border-2 border-white/20" />
                  <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full border-2 border-white/20" />
                </div>

                {/* Card Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <Icon name="CreditCard" size={20} />
                      <span className="font-medium">{card?.type}</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(card?.status)}`}>
                      {card?.status?.charAt(0)?.toUpperCase() + card?.status?.slice(1)}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm opacity-80">Card Name</p>
                      <p className="text-xl font-bold">{card?.name}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm opacity-80">Balance</p>
                        <p className="text-lg font-semibold">{formatBalance(card?.balance, card?.currency)}</p>
                      </div>
                      <div>
                        <p className="text-sm opacity-80">Card ID</p>
                        <p className="text-sm font-mono">{card?.cardId}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <p className="text-xs opacity-80">Created</p>
                        <p className="text-sm">{new Date(card.createdAt)?.toLocaleDateString()}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors duration-150">
                          <Icon name="Eye" size={16} />
                        </button>
                        <button className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors duration-150">
                          <Icon name="Settings" size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Card Indicators */}
      <div className="flex justify-center space-x-2 mt-4">
        {cards?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-150 ${
              index === currentIndex ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-3 mt-6">
        <Link to="/card-creation-management" className="flex-1">
          <Button variant="default" fullWidth iconName="Plus" iconPosition="left">
            Create New Card
          </Button>
        </Link>
        <Button variant="outline" iconName="Settings" iconPosition="left">
          Manage Cards
        </Button>
      </div>
    </div>
  );
};

export default CardCarousel;