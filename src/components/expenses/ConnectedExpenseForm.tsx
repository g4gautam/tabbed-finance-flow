
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { DatePicker } from "./DatePicker";
import { ConnectedField } from "../common/ConnectedField";
import { useFinancialData } from "../../contexts/FinancialDataContext";

export function ConnectedExpenseForm() {
  const { 
    currencies, 
    offices, 
    validateExpense,
    getSuggestedOffice,
    getSuggestedCurrency,
    isLoading 
  } = useFinancialData();

  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [office, setOffice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [description, setDescription] = useState("");
  const [exchangeRate, setExchangeRate] = useState("1");
  const [useSystemRate, setUseSystemRate] = useState(true);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [validationWarnings, setValidationWarnings] = useState<string[]>([]);
  
  const expenseCategories = [
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
    { value: 'cash', label: 'Cash' },
    { value: 'bank', label: 'Bank Transfer' },
    { value: 'credit', label: 'Credit Card' },
    { value: 'upi', label: 'UPI/Mobile Payment' }
  ];
  
  const currencyOptions = currencies.map(c => ({
    value: c.code,
    label: `${c.symbol} ${c.code} - ${c.name}`
  }));
  
  const officeOptions = offices.map(o => ({
    value: o.id,
    label: `${o.name} (${o.currency})`
  }));

  // Handle intelligent field connections
  useEffect(() => {
    if (currency && !office) {
      // Suggest an office based on selected currency
      const suggestedOffice = getSuggestedOffice(currency);
      if (suggestedOffice) {
        setOffice(suggestedOffice.id);
        toast({
          title: "Office auto-selected",
          description: `Based on currency ${currency}, office "${suggestedOffice.name}" was suggested.`,
          variant: "default"
        });
      }
    }
  }, [currency, office, getSuggestedOffice]);

  useEffect(() => {
    if (office && !currency) {
      // Suggest a currency based on selected office
      const suggestedCurrency = getSuggestedCurrency(office);
      if (suggestedCurrency) {
        setCurrency(suggestedCurrency.code);
        toast({
          title: "Currency auto-selected",
          description: `Based on office selection, currency ${suggestedCurrency.code} was suggested.`,
          variant: "default"
        });
      }
    }
  }, [currency, office, getSuggestedCurrency]);

  // Validate form when key fields change
  useEffect(() => {
    if (!amount || !currency || !office) return;
    
    // Create a temporary expense object for validation
    const tempExpense = {
      id: 0,
      date: date?.toISOString().split('T')[0] || '',
      category: expenseCategories.find(cat => cat.value === category)?.label || '',
      amount: parseFloat(amount),
      currency,
      office: offices.find(o => o.id === office)?.name || '',
      exchangeRate: useSystemRate ? 1 : parseFloat(exchangeRate),
      paymentMethod
    };
    
    const validation = validateExpense(tempExpense);
    setValidationErrors(validation.errors);
    
  }, [amount, currency, office, date, category, validateExpense, offices, useSystemRate, exchangeRate, paymentMethod, expenseCategories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category || !amount || !currency || !office || !paymentMethod || !date) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (validationErrors.length > 0) {
      toast({
        title: "Validation errors",
        description: validationErrors.join(", "),
        variant: "destructive"
      });
      return;
    }
    
    const newExpense = {
      id: Date.now(),
      date: date.toISOString().split('T')[0],
      category: expenseCategories.find(cat => cat.value === category)?.label,
      amount: parseFloat(amount),
      currency,
      office: offices.find(o => o.id === office)?.name,
      description,
      exchangeRate: useSystemRate ? 1 : parseFloat(exchangeRate),
      paymentMethod
    };
    
    console.log('New expense added:', newExpense);
    
    toast({
      title: "Expense added",
      description: `${currency} ${amount} for ${expenseCategories.find(cat => cat.value === category)?.label} has been added.`
    });
    
    // Reset form
    setCategory("");
    setAmount("");
    setCurrency("");
    setOffice("");
    setPaymentMethod("");
    setDescription("");
    setExchangeRate("1");
    setUseSystemRate(true);
    setDate(new Date());
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader className="px-6 py-4 border-b border-gray-200">
        <CardTitle className="text-lg font-medium text-gray-800">Add New Expense (Connected Fields)</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date Picker */}
            <DatePicker
              date={date}
              setDate={setDate}
              label="Date"
              fieldName="expense.date"
            />
            
            {/* Category */}
            <ConnectedField
              fieldName="expense.category"
              label="Category"
              value={category}
              onChange={setCategory}
              type="select"
              options={expenseCategories}
              placeholder="Select category"
            />
            
            {/* Amount */}
            <ConnectedField
              fieldName="expense.amount"
              label="Amount"
              value={amount}
              onChange={setAmount}
              type="input"
              placeholder="Enter amount"
              required
            />
            
            {/* Currency */}
            <ConnectedField
              fieldName="expense.currency"
              label="Currency"
              value={currency}
              onChange={(value) => {
                setCurrency(value);
              }}
              type="select"
              options={currencyOptions}
              placeholder="Select currency"
            />
            
            {/* Exchange Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="exchangeRate">Exchange Rate</Label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="useSystemRate"
                    checked={useSystemRate}
                    onChange={(e) => setUseSystemRate(e.target.checked)}
                    className="mr-2 h-4 w-4"
                  />
                  <label htmlFor="useSystemRate" className="text-xs text-gray-600">Use system rate</label>
                </div>
              </div>
              <ConnectedField
                fieldName="expense.exchangeRate"
                label=""
                value={exchangeRate}
                onChange={setExchangeRate}
                type="input"
                disabled={useSystemRate}
                placeholder="Enter exchange rate"
              />
            </div>
            
            {/* Office */}
            <ConnectedField
              fieldName="expense.office"
              label="Office"
              value={office}
              onChange={setOffice}
              type="select"
              options={officeOptions}
              placeholder="Select office"
            />
            
            {/* Payment Method */}
            <ConnectedField
              fieldName="expense.paymentMethod"
              label="Payment Method"
              value={paymentMethod}
              onChange={setPaymentMethod}
              type="select"
              options={paymentMethods}
              placeholder="Select payment method"
            />
            
            {/* Description */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter expense description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          
          {/* Display validation errors */}
          {validationErrors.length > 0 && (
            <div className="bg-red-50 text-red-800 p-3 rounded-md text-sm">
              <p className="font-medium mb-1">Please correct the following errors:</p>
              <ul className="list-disc list-inside">
                {validationErrors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Display validation warnings */}
          {validationWarnings.length > 0 && (
            <div className="bg-yellow-50 text-yellow-800 p-3 rounded-md text-sm">
              <p className="font-medium mb-1">Warnings:</p>
              <ul className="list-disc list-inside">
                {validationWarnings.map((warning, i) => (
                  <li key={i}>{warning}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex justify-end">
            <Button type="submit">Add Expense</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
