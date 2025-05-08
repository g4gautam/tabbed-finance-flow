
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataFlowDiagram } from './DataFlowDiagram';
import { ConnectedExpenseForm } from '../expenses/ConnectedExpenseForm';
import { FinancialDataProvider } from '../../contexts/FinancialDataContext';

export function DataConnectionsDemo({ mockData }: { mockData: any }) {
  return (
    <FinancialDataProvider mockData={mockData}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Data Connection Manager</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This demonstrates how data fields are interconnected across the system. 
              Changes in one part of the application affect related fields elsewhere.
            </p>
            
            <Tabs defaultValue="diagram">
              <TabsList className="mb-4">
                <TabsTrigger value="diagram">Data Flow Diagram</TabsTrigger>
                <TabsTrigger value="demo">Connected Fields Demo</TabsTrigger>
              </TabsList>
              
              <TabsContent value="diagram">
                <DataFlowDiagram />
              </TabsContent>
              
              <TabsContent value="demo">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Try changing the Currency and notice how the Office field updates automatically.
                    This demonstrates how connected fields work together.
                  </p>
                  <ConnectedExpenseForm />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </FinancialDataProvider>
  );
}
