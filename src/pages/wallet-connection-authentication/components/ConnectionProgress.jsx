import React from 'react';
import Icon from '../../../components/AppIcon';

const ConnectionProgress = ({ 
  currentStep, 
  steps, 
  isConnecting,
  className = '' 
}) => {
  return (
    <div className={`bg-card border border-border rounded-xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Connection Progress</h3>
        {isConnecting && (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-muted-foreground">Connecting...</span>
          </div>
        )}
      </div>
      <div className="space-y-4">
        {steps?.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isPending = index > currentStep;

          return (
            <div key={step?.id} className="flex items-start space-x-3">
              {/* Step Icon */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                isCompleted 
                  ? 'bg-success border-success text-white' 
                  : isActive 
                    ? 'bg-primary border-primary text-white' :'bg-muted border-border text-muted-foreground'
              }`}>
                {isCompleted ? (
                  <Icon name="Check" size={16} />
                ) : isActive ? (
                  <div className="w-2 h-2 bg-white rounded-full pulse-gentle" />
                ) : (
                  <span className="text-xs font-medium">{index + 1}</span>
                )}
              </div>
              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-medium ${
                  isCompleted || isActive ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step?.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {step?.description}
                </p>
                
                {isActive && step?.action && (
                  <div className="mt-2 text-xs text-primary">
                    {step?.action}
                  </div>
                )}
              </div>
              {/* Connection Line */}
              {index < steps?.length - 1 && (
                <div className={`absolute left-7 mt-8 w-0.5 h-6 ${
                  isCompleted ? 'bg-success' : 'bg-border'
                }`} style={{ marginLeft: '1.75rem' }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConnectionProgress;