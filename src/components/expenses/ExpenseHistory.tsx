
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, Edit, Trash2 } from "lucide-react";

interface Currency {
  code: string;
  symbol: string;
  name: string;
}

interface Office {
  id: string;
  name: string;
  currency: string;
}

interface ExpenseHistoryProps {
  expenses: any[];
  baseCurrency: string;
  currencies: Currency[];
  offices: Office[];
}

export function ExpenseHistory({ expenses, baseCurrency, currencies, offices }: ExpenseHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterOffice, setFilterOffice] = useState('all');
  const [filterPaymentMethod, setFilterPaymentMethod] = useState('all');
  
  const expenseCategories = [
    { value: 'all', label: 'All Categories' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'office', label: 'Office Supplies' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'staff', label: 'Staff' },
    { value: 'rent', label: 'Rent' },
    { value: 'travel', label: 'Travel' },
    { value: 'software', label: 'Software' },
    { value: 'other', label: 'Other' }
  ];
  
  const paymentMethods = [
    { value: 'all', label: 'All Payment Methods' },
    { value: 'cash', label: 'Cash' },
    { value: 'bank', label: 'Bank Transfer' },
    { value: 'credit', label: 'Credit Card' },
    { value: 'upi', label: 'UPI/Mobile Payment' }
  ];
  
  const officeOptions = [
    { id: 'all', name: 'All Offices' },
    ...offices
  ];

  // Filter expenses based on search and filters
  const filteredExpenses = expenses.filter(expense => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = filterCategory === 'all' || 
      expense.category.toLowerCase() === filterCategory;
    
    // Office filter
    const matchesOffice = filterOffice === 'all' || 
      expense.office === offices.find(o => o.id === filterOffice)?.name;
    
    // Payment method filter
    const matchesPaymentMethod = filterPaymentMethod === 'all' || 
      expense.paymentMethod === filterPaymentMethod;
    
    return matchesSearch && matchesCategory && matchesOffice && matchesPaymentMethod;
  });
  
  // Format currency
  const formatCurrency = (amount: number, currencyCode: string) => {
    const currencySymbol = currencies.find(c => c.code === currencyCode)?.symbol || '';
    return `${currencySymbol}${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  return (
    <Card>
      <CardHeader className="px-6 py-4 border-b border-gray-200">
        <CardTitle className="text-lg font-medium text-gray-800">Expense History</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {expenseCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={filterOffice} onValueChange={setFilterOffice}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Office" />
              </SelectTrigger>
              <SelectContent>
                {officeOptions.map((office) => (
                  <SelectItem key={office.id} value={office.id}>
                    {office.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={filterPaymentMethod} onValueChange={setFilterPaymentMethod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Expenses Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden md:table-cell">Office</TableHead>
                <TableHead className="hidden md:table-cell">Payment Method</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>{formatCurrency(expense.amount, expense.currency)}</TableCell>
                    <TableCell className="hidden md:table-cell">{expense.office}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {paymentMethods.find(m => m.value === expense.paymentMethod)?.label}
                    </TableCell>
                    <TableCell className="hidden md:table-cell max-w-xs truncate">
                      {expense.description}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No expenses found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Summary */}
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {filteredExpenses.length} of {expenses.length} expenses
          </div>
          <div className="text-sm font-medium">
            Total: {formatCurrency(
              filteredExpenses.reduce((sum, expense) => sum + expense.amount * expense.exchangeRate, 0),
              baseCurrency
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
