import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const ExistingCardsGrid = ({ className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('created');

  const mockCards = [
    {
      id: 'card-001',
      name: 'Personal Spending Card',
      type: 'standard',
      status: 'active',
      balance: '1,250.50',
      assetCode: 'XLM',
      createdDate: '2025-01-15',
      lastUsed: '2025-01-30',
      contractAddress: 'GCXYZ...ABC123',
      dailyLimit: '500',
      monthlySpent: '1,200'
    },
    {
      id: 'card-002',
      name: 'Business Expense Card',
      type: 'business',
      status: 'active',
      balance: '5,750.00',
      assetCode: 'USDC',
      createdDate: '2025-01-10',
      lastUsed: '2025-02-01',
      contractAddress: 'GDABC...XYZ789',
      dailyLimit: '2,000',
      monthlySpent: '8,500'
    },
    {
      id: 'card-003',
      name: 'Savings Card',
      type: 'premium',
      status: 'frozen',
      balance: '10,000.00',
      assetCode: 'XLM',
      createdDate: '2024-12-20',
      lastUsed: '2025-01-25',
      contractAddress: 'GDEFG...MNO456',
      dailyLimit: '1,000',
      monthlySpent: '0'
    },
    {
      id: 'card-004',
      name: 'Travel Card',
      type: 'standard',
      status: 'pending',
      balance: '0.00',
      assetCode: 'EURC',
      createdDate: '2025-02-01',
      lastUsed: 'Never',
      contractAddress: 'Deploying...',
      dailyLimit: '300',
      monthlySpent: '0'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'frozen', label: 'Frozen' },
    { value: 'pending', label: 'Pending' }
  ];

  const sortOptions = [
    { value: 'created', label: 'Date Created' },
    { value: 'name', label: 'Card Name' },
    { value: 'balance', label: 'Balance' },
    { value: 'lastUsed', label: 'Last Used' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10 border-success/20';
      case 'frozen':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'pending':
        return 'text-accent bg-accent/10 border-accent/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getCardTypeIcon = (type) => {
    switch (type) {
      case 'premium':
        return 'Crown';
      case 'business':
        return 'Building';
      case 'standard':
      default:
        return 'CreditCard';
    }
  };

  const getCardTypeColor = (type) => {
    switch (type) {
      case 'premium':
        return 'bg-gradient-to-br from-yellow-400 to-yellow-600';
      case 'business':
        return 'bg-gradient-to-br from-gray-700 to-gray-900';
      case 'standard':
      default:
        return 'bg-gradient-to-br from-primary to-secondary';
    }
  };

  const filteredCards = mockCards?.filter(card => {
    const matchesSearch = card?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = filterStatus === 'all' || card?.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCardAction = (cardId, action) => {
    console.log(`${action} action for card ${cardId}`);
  };

  return (
    <div className={`bg-card rounded-xl p-6 border border-border ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center mb-4 sm:mb-0">
          <Icon name="Layers" size={20} className="mr-2" />
          My Cards ({filteredCards?.length})
        </h3>
        
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Create New Card
        </Button>
      </div>
      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input
          type="search"
          placeholder="Search cards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
        />
        
        <Select
          options={statusOptions}
          value={filterStatus}
          onChange={setFilterStatus}
          placeholder="Filter by status"
        />
        
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
          placeholder="Sort by"
        />
      </div>
      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCards?.map((card) => (
          <div key={card?.id} className="border border-border rounded-xl overflow-hidden hover-lift">
            {/* Card Visual */}
            <div className={`h-32 p-4 text-white relative ${getCardTypeColor(card?.type)}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm opacity-80">StellarCard</p>
                  <p className="text-xs opacity-60">{card?.type?.toUpperCase()}</p>
                </div>
                <Icon name={getCardTypeIcon(card?.type)} size={20} />
              </div>
              
              <div className="absolute bottom-4 left-4">
                <p className="text-lg font-bold">{card?.balance} {card?.assetCode}</p>
              </div>

              {/* Status Badge */}
              <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(card?.status)}`}>
                {card?.status?.charAt(0)?.toUpperCase() + card?.status?.slice(1)}
              </div>
            </div>

            {/* Card Details */}
            <div className="p-4">
              <h4 className="font-semibold text-foreground mb-2">{card?.name}</h4>
              
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex justify-between">
                  <span>Daily Limit:</span>
                  <span className="font-medium">{card?.dailyLimit} {card?.assetCode}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Spent:</span>
                  <span className="font-medium">{card?.monthlySpent} {card?.assetCode}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Used:</span>
                  <span className="font-medium">{card?.lastUsed}</span>
                </div>
                <div className="flex justify-between">
                  <span>Contract:</span>
                  <span className="font-mono text-xs">{card?.contractAddress}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                {card?.status === 'active' && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Pause"
                      onClick={() => handleCardAction(card?.id, 'freeze')}
                    >
                      Freeze
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Send"
                      onClick={() => handleCardAction(card?.id, 'transfer')}
                    >
                      Transfer
                    </Button>
                  </>
                )}
                
                {card?.status === 'frozen' && (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Play"
                    onClick={() => handleCardAction(card?.id, 'unfreeze')}
                  >
                    Unfreeze
                  </Button>
                )}
                
                {card?.status === 'pending' && (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Clock"
                    disabled
                  >
                    Deploying
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Settings"
                  onClick={() => handleCardAction(card?.id, 'settings')}
                >
                  Settings
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {filteredCards?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="CreditCard" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No cards found</h4>
          <p className="text-muted-foreground mb-4">
            {searchTerm || filterStatus !== 'all' ?'Try adjusting your search or filters' :'Create your first blockchain card to get started'
            }
          </p>
          {!searchTerm && filterStatus === 'all' && (
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Create Your First Card
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ExistingCardsGrid;