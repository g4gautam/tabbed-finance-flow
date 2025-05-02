
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Save, X } from "lucide-react";

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

interface FixedExpense {
  officeId: string;
  name: string;
  currency: string;
  monthly: number;
  breakdown: {
    rent: number;
    salaries: number;
    utilities: number;
  }
}

interface FixedExpensesProps {
  fixedExpenses: FixedExpense[];
  baseCurrency: string;
  currencies: Currency[];
  offices: Office[];
}

export function FixedExpenses({ fixedExpenses, baseCurrency, currencies, offices }: FixedExpensesProps) {
  const [editing, setEditing] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ rent: string; salaries: string; utilities: string }>({
    rent: "",
    salaries: "",
    utilities: ""
  });

  // Format currency
  const formatCurrency = (amount: number, currencyCode: string) => {
    const currencySymbol = currencies.find(c => c.code === currencyCode)?.symbol || '';
    return `${currencySymbol}${amount.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
  };

  // Start editing an office's expenses
  const handleStartEdit = (office: FixedExpense) => {
    setEditing(office.officeId);
    setEditValues({
      rent: office.breakdown.rent.toString(),
      salaries: office.breakdown.salaries.toString(),
      utilities: office.breakdown.utilities.toString()
    });
  };

  // Save edited values
  const handleSave = (officeId: string) => {
    console.log('Saving fixed expenses for', officeId, editValues);
    // In a real app, you would update state or call an API here
    setEditing(null);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditing(null);
  };

  // Calculate total monthly fixed expenses in base currency
  const totalFixedExpenses = fixedExpenses.reduce((sum, expense) => {
    const exchangeRate = 1; // In a real app, get this from your exchange rate data
    return sum + expense.monthly * exchangeRate;
  }, 0);

  return (
    <Card>
      <CardHeader className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium text-gray-800">Fixed Monthly Expenses</CardTitle>
          <div className="text-sm font-medium text-gray-600">
            Total: {formatCurrency(totalFixedExpenses, baseCurrency)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Office</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Rent</TableHead>
                <TableHead>Salaries</TableHead>
                <TableHead>Utilities</TableHead>
                <TableHead>Monthly Total</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fixedExpenses.map((expense) => (
                <TableRow key={expense.officeId}>
                  <TableCell className="font-medium">{expense.name}</TableCell>
                  <TableCell>{expense.currency}</TableCell>
                  
                  {editing === expense.officeId ? (
                    // Editing mode
                    <>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          value={editValues.rent}
                          onChange={(e) => setEditValues({ ...editValues, rent: e.target.value })}
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          value={editValues.salaries}
                          onChange={(e) => setEditValues({ ...editValues, salaries: e.target.value })}
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          value={editValues.utilities}
                          onChange={(e) => setEditValues({ ...editValues, utilities: e.target.value })}
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>
                        {formatCurrency(
                          parseFloat(editValues.rent || "0") +
                          parseFloat(editValues.salaries || "0") +
                          parseFloat(editValues.utilities || "0"),
                          expense.currency
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500" onClick={() => handleSave(expense.officeId)}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={handleCancel}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    // Display mode
                    <>
                      <TableCell>{formatCurrency(expense.breakdown.rent, expense.currency)}</TableCell>
                      <TableCell>{formatCurrency(expense.breakdown.salaries, expense.currency)}</TableCell>
                      <TableCell>{formatCurrency(expense.breakdown.utilities, expense.currency)}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(expense.monthly, expense.currency)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleStartEdit(expense)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-6">
          <h3 className="text-md font-medium mb-2">Fixed Expenses Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-1">Rent</div>
                <div className="text-xl font-semibold">
                  {formatCurrency(
                    fixedExpenses.reduce((sum, expense) => sum + expense.breakdown.rent, 0),
                    baseCurrency
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {Math.round(fixedExpenses.reduce((sum, expense) => sum + expense.breakdown.rent, 0) / 
                   fixedExpenses.reduce((sum, expense) => sum + expense.monthly, 0) * 100)}% of fixed expenses
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-1">Salaries</div>
                <div className="text-xl font-semibold">
                  {formatCurrency(
                    fixedExpenses.reduce((sum, expense) => sum + expense.breakdown.salaries, 0),
                    baseCurrency
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {Math.round(fixedExpenses.reduce((sum, expense) => sum + expense.breakdown.salaries, 0) / 
                   fixedExpenses.reduce((sum, expense) => sum + expense.monthly, 0) * 100)}% of fixed expenses
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-1">Utilities</div>
                <div className="text-xl font-semibold">
                  {formatCurrency(
                    fixedExpenses.reduce((sum, expense) => sum + expense.breakdown.utilities, 0),
                    baseCurrency
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {Math.round(fixedExpenses.reduce((sum, expense) => sum + expense.breakdown.utilities, 0) / 
                   fixedExpenses.reduce((sum, expense) => sum + expense.monthly, 0) * 100)}% of fixed expenses
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
