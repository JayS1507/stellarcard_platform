import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CreationWizard = ({ currentStep, onStepChange, className = '' }) => {
  const steps = [
    {
      id: 1,
      title: 'Design',
      description: 'Card appearance and basic info',
      icon: 'Palette',
      status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'active' : 'pending'
    },
    {
      id: 2,
      title: 'Smart Contract',
      description: 'Configure contract parameters',
      icon: 'Code',
      status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'active' : 'pending'
    },
    {
      id: 3,
      title: 'Deployment',
      description: 'Deploy to Stellar network',
      icon: 'Rocket',
      status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'active' : 'pending'
    },
    {
      id: 4,
      title: 'Complete',
      description: 'Card ready to use',
      icon: 'CheckCircle',
      status: currentStep > 4 ? 'completed' : currentStep === 4 ? 'active' : 'pending'
    }
  ];

  const getStepStyles = (status) => {
    switch (status) {
      case 'completed':
        return {
          circle: 'bg-success text-success-foreground border-success',
          text: 'text-success',
          line: 'bg-success'
        };
      case 'active':
        return {
          circle: 'bg-primary text-primary-foreground border-primary',
          text: 'text-primary',
          line: 'bg-border'
        };
      case 'pending':
      default:
        return {
          circle: 'bg-muted text-muted-foreground border-border',
          text: 'text-muted-foreground',
          line: 'bg-border'
        };
    }
  };

  const handleStepClick = (stepId) => {
    if (stepId <= currentStep || steps?.[stepId - 1]?.status === 'completed') {
      onStepChange(stepId);
    }
  };

  const handleNext = () => {
    if (currentStep < steps?.length) {
      onStepChange(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      onStepChange(currentStep - 1);
    }
  };

  return (
    <div className={`bg-card rounded-xl p-6 border border-border ${className}`}>
      {/* Progress Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Create New Card</h2>
        <div className="text-sm text-muted-foreground">
          Step {currentStep} of {steps?.length}
        </div>
      </div>
      {/* Desktop Progress Steps */}
      <div className="hidden md:block mb-8">
        <div className="flex items-center justify-between">
          {steps?.map((step, index) => {
            const styles = getStepStyles(step?.status);
            const isLast = index === steps?.length - 1;
            
            return (
              <div key={step?.id} className="flex items-center flex-1">
                {/* Step Circle */}
                <button
                  onClick={() => handleStepClick(step?.id)}
                  className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${styles?.circle} ${
                    step?.status === 'pending' && step?.id > currentStep ?'cursor-not-allowed' :'cursor-pointer hover:scale-105'
                  }`}
                  disabled={step?.status === 'pending' && step?.id > currentStep}
                >
                  {step?.status === 'completed' ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step?.icon} size={16} />
                  )}
                </button>
                {/* Step Info */}
                <div className="ml-3 flex-1">
                  <p className={`text-sm font-medium ${styles?.text}`}>
                    {step?.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {step?.description}
                  </p>
                </div>
                {/* Connection Line */}
                {!isLast && (
                  <div className={`flex-1 h-0.5 mx-4 ${styles?.line}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Mobile Progress Steps */}
      <div className="md:hidden mb-6">
        <div className="flex items-center space-x-2 mb-4">
          {steps?.map((step) => {
            const styles = getStepStyles(step?.status);
            return (
              <button
                key={step?.id}
                onClick={() => handleStepClick(step?.id)}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${styles?.circle} ${
                  step?.status === 'pending' && step?.id > currentStep ?'cursor-not-allowed' :'cursor-pointer'
                }`}
                disabled={step?.status === 'pending' && step?.id > currentStep}
              >
                {step?.status === 'completed' ? (
                  <Icon name="Check" size={12} />
                ) : (
                  <span className="text-xs font-medium">{step?.id}</span>
                )}
              </button>
            );
          })}
        </div>
        
        {/* Current Step Info */}
        <div className="text-center">
          <h3 className="font-medium text-foreground">{steps?.[currentStep - 1]?.title}</h3>
          <p className="text-sm text-muted-foreground">{steps?.[currentStep - 1]?.description}</p>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{Math.round((currentStep / steps?.length) * 100)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / steps?.length) * 100}%` }}
          />
        </div>
      </div>
      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          iconName="ChevronLeft"
          iconPosition="left"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          Previous
        </Button>

        <div className="flex space-x-2">
          <Button
            variant="ghost"
            iconName="Save"
            iconPosition="left"
          >
            Save Draft
          </Button>
          
          <Button
            variant="default"
            iconName={currentStep === steps?.length ? "CheckCircle" : "ChevronRight"}
            iconPosition="right"
            onClick={handleNext}
            disabled={currentStep === steps?.length}
          >
            {currentStep === steps?.length ? 'Complete' : 'Next'}
          </Button>
        </div>
      </div>
      {/* Step Indicators for Screen Readers */}
      <div className="sr-only">
        Current step: {currentStep} of {steps?.length}. 
        {steps?.[currentStep - 1]?.title}: {steps?.[currentStep - 1]?.description}
      </div>
    </div>
  );
};

export default CreationWizard;