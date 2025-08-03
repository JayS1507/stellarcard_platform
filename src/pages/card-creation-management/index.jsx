import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import NetworkStatusBanner from '../../components/ui/NetworkStatusBanner';
import WalletStatusIndicator from '../../components/ui/WalletStatusIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import page components
import CreationWizard from './components/CreationWizard';
import CardPreview from './components/CardPreview';
import CardDesignForm from './components/CardDesignForm';
import SmartContractConfig from './components/SmartContractConfig';
import DeploymentSettings from './components/DeploymentSettings';
import ExistingCardsGrid from './components/ExistingCardsGrid';

const CardCreationManagement = () => {
  const navigate = useNavigate();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState('create');
  const [isDeploymentComplete, setIsDeploymentComplete] = useState(false);

  // Form data states
  const [cardData, setCardData] = useState({
    cardName: '',
    cardType: 'standard',
    backgroundColor: '#1B365D',
    textColor: '#FFFFFF',
    balance: '',
    assetCode: 'XLM',
    cardNumber: '****-****-****-1234',
    expiryDate: '12/28',
    holderName: ''
  });

  const [contractData, setContractData] = useState({
    network: 'testnet',
    template: 'basic',
    dailyLimit: '',
    transactionLimit: '',
    velocityChecks: false,
    multisigEnabled: false,
    requiredSignatures: '',
    totalSigners: '',
    stakingEnabled: false,
    apyRate: '',
    minimumStake: '',
    gasLimit: '',
    upgradeEnabled: false,
    pauseEnabled: false
  });

  const [deploymentData, setDeploymentData] = useState({
    priority: 'medium',
    contractName: '',
    autoInitialize: true,
    verifyContract: false,
    enableMonitoring: true,
    backupConfig: true
  });

  useEffect(() => {
    const checkWalletConnection = () => {
      const connected = localStorage.getItem('walletConnected') === 'true';
      setIsWalletConnected(connected);
      
      if (!connected) {
        navigate('/wallet-connection-authentication');
      }
    };

    checkWalletConnection();
    window.addEventListener('storage', checkWalletConnection);
    return () => window.removeEventListener('storage', checkWalletConnection);
  }, [navigate]);

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  const handleDeploy = async (deploymentConfig) => {
    // Simulate deployment process
    console.log('Deploying contract with config:', deploymentConfig);
    
    // Simulate deployment delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsDeploymentComplete(true);
    setCurrentStep(4);
    
    // Show success message or redirect
    return { success: true, contractAddress: 'GCXYZ...ABC123' };
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CardDesignForm 
              cardData={cardData} 
              onUpdate={setCardData}
            />
            <CardPreview 
              cardData={cardData}
            />
          </div>
        );
      
      case 2:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SmartContractConfig 
                contractData={contractData} 
                onUpdate={setContractData}
              />
            </div>
            <CardPreview 
              cardData={cardData}
            />
          </div>
        );
      
      case 3:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <DeploymentSettings 
                deploymentData={deploymentData} 
                onUpdate={setDeploymentData}
                onDeploy={handleDeploy}
              />
            </div>
            <CardPreview 
              cardData={cardData}
            />
          </div>
        );
      
      case 4:
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Card Created Successfully!
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Your blockchain card has been deployed to the Stellar network and is ready to use.
            </p>
            <div className="bg-muted rounded-lg p-4 mb-6 max-w-md mx-auto">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contract Address:</span>
                  <span className="font-mono">GCXYZ...ABC123</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network:</span>
                  <span>{contractData?.network}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Card Name:</span>
                  <span>{cardData?.cardName}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                iconName="Eye"
                iconPosition="left"
                onClick={() => navigate('/dashboard-smart-contract-hub')}
              >
                View Dashboard
              </Button>
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={() => {
                  setCurrentStep(1);
                  setCardData({
                    cardName: '',
                    cardType: 'standard',
                    backgroundColor: '#1B365D',
                    textColor: '#FFFFFF',
                    balance: '',
                    assetCode: 'XLM',
                    cardNumber: '****-****-****-1234',
                    expiryDate: '12/28',
                    holderName: ''
                  });
                  setIsDeploymentComplete(false);
                }}
              >
                Create Another Card
              </Button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (!isWalletConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <NetworkStatusBanner />
        
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <Icon name="Wallet" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Wallet Connection Required
            </h2>
            <p className="text-muted-foreground mb-4">
              Please connect your Stellar wallet to create and manage cards.
            </p>
            <Button
              variant="default"
              iconName="Wallet"
              iconPosition="left"
              onClick={() => navigate('/wallet-connection-authentication')}
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NetworkStatusBanner />
      
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        {/* Breadcrumbs */}
        <NavigationBreadcrumbs className="mb-6" />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Card Creation & Management
            </h1>
            <p className="text-muted-foreground">
              Design, deploy, and manage your blockchain-based cards on the Stellar network
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <WalletStatusIndicator />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
              activeTab === 'create' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Plus" size={16} className="inline mr-2" />
            Create New
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
              activeTab === 'manage' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Layers" size={16} className="inline mr-2" />
            Manage Cards
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'create' ? (
          <div className="space-y-6">
            {/* Creation Wizard */}
            <CreationWizard 
              currentStep={currentStep} 
              onStepChange={handleStepChange}
            />

            {/* Step Content */}
            {renderStepContent()}
          </div>
        ) : (
          <ExistingCardsGrid />
        )}
      </div>
    </div>
  );
};

export default CardCreationManagement;