import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const CardDesignForm = ({ cardData, onUpdate, className = '' }) => {
  const cardTypeOptions = [
    { value: 'standard', label: 'Standard Card', description: 'Basic features with standard limits' },
    { value: 'premium', label: 'Premium Card', description: 'Enhanced features with higher limits' },
    { value: 'business', label: 'Business Card', description: 'Corporate features with multi-user access' }
  ];

  const assetOptions = [
    { value: 'XLM', label: 'Stellar Lumens (XLM)', description: 'Native Stellar network token' },
    { value: 'USDC', label: 'USD Coin (USDC)', description: 'Stable coin pegged to USD' },
    { value: 'EURC', label: 'Euro Coin (EURC)', description: 'Stable coin pegged to EUR' },
    { value: 'BTC', label: 'Bitcoin (BTC)', description: 'Wrapped Bitcoin on Stellar' }
  ];

  const colorOptions = [
    { value: '#1B365D', label: 'Stellar Blue' },
    { value: '#2E5984', label: 'Ocean Blue' },
    { value: '#000000', label: 'Midnight Black' },
    { value: '#4A5568', label: 'Slate Gray' },
    { value: '#D69E2E', label: 'Gold' },
    { value: '#38A169', label: 'Forest Green' }
  ];

  const handleInputChange = (field, value) => {
    onUpdate({ ...cardData, [field]: value });
  };

  return (
    <div className={`bg-card rounded-xl p-6 border border-border ${className}`}>
      <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center">
        <Icon name="Palette" size={20} className="mr-2" />
        Card Design
      </h3>
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Card Name"
            type="text"
            placeholder="Enter card name"
            value={cardData?.cardName || ''}
            onChange={(e) => handleInputChange('cardName', e?.target?.value)}
            description="This will appear on your card"
            required
          />
          
          <Input
            label="Card Holder Name"
            type="text"
            placeholder="Enter holder name"
            value={cardData?.holderName || ''}
            onChange={(e) => handleInputChange('holderName', e?.target?.value?.toUpperCase())}
            description="Name as it appears on the card"
            required
          />
        </div>

        {/* Card Type Selection */}
        <Select
          label="Card Type"
          description="Choose the type of card you want to create"
          options={cardTypeOptions}
          value={cardData?.cardType || 'standard'}
          onChange={(value) => handleInputChange('cardType', value)}
          required
        />

        {/* Asset Selection */}
        <Select
          label="Primary Asset"
          description="Select the main cryptocurrency for this card"
          options={assetOptions}
          value={cardData?.assetCode || 'XLM'}
          onChange={(value) => handleInputChange('assetCode', value)}
          searchable
          required
        />

        {/* Initial Balance */}
        <Input
          label="Initial Balance"
          type="number"
          placeholder="0.00"
          value={cardData?.balance || ''}
          onChange={(e) => handleInputChange('balance', e?.target?.value)}
          description="Amount to load onto the card initially"
          min="0"
          step="0.01"
        />

        {/* Card Appearance */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground flex items-center">
            <Icon name="Paintbrush" size={16} className="mr-2" />
            Appearance
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Background Color
              </label>
              <div className="grid grid-cols-3 gap-2">
                {colorOptions?.map((color) => (
                  <button
                    key={color?.value}
                    onClick={() => handleInputChange('backgroundColor', color?.value)}
                    className={`w-full h-10 rounded-lg border-2 transition-all duration-150 ${
                      cardData?.backgroundColor === color?.value
                        ? 'border-primary scale-105' :'border-border hover:border-muted-foreground'
                    }`}
                    style={{ backgroundColor: color?.value }}
                    title={color?.label}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Text Color
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleInputChange('textColor', '#FFFFFF')}
                  className={`h-10 rounded-lg border-2 bg-white transition-all duration-150 ${
                    cardData?.textColor === '#FFFFFF' ?'border-primary scale-105' :'border-border hover:border-muted-foreground'
                  }`}
                  title="White Text"
                />
                <button
                  onClick={() => handleInputChange('textColor', '#000000')}
                  className={`h-10 rounded-lg border-2 bg-black transition-all duration-150 ${
                    cardData?.textColor === '#000000' ?'border-primary scale-105' :'border-border hover:border-muted-foreground'
                  }`}
                  title="Black Text"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Options */}
        <div className="pt-4 border-t border-border">
          <Button
            variant="ghost"
            iconName="Settings"
            iconPosition="left"
            className="w-full justify-start"
          >
            Advanced Design Options
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardDesignForm;