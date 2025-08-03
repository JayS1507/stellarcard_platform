import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = ({ activities }) => {
  const [filter, setFilter] = useState('all');

  const getActivityIcon = (type) => {
    switch (type) {
      case 'card_created':
        return 'CreditCard';
      case 'contract_deployed':
        return 'Code';
      case 'asset_transfer':
        return 'Send';
      case 'contract_executed':
        return 'Play';
      case 'card_traded':
        return 'ArrowUpDown';
      case 'rewards_earned':
        return 'Gift';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'card_created':
        return 'text-primary bg-primary/10';
      case 'contract_deployed':
        return 'text-accent bg-accent/10';
      case 'asset_transfer':
        return 'text-secondary bg-secondary/10';
      case 'contract_executed':
        return 'text-success bg-success/10';
      case 'card_traded':
        return 'text-warning bg-warning/10';
      case 'rewards_earned':
        return 'text-success bg-success/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'failed':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return activityTime?.toLocaleDateString();
  };

  const formatAmount = (amount, currency) => {
    if (!amount) return '';
    return `${amount?.toLocaleString()} ${currency}`;
  };

  const filterOptions = [
    { value: 'all', label: 'All Activities' },
    { value: 'card_created', label: 'Card Created' },
    { value: 'contract_deployed', label: 'Contracts' },
    { value: 'asset_transfer', label: 'Transfers' },
    { value: 'card_traded', label: 'Trading' }
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities?.filter(activity => activity?.type === filter);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Link to="/transaction-history-analytics">
          <Button variant="ghost" size="sm" iconName="ExternalLink" iconPosition="right">
            View All
          </Button>
        </Link>
      </div>
      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg overflow-x-auto">
        {filterOptions?.map((option) => (
          <button
            key={option?.value}
            onClick={() => setFilter(option?.value)}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap ${
              filter === option?.value
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {option?.label}
          </button>
        ))}
      </div>
      {/* Activity List */}
      <div className="space-y-3">
        {filteredActivities?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">No Activities Found</h4>
            <p className="text-muted-foreground">
              {filter === 'all' ? 'No recent activities to display' : `No ${filterOptions?.find(opt => opt?.value === filter)?.label?.toLowerCase()} activities`}
            </p>
          </div>
        ) : (
          filteredActivities?.slice(0, 8)?.map((activity) => (
            <div
              key={activity?.id}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-150"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={18} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {activity?.title}
                  </p>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(activity?.status)}`} />
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {activity?.description}
                </p>
              </div>

              <div className="text-right">
                {activity?.amount && (
                  <p className="text-sm font-medium text-foreground">
                    {formatAmount(activity?.amount, activity?.currency)}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  {formatTimestamp(activity?.timestamp)}
                </p>
              </div>

              <button className="p-1 rounded-md hover:bg-muted transition-colors duration-150">
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </button>
            </div>
          ))
        )}
      </div>
      {filteredActivities?.length > 8 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Link to="/transaction-history-analytics">
            <Button variant="outline" fullWidth iconName="ArrowRight" iconPosition="right">
              View All {filteredActivities?.length} Activities
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;