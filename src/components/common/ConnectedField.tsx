import React, { useState, useEffect } from 'react';
import { useFinancialData } from '../../contexts/FinancialDataContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';

interface ConnectedFieldProps {
  fieldName: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options?: {value: string, label: string}[];
  type?: 'select' | 'input' | 'date';
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  required?: boolean;
}

export function ConnectedField({
  fieldName,
  label,
  value,
  onChange,
  options,
  type = 'input',
  disabled = false,
  className = '',
  placeholder = '',
  required = false
}: ConnectedFieldProps) {
  const { getFieldConnections } = useFinancialData();
  const [connectedFields, setConnectedFields] = useState<string[]>([]);
  
  useEffect(() => {
    // Get connections for this field
    const connections = getFieldConnections(fieldName);
    setConnectedFields(connections);
  }, [fieldName, getFieldConnections]);
  
  // Show visual indicator if field has connections
  const hasConnections = connectedFields.length > 0;
  
  const renderField = () => {
    switch (type) {
      case 'select':
        return (
          <Select 
            value={value} 
            onValueChange={onChange}
            disabled={disabled}
          >
            <SelectTrigger className={className}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'date':
        return (
          <Input
            type="date"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={className}
            disabled={disabled}
            placeholder={placeholder}
            required={required}
          />
        );
      default:
        return (
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={className}
            disabled={disabled}
            placeholder={placeholder}
            required={required}
          />
        );
    }
  };
  
  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <Label htmlFor={fieldName} className="mr-2">{label}</Label>
        {hasConnections && (
          <Popover>
            <PopoverTrigger>
              <Badge variant="outline" className="ml-2 cursor-help">
                <Info className="h-3 w-3 mr-1" /> Connected
              </Badge>
            </PopoverTrigger>
            <PopoverContent>
              <div className="p-2">
                <h4 className="font-medium mb-2">Connected Fields</h4>
                <ul className="list-disc list-inside text-sm">
                  {connectedFields.map((field, index) => (
                    <li key={index}>{field}</li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-2">
                  Changes to this field may affect or be affected by the connected fields.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
      {renderField()}
    </div>
  );
}
