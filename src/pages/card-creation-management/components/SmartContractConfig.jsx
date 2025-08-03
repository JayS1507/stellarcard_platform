import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const SmartContractConfig = ({ contractData, onUpdate, className = '' }) => {
  const [expandedSections, setExpandedSections] = useState({
    spending: true,
    multisig: false,
    staking: false,
    advanced: false
  });

  const networkOptions = [
    { value: 'mainnet', label: 'Stellar Mainnet', description: 'Production network with real assets' },
    { value: 'testnet', label: 'Stellar Testnet', description: 'Test network for development' },
    { value: 'futurenet', label: 'Stellar Futurenet', description: 'Preview network for new features' }
  ];

  const contractTemplates = [
    { value: 'basic', label: 'Basic Card Contract', description: 'Simple spend and transfer functions' },
    { value: 'multisig', label: 'Multi-Signature Contract', description: 'Requires multiple approvals' },
    { value: 'timelock', label: 'Time-Locked Contract', description: 'Spending limits with time restrictions' },
    { value: 'custom', label: 'Custom Contract', description: 'Upload your own Soroban contract' }
  ];

  const handleInputChange = (field, value) => {
    onUpdate({ ...contractData, [field]: value });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  return (
    <div className={`bg-card rounded-xl p-6 border border-border ${className}`}>
      <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center">
        <Icon name="Code" size={20} className="mr-2" />
        Smart Contract Configuration
      </h3>
      <div className="space-y-6">
        {/* Network Selection */}
        <Select
          label="Deployment Network"
          description="Choose the Stellar network for contract deployment"
          options={networkOptions}
          value={contractData?.network || 'testnet'}
          onChange={(value) => handleInputChange('network', value)}
          required
        />

        {/* Contract Template */}
        <Select
          label="Contract Template"
          description="Select a pre-built contract or upload custom"
          options={contractTemplates}
          value={contractData?.template || 'basic'}
          onChange={(value) => handleInputChange('template', value)}
          required
        />

        {/* Spending Limits Section */}
        <div className="border border-border rounded-lg">
          <button
            onClick={() => toggleSection('spending')}
            className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors duration-150"
          >
            <div className="flex items-center">
              <Icon name="DollarSign" size={16} className="mr-2" />
              <span className="font-medium">Spending Limits</span>
            </div>
            <Icon 
              name={expandedSections?.spending ? "ChevronUp" : "ChevronDown"} 
              size={16} 
            />
          </button>
          
          {expandedSections?.spending && (
            <div className="p-4 border-t border-border space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Daily Limit"
                  type="number"
                  placeholder="1000"
                  value={contractData?.dailyLimit || ''}
                  onChange={(e) => handleInputChange('dailyLimit', e?.target?.value)}
                  description="Maximum daily spending amount"
                  min="0"
                />
                
                <Input
                  label="Transaction Limit"
                  type="number"
                  placeholder="100"
                  value={contractData?.transactionLimit || ''}
                  onChange={(e) => handleInputChange('transactionLimit', e?.target?.value)}
                  description="Maximum per-transaction amount"
                  min="0"
                />
              </div>

              <Checkbox
                label="Enable Velocity Checks"
                description="Monitor spending patterns for fraud detection"
                checked={contractData?.velocityChecks || false}
                onChange={(e) => handleInputChange('velocityChecks', e?.target?.checked)}
              />
            </div>
          )}
        </div>

        {/* Multi-Signature Section */}
        <div className="border border-border rounded-lg">
          <button
            onClick={() => toggleSection('multisig')}
            className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors duration-150"
          >
            <div className="flex items-center">
              <Icon name="Users" size={16} className="mr-2" />
              <span className="font-medium">Multi-Signature Setup</span>
            </div>
            <Icon 
              name={expandedSections?.multisig ? "ChevronUp" : "ChevronDown"} 
              size={16} 
            />
          </button>
          
          {expandedSections?.multisig && (
            <div className="p-4 border-t border-border space-y-4">
              <Checkbox
                label="Enable Multi-Signature"
                description="Require multiple approvals for transactions"
                checked={contractData?.multisigEnabled || false}
                onChange={(e) => handleInputChange('multisigEnabled', e?.target?.checked)}
              />

              {contractData?.multisigEnabled && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Input
                    label="Required Signatures"
                    type="number"
                    placeholder="2"
                    value={contractData?.requiredSignatures || ''}
                    onChange={(e) => handleInputChange('requiredSignatures', e?.target?.value)}
                    min="1"
                    max="10"
                  />
                  
                  <Input
                    label="Total Signers"
                    type="number"
                    placeholder="3"
                    value={contractData?.totalSigners || ''}
                    onChange={(e) => handleInputChange('totalSigners', e?.target?.value)}
                    min="1"
                    max="10"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Staking Configuration */}
        <div className="border border-border rounded-lg">
          <button
            onClick={() => toggleSection('staking')}
            className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors duration-150"
          >
            <div className="flex items-center">
              <Icon name="TrendingUp" size={16} className="mr-2" />
              <span className="font-medium">Staking & Rewards</span>
            </div>
            <Icon 
              name={expandedSections?.staking ? "ChevronUp" : "ChevronDown"} 
              size={16} 
            />
          </button>
          
          {expandedSections?.staking && (
            <div className="p-4 border-t border-border space-y-4">
              <Checkbox
                label="Enable Staking Rewards"
                description="Earn rewards on card balance"
                checked={contractData?.stakingEnabled || false}
                onChange={(e) => handleInputChange('stakingEnabled', e?.target?.checked)}
              />

              {contractData?.stakingEnabled && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Input
                    label="APY Rate (%)"
                    type="number"
                    placeholder="5.0"
                    value={contractData?.apyRate || ''}
                    onChange={(e) => handleInputChange('apyRate', e?.target?.value)}
                    min="0"
                    max="100"
                    step="0.1"
                  />
                  
                  <Input
                    label="Minimum Stake"
                    type="number"
                    placeholder="100"
                    value={contractData?.minimumStake || ''}
                    onChange={(e) => handleInputChange('minimumStake', e?.target?.value)}
                    min="0"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Advanced Options */}
        <div className="border border-border rounded-lg">
          <button
            onClick={() => toggleSection('advanced')}
            className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors duration-150"
          >
            <div className="flex items-center">
              <Icon name="Settings" size={16} className="mr-2" />
              <span className="font-medium">Advanced Options</span>
            </div>
            <Icon 
              name={expandedSections?.advanced ? "ChevronUp" : "ChevronDown"} 
              size={16} 
            />
          </button>
          
          {expandedSections?.advanced && (
            <div className="p-4 border-t border-border space-y-4">
              <Input
                label="Gas Limit"
                type="number"
                placeholder="100000"
                value={contractData?.gasLimit || ''}
                onChange={(e) => handleInputChange('gasLimit', e?.target?.value)}
                description="Maximum gas for contract execution"
                min="1"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Checkbox
                  label="Enable Upgrades"
                  description="Allow contract upgrades in future"
                  checked={contractData?.upgradeEnabled || false}
                  onChange={(e) => handleInputChange('upgradeEnabled', e?.target?.checked)}
                />

                <Checkbox
                  label="Emergency Pause"
                  description="Include emergency pause functionality"
                  checked={contractData?.pauseEnabled || false}
                  onChange={(e) => handleInputChange('pauseEnabled', e?.target?.checked)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Contract Code Upload */}
        {contractData?.template === 'custom' && (
          <div className="p-4 border border-dashed border-border rounded-lg">
            <div className="text-center">
              <Icon name="Upload" size={32} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Upload your Soroban smart contract (.wasm file)
              </p>
              <Button variant="outline" iconName="Upload" iconPosition="left">
                Choose File
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartContractConfig;