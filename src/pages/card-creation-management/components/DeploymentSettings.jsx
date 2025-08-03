import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const DeploymentSettings = ({ deploymentData, onUpdate, onDeploy, className = '' }) => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState({
    deployment: '2.5',
    initialization: '0.8',
    total: '3.3'
  });

  const priorityOptions = [
    { value: 'low', label: 'Low Priority', description: 'Slower deployment, lower fees' },
    { value: 'medium', label: 'Medium Priority', description: 'Balanced speed and cost' },
    { value: 'high', label: 'High Priority', description: 'Faster deployment, higher fees' }
  ];

  const handleInputChange = (field, value) => {
    onUpdate({ ...deploymentData, [field]: value });
    
    // Simulate cost calculation based on priority
    if (field === 'priority') {
      const multipliers = { low: 0.8, medium: 1.0, high: 1.5 };
      const multiplier = multipliers?.[value] || 1.0;
      setEstimatedCost({
        deployment: (2.5 * multiplier)?.toFixed(1),
        initialization: (0.8 * multiplier)?.toFixed(1),
        total: (3.3 * multiplier)?.toFixed(1)
      });
    }
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    try {
      await onDeploy(deploymentData);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className={`bg-card rounded-xl p-6 border border-border ${className}`}>
      <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center">
        <Icon name="Rocket" size={20} className="mr-2" />
        Deployment Settings
      </h3>
      <div className="space-y-6">
        {/* Deployment Priority */}
        <Select
          label="Deployment Priority"
          description="Choose deployment speed and cost preference"
          options={priorityOptions}
          value={deploymentData?.priority || 'medium'}
          onChange={(value) => handleInputChange('priority', value)}
          required
        />

        {/* Contract Name */}
        <Input
          label="Contract Name"
          type="text"
          placeholder="my-stellar-card-contract"
          value={deploymentData?.contractName || ''}
          onChange={(e) => handleInputChange('contractName', e?.target?.value)}
          description="Unique identifier for your smart contract"
          required
        />

        {/* Deployment Options */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground">Deployment Options</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Checkbox
              label="Auto-Initialize"
              description="Automatically initialize contract after deployment"
              checked={deploymentData?.autoInitialize || true}
              onChange={(e) => handleInputChange('autoInitialize', e?.target?.checked)}
            />

            <Checkbox
              label="Verify Contract"
              description="Verify contract source code on explorer"
              checked={deploymentData?.verifyContract || false}
              onChange={(e) => handleInputChange('verifyContract', e?.target?.checked)}
            />

            <Checkbox
              label="Enable Monitoring"
              description="Set up contract monitoring and alerts"
              checked={deploymentData?.enableMonitoring || true}
              onChange={(e) => handleInputChange('enableMonitoring', e?.target?.checked)}
            />

            <Checkbox
              label="Backup Configuration"
              description="Save deployment config for future reference"
              checked={deploymentData?.backupConfig || true}
              onChange={(e) => handleInputChange('backupConfig', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Cost Estimation */}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="text-md font-medium text-foreground mb-3 flex items-center">
            <Icon name="Calculator" size={16} className="mr-2" />
            Estimated Deployment Cost
          </h4>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Contract Deployment:</span>
              <span className="font-medium">{estimatedCost?.deployment} XLM</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Initialization:</span>
              <span className="font-medium">{estimatedCost?.initialization} XLM</span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between font-medium">
                <span>Total Cost:</span>
                <span className="text-primary">{estimatedCost?.total} XLM</span>
              </div>
            </div>
          </div>

          <div className="mt-3 p-2 bg-accent/10 rounded border border-accent/20">
            <p className="text-xs text-accent-foreground flex items-center">
              <Icon name="Info" size={12} className="mr-1" />
              Costs may vary based on network congestion
            </p>
          </div>
        </div>

        {/* Security Checklist */}
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <h4 className="text-md font-medium text-warning-foreground mb-3 flex items-center">
            <Icon name="Shield" size={16} className="mr-2" />
            Security Checklist
          </h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success" />
              <span>Contract code reviewed and tested</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success" />
              <span>Deployment parameters validated</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success" />
              <span>Network connection stable</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={14} className="text-warning" />
              <span>Sufficient XLM balance for deployment</span>
            </div>
          </div>
        </div>

        {/* Deployment Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button
            variant="outline"
            iconName="Save"
            iconPosition="left"
            className="flex-1"
            onClick={() => console.log('Save configuration')}
          >
            Save Configuration
          </Button>
          
          <Button
            variant="default"
            iconName="Rocket"
            iconPosition="left"
            className="flex-1"
            loading={isDeploying}
            onClick={handleDeploy}
            disabled={!deploymentData?.contractName}
          >
            {isDeploying ? 'Deploying...' : 'Deploy Contract'}
          </Button>
        </div>

        {/* Deployment Status */}
        {isDeploying && (
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="animate-spin">
                <Icon name="Loader2" size={16} className="text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-accent-foreground">
                  Deploying Contract...
                </p>
                <p className="text-xs text-muted-foreground">
                  This may take a few minutes. Please don't close this window.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeploymentSettings;