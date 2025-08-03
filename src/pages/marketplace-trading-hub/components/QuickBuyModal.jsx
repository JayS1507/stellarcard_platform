import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const QuickBuyModal = ({ card, isOpen, onClose, onConfirmPurchase }) => {
  const [quantity, setQuantity] = useState(1);
  const [slippageTolerance, setSlippageTolerance] = useState(0.5);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [estimatedTotal, setEstimatedTotal] = useState(0);
  const [networkFee, setNetworkFee] = useState(0.1);
  const [platformFee, setPlatformFee] = useState(0);
  const [priceImpact, setPriceImpact] = useState(0);

  useEffect(() => {
    if (card) {
      const subtotal = card?.price * quantity;
      const platformFeeAmount = subtotal * 0.0025; // 0.25% platform fee
      const priceImpactAmount = subtotal * (priceImpact / 100);
      const total = subtotal + networkFee + platformFeeAmount + priceImpactAmount;
      
      setEstimatedTotal(total);
      setPlatformFee(platformFeeAmount);
      
      // Calculate price impact based on quantity
      const impact = Math.min(quantity * 0.1, 2.5); // Max 2.5% impact
      setPriceImpact(impact);
    }
  }, [card, quantity, networkFee, priceImpact]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4
    })?.format(amount);
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Math.min(parseInt(e?.target?.value) || 1, card?.maxQuantity || 100));
    setQuantity(value);
  };

  const handleSlippageChange = (value) => {
    setSlippageTolerance(value);
  };

  const handleConfirm = () => {
    if (!agreedToTerms) return;
    
    const purchaseData = {
      card,
      quantity,
      slippageTolerance,
      estimatedTotal,
      networkFee,
      platformFee,
      priceImpact
    };
    
    onConfirmPurchase(purchaseData);
  };

  if (!isOpen || !card) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1100 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Quick Buy</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-150"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Card Preview */}
          <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={card?.image}
                alt={card?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{card?.name}</h3>
              <p className="text-sm text-muted-foreground">by {card?.issuer}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-lg font-bold text-foreground">
                  {formatCurrency(card?.price)} XLM
                </span>
                <span className="text-sm text-success">
                  {card?.yield}% APY
                </span>
              </div>
            </div>
          </div>

          {/* Quantity Selection */}
          <div>
            <Input
              label="Quantity"
              type="number"
              min="1"
              max={card?.maxQuantity || 100}
              value={quantity}
              onChange={handleQuantityChange}
              description={`Available: ${card?.maxQuantity || 100} cards`}
            />
          </div>

          {/* Slippage Tolerance */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Slippage Tolerance
            </label>
            <div className="flex space-x-2">
              {[0.1, 0.5, 1.0, 2.0]?.map((value) => (
                <button
                  key={value}
                  onClick={() => handleSlippageChange(value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    slippageTolerance === value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {value}%
                </button>
              ))}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 p-4 bg-muted rounded-lg">
            <h4 className="font-medium text-foreground">Price Breakdown</h4>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal ({quantity} × {formatCurrency(card?.price)}):</span>
                <span className="font-medium">{formatCurrency(card?.price * quantity)} XLM</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platform Fee (0.25%):</span>
                <span className="font-medium">{formatCurrency(platformFee)} XLM</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Network Fee:</span>
                <span className="font-medium">{formatCurrency(networkFee)} XLM</span>
              </div>
              
              {priceImpact > 0 && (
                <div className="flex justify-between">
                  <span className="text-warning">Price Impact ({priceImpact?.toFixed(2)}%):</span>
                  <span className="font-medium text-warning">
                    +{formatCurrency(card?.price * quantity * (priceImpact / 100))} XLM
                  </span>
                </div>
              )}
              
              <div className="border-t border-border pt-2 flex justify-between font-semibold">
                <span>Total:</span>
                <span>{formatCurrency(estimatedTotal)} XLM</span>
              </div>
            </div>
          </div>

          {/* Risk Warnings */}
          {priceImpact > 1 && (
            <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-warning">High Price Impact</p>
                  <p className="text-warning/80">
                    This trade will significantly impact the price. Consider reducing quantity.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Terms Agreement */}
          <div className="space-y-3">
            <Checkbox
              label="I understand the risks and agree to the terms of service"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e?.target?.checked)}
            />
            
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Transactions are irreversible once confirmed</p>
              <p>• Prices may change due to market conditions</p>
              <p>• Network fees are non-refundable</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleConfirm}
            disabled={!agreedToTerms}
            iconName="ShoppingCart"
            iconPosition="left"
            fullWidth
          >
            Confirm Purchase
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickBuyModal;