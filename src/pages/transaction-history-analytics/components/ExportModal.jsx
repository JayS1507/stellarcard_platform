import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportModal = ({ isOpen, onClose, onExport }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'csv',
    dateFrom: '',
    dateTo: '',
    includeFields: {
      timestamp: true,
      type: true,
      description: true,
      amount: true,
      counterparty: true,
      status: true,
      hash: true,
      cardName: false,
      fees: false,
      memo: false
    }
  });

  const formatOptions = [
    { value: 'csv', label: 'CSV (Excel Compatible)' },
    { value: 'json', label: 'JSON (Developer Friendly)' },
    { value: 'pdf', label: 'PDF (Report Format)' }
  ];

  const fieldOptions = [
    { key: 'timestamp', label: 'Date & Time', required: true },
    { key: 'type', label: 'Transaction Type', required: true },
    { key: 'description', label: 'Description', required: true },
    { key: 'amount', label: 'Amount', required: true },
    { key: 'counterparty', label: 'Counterparty', required: false },
    { key: 'status', label: 'Status', required: false },
    { key: 'hash', label: 'Transaction Hash', required: false },
    { key: 'cardName', label: 'Card Name', required: false },
    { key: 'fees', label: 'Network Fees', required: false },
    { key: 'memo', label: 'Memo/Notes', required: false }
  ];

  const handleFieldToggle = (fieldKey, checked) => {
    setExportConfig(prev => ({
      ...prev,
      includeFields: {
        ...prev?.includeFields,
        [fieldKey]: checked
      }
    }));
  };

  const handleExport = () => {
    onExport(exportConfig);
    onClose();
  };

  const getSelectedFieldsCount = () => {
    return Object.values(exportConfig?.includeFields)?.filter(Boolean)?.length;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-1200" onClick={onClose} />
      {/* Modal */}
      <div className="fixed inset-0 z-1300 flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Download" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Export Transactions</h3>
                <p className="text-sm text-muted-foreground">Download your transaction history</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
            />
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Format Selection */}
            <div>
              <Select
                label="Export Format"
                description="Choose the format for your exported data"
                options={formatOptions}
                value={exportConfig?.format}
                onChange={(value) => setExportConfig(prev => ({ ...prev, format: value }))}
              />
            </div>

            {/* Date Range */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-foreground">Date Range (Optional)</h4>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="date"
                  label="From"
                  value={exportConfig?.dateFrom}
                  onChange={(e) => setExportConfig(prev => ({ ...prev, dateFrom: e?.target?.value }))}
                />
                <Input
                  type="date"
                  label="To"
                  value={exportConfig?.dateTo}
                  onChange={(e) => setExportConfig(prev => ({ ...prev, dateTo: e?.target?.value }))}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Leave empty to export all transactions
              </p>
            </div>

            {/* Field Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-foreground">Include Fields</h4>
                <span className="text-xs text-muted-foreground">
                  {getSelectedFieldsCount()} of {fieldOptions?.length} selected
                </span>
              </div>
              
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {fieldOptions?.map((field) => (
                  <div key={field?.key} className="flex items-center justify-between">
                    <Checkbox
                      label={field?.label}
                      checked={exportConfig?.includeFields?.[field?.key]}
                      onChange={(e) => handleFieldToggle(field?.key, e?.target?.checked)}
                      disabled={field?.required}
                    />
                    {field?.required && (
                      <span className="text-xs text-muted-foreground">Required</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Preview Info */}
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-primary mt-0.5" />
                <div className="text-sm">
                  <p className="text-foreground font-medium mb-1">Export Preview</p>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Format: {formatOptions?.find(f => f?.value === exportConfig?.format)?.label}</li>
                    <li>• Fields: {getSelectedFieldsCount()} columns</li>
                    <li>• Date range: {exportConfig?.dateFrom && exportConfig?.dateTo ? 
                      `${exportConfig?.dateFrom} to ${exportConfig?.dateTo}` : 'All time'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleExport}
              iconName="Download"
              iconPosition="left"
              disabled={getSelectedFieldsCount() === 0}
            >
              Export Data
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExportModal;