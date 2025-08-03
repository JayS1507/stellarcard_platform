import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MyListingsSection = ({ onEditListing, onCancelListing, onCreateListing }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingListing, setEditingListing] = useState(null);

  const myListings = [
    {
      id: 'listing_001',
      cardName: 'Premium DeFi Card',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
      currentPrice: 245.50,
      originalPrice: 200.00,
      quantity: 3,
      totalValue: 736.50,
      views: 127,
      favorites: 23,
      offers: 5,
      highestOffer: 230.00,
      status: 'active',
      listedDate: new Date('2025-07-28T10:00:00'),
      expiryDate: new Date('2025-08-28T10:00:00'),
      category: 'DeFi'
    },
    {
      id: 'listing_002',
      cardName: 'Rare NFT Collectible',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop',
      currentPrice: 89.99,
      originalPrice: 75.00,
      quantity: 1,
      totalValue: 89.99,
      views: 89,
      favorites: 12,
      offers: 2,
      highestOffer: 85.00,
      status: 'pending',
      listedDate: new Date('2025-07-30T14:30:00'),
      expiryDate: new Date('2025-08-30T14:30:00'),
      category: 'NFT'
    },
    {
      id: 'listing_003',
      cardName: 'Governance Token Set',
      image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop',
      currentPrice: 156.75,
      originalPrice: 180.00,
      quantity: 2,
      totalValue: 313.50,
      views: 203,
      favorites: 45,
      offers: 8,
      highestOffer: 150.00,
      status: 'sold',
      listedDate: new Date('2025-07-25T09:15:00'),
      expiryDate: new Date('2025-08-25T09:15:00'),
      category: 'Governance'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'sold':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'expired':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })?.format(date);
  };

  const getDaysRemaining = (expiryDate) => {
    const now = new Date();
    const diffTime = expiryDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleEditClick = (listing) => {
    setEditingListing(listing);
  };

  const handleSaveEdit = () => {
    onEditListing(editingListing);
    setEditingListing(null);
  };

  const CreateListingForm = () => (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Create New Listing</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Card Name"
          placeholder="Enter card name"
        />
        <Input
          label="Price (XLM)"
          type="number"
          placeholder="0.00"
        />
        <Input
          label="Quantity"
          type="number"
          placeholder="1"
        />
        <Input
          label="Category"
          placeholder="e.g., DeFi, NFT, Utility"
        />
        <div className="md:col-span-2">
          <Input
            label="Description"
            placeholder="Describe your card..."
          />
        </div>
      </div>
      <div className="flex space-x-3 mt-6">
        <Button
          variant="default"
          onClick={() => {
            onCreateListing();
            setShowCreateForm(false);
          }}
          iconName="Plus"
          iconPosition="left"
        >
          Create Listing
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowCreateForm(false)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">My Listings</h2>
          <p className="text-muted-foreground">Manage your marketplace listings</p>
        </div>
        <Button
          variant="default"
          onClick={() => setShowCreateForm(!showCreateForm)}
          iconName="Plus"
          iconPosition="left"
        >
          New Listing
        </Button>
      </div>
      {/* Create Listing Form */}
      {showCreateForm && <CreateListingForm />}
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground">
            {myListings?.filter(l => l?.status === 'active')?.length}
          </div>
          <div className="text-sm text-muted-foreground">Active</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-success">
            {myListings?.filter(l => l?.status === 'sold')?.length}
          </div>
          <div className="text-sm text-muted-foreground">Sold</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {formatCurrency(myListings?.reduce((sum, l) => sum + l?.totalValue, 0))} XLM
          </div>
          <div className="text-sm text-muted-foreground">Total Value</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-warning">
            {myListings?.reduce((sum, l) => sum + l?.offers, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Offers</div>
        </div>
      </div>
      {/* Listings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {myListings?.map((listing) => (
          <div
            key={listing?.id}
            className="bg-card border border-border rounded-lg overflow-hidden hover-lift transition-all duration-200"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={listing?.image}
                alt={listing?.cardName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-md border ${getStatusBadge(listing?.status)}`}>
                  {listing?.status}
                </span>
              </div>
              {listing?.status === 'active' && getDaysRemaining(listing?.expiryDate) <= 7 && (
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-warning text-warning-foreground text-xs font-medium rounded-md">
                    {getDaysRemaining(listing?.expiryDate)}d left
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                    {listing?.cardName}
                  </h3>
                  <p className="text-sm text-muted-foreground">{listing?.category}</p>
                </div>
                <div className="text-right ml-2">
                  <div className="text-lg font-bold text-foreground">
                    {formatCurrency(listing?.currentPrice)} XLM
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Qty: {listing?.quantity}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center p-2 bg-muted rounded-md">
                  <div className="flex items-center justify-center space-x-1">
                    <Icon name="Eye" size={12} className="text-muted-foreground" />
                    <span className="text-xs font-medium">{listing?.views}</span>
                  </div>
                </div>
                <div className="text-center p-2 bg-muted rounded-md">
                  <div className="flex items-center justify-center space-x-1">
                    <Icon name="Heart" size={12} className="text-muted-foreground" />
                    <span className="text-xs font-medium">{listing?.favorites}</span>
                  </div>
                </div>
                <div className="text-center p-2 bg-muted rounded-md">
                  <div className="flex items-center justify-center space-x-1">
                    <Icon name="MessageSquare" size={12} className="text-muted-foreground" />
                    <span className="text-xs font-medium">{listing?.offers}</span>
                  </div>
                </div>
              </div>

              {/* Offers */}
              {listing?.offers > 0 && (
                <div className="mb-4 p-3 bg-accent/10 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Highest Offer:</span>
                    <span className="text-sm font-semibold text-accent">
                      {formatCurrency(listing?.highestOffer)} XLM
                    </span>
                  </div>
                </div>
              )}

              {/* Dates */}
              <div className="text-xs text-muted-foreground mb-4 space-y-1">
                <div>Listed: {formatDate(listing?.listedDate)}</div>
                <div>Expires: {formatDate(listing?.expiryDate)}</div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                {listing?.status === 'active' && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(listing)}
                      iconName="Edit"
                      iconPosition="left"
                      fullWidth
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onCancelListing(listing)}
                      iconName="X"
                      iconPosition="left"
                      fullWidth
                    >
                      Cancel
                    </Button>
                  </>
                )}
                {listing?.status === 'sold' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled
                    iconName="Check"
                    iconPosition="left"
                    fullWidth
                  >
                    Sold
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Edit Modal */}
      {editingListing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-foreground mb-4">Edit Listing</h3>
            <div className="space-y-4">
              <Input
                label="Price (XLM)"
                type="number"
                value={editingListing?.currentPrice}
                onChange={(e) => setEditingListing(prev => ({
                  ...prev,
                  currentPrice: parseFloat(e?.target?.value)
                }))}
              />
              <Input
                label="Quantity"
                type="number"
                value={editingListing?.quantity}
                onChange={(e) => setEditingListing(prev => ({
                  ...prev,
                  quantity: parseInt(e?.target?.value)
                }))}
              />
            </div>
            <div className="flex space-x-3 mt-6">
              <Button
                variant="default"
                onClick={handleSaveEdit}
                iconName="Save"
                iconPosition="left"
                fullWidth
              >
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={() => setEditingListing(null)}
                fullWidth
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListingsSection;