import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SmartContractPanel = ({ contracts }) => {
  const [selectedContract, setSelectedContract] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'deployed':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'failed':
        return 'text-error bg-error/10';
      case 'executing':
        return 'text-accent bg-accent/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const formatGasFee = (fee) => {
    return `${fee?.toFixed(6)} XLM`;
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Smart Contracts</h3>
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          Deploy Contract
        </Button>
      </div>
      {contracts?.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Code" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No Smart Contracts</h4>
          <p className="text-muted-foreground mb-4">Deploy your first Soroban smart contract to get started</p>
          <Button variant="default" iconName="Code" iconPosition="left">
            Deploy Contract
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {contracts?.map((contract) => (
            <div
              key={contract?.id}
              className={`border border-border rounded-lg p-4 cursor-pointer transition-all duration-150 hover:border-primary/50 ${
                selectedContract?.id === contract?.id ? 'border-primary bg-primary/5' : ''
              }`}
              onClick={() => setSelectedContract(selectedContract?.id === contract?.id ? null : contract)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Code" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{contract?.name}</h4>
                    <p className="text-sm text-muted-foreground">{contract?.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contract?.status)}`}>
                    {contract?.status?.charAt(0)?.toUpperCase() + contract?.status?.slice(1)}
                  </div>
                  <Icon 
                    name={selectedContract?.id === contract?.id ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    className="text-muted-foreground" 
                  />
                </div>
              </div>

              {selectedContract?.id === contract?.id && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Contract Address</p>
                      <p className="text-sm font-mono text-foreground">{contract?.address}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Deployed</p>
                      <p className="text-sm text-foreground">{formatTimestamp(contract?.deployedAt)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Gas Used</p>
                      <p className="text-sm text-foreground">{formatGasFee(contract?.gasUsed)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Executions</p>
                      <p className="text-sm text-foreground">{contract?.executionCount}</p>
                    </div>
                  </div>

                  {/* Recent Executions */}
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-foreground mb-2">Recent Executions</h5>
                    <div className="space-y-2">
                      {contract?.recentExecutions?.map((execution, index) => (
                        <div key={index} className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Icon name="Play" size={14} className="text-muted-foreground" />
                            <span className="text-sm text-foreground">{execution?.function}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-muted-foreground">{formatTimestamp(execution?.timestamp)}</span>
                            <div className={`w-2 h-2 rounded-full ${
                              execution?.status === 'success' ? 'bg-success' : 'bg-error'
                            }`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" iconName="Play" iconPosition="left">
                      Execute
                    </Button>
                    <Button variant="ghost" size="sm" iconName="Eye" iconPosition="left">
                      View Details
                    </Button>
                    <Button variant="ghost" size="sm" iconName="Code" iconPosition="left">
                      View Code
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SmartContractPanel;