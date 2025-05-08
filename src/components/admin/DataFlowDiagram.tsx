
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFinancialData } from '../../contexts/FinancialDataContext';

export function DataFlowDiagram() {
  // This is a placeholder for a real data flow visualization component
  // In a production app, you'd use a library like react-flow or mermaid.js
  // to create a proper data flow diagram
  
  const { getFieldConnections } = useFinancialData();
  
  // Define the main entities in our system
  const entities = [
    { id: 'expenses', name: 'Expenses', fields: ['date', 'category', 'amount', 'currency', 'office'] },
    { id: 'ledger', name: 'Ledger', fields: ['accounts', 'journal entries', 'reconciliation'] },
    { id: 'analytics', name: 'Analytics', fields: ['revenue categories', 'customer segments', 'projections'] },
    { id: 'currencies', name: 'Currencies', fields: ['code', 'symbol', 'exchange rates'] },
    { id: 'offices', name: 'Offices', fields: ['name', 'local currency', 'location'] }
  ];
  
  // Get all connections
  const connectionMap = new Map<string, string[]>();
  entities.forEach(entity => {
    entity.fields.forEach(field => {
      const fullFieldName = `${entity.id}.${field}`;
      const connections = getFieldConnections(fullFieldName);
      connectionMap.set(fullFieldName, connections);
    });
  });
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Flow Relationships</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-4 rounded-md text-sm">
          <p className="mb-4 text-muted-foreground">
            This is a simplified representation of data flows between system entities.
            In a production app, this would be an interactive diagram.
          </p>
          
          <div className="grid grid-cols-3 gap-4">
            {entities.map(entity => (
              <div key={entity.id} className="border rounded-md p-3">
                <h3 className="font-medium mb-2">{entity.name}</h3>
                <ul className="space-y-1">
                  {entity.fields.map(field => {
                    const fullFieldName = `${entity.id}.${field}`;
                    const connections = connectionMap.get(fullFieldName) || [];
                    return (
                      <li key={field} className="flex justify-between">
                        <span>{field}</span>
                        {connections.length > 0 && (
                          <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2">
                            {connections.length} connection{connections.length !== 1 ? 's' : ''}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center text-muted-foreground">
            <p>Connections are established through shared keys, references, and calculated fields.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
