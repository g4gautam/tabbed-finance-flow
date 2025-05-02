
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/expenses/DatePicker";
import { ExpenseForm } from "@/components/expenses/ExpenseForm";
import { ExpenseDashboard } from "@/components/expenses/ExpenseDashboard";
import { ExpenseHistory } from "@/components/expenses/ExpenseHistory";
import { FixedExpenses } from "@/components/expenses/FixedExpenses";
import { ExchangeRateModal } from "@/components/expenses/ExchangeRateModal";
import {
  BarChart2, Download, Filter, RefreshCw, Save, Settings, PlusCircle, Calendar, DollarSign
} from "lucide-react";

// Mock data for the expenses management system
import { mockExpenseData } from "@/data/mockExpenseData";

const Expenses = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [baseCurrency, setBaseCurrency] = useState("EUR");
  const [isExchangeRateModalOpen, setIsExchangeRateModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState("This Month");
  const [filterByOffice, setFilterByOffice] = useState("all");

  const currencies = [
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "GBP", symbol: "£", name: "British Pound" },
  ];
  
  const offices = [
    { id: "italy", name: "Italy", currency: "EUR" },
    { id: "india", name: "India", currency: "INR" },
    { id: "usa", name: "USA", currency: "USD" },
    { id: "uk", name: "UK", currency: "GBP" },
  ];

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Multi-Currency Expense Management</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 mr-4">
              <span className="text-sm font-medium">Base Currency:</span>
              <Select
                value={baseCurrency}
                onValueChange={setBaseCurrency}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setIsExchangeRateModalOpen(true)}
            >
              <Settings className="h-4 w-4" /> Exchange Rates
            </Button>
            
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {dateRange}
            </Button>
            
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
            
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" /> Export
            </Button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mb-6">
          <Tabs defaultValue="dashboard" onValueChange={(value) => setActiveTab(value)}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="expenses">Add Expenses</TabsTrigger>
              <TabsTrigger value="history">Expense History</TabsTrigger>
              <TabsTrigger value="fixed">Fixed Expenses</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <ExpenseDashboard 
                expenseData={mockExpenseData}
                baseCurrency={baseCurrency}
                currencies={currencies}
                offices={offices}
              />
            </TabsContent>
            
            <TabsContent value="expenses">
              <ExpenseForm 
                currencies={currencies}
                offices={offices}
              />
            </TabsContent>
            
            <TabsContent value="history">
              <ExpenseHistory 
                expenses={mockExpenseData.expenses}
                baseCurrency={baseCurrency}
                currencies={currencies}
                offices={offices}
              />
            </TabsContent>
            
            <TabsContent value="fixed">
              <FixedExpenses 
                fixedExpenses={mockExpenseData.fixedExpenses}
                baseCurrency={baseCurrency}
                currencies={currencies}
                offices={offices}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Exchange Rate Modal */}
      <ExchangeRateModal 
        isOpen={isExchangeRateModalOpen}
        onClose={() => setIsExchangeRateModalOpen(false)}
        currencies={currencies}
        exchangeRates={mockExpenseData.exchangeRates}
      />
    </div>
  );
};

export default Expenses;
