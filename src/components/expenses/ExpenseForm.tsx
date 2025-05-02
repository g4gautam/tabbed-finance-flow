
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "./DatePicker";
import { toast } from "@/components/ui/use-toast";

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

interface ExpenseFormProps {
  currencies: Currency[];
  offices: Office[];
}

export function ExpenseForm({ currencies, offices }: ExpenseFormProps) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [office, setOffice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [description, setDescription] = useState("");
  const [exchangeRate, setExchangeRate] = useState("1");
  const [useSystemRate, setUseSystemRate] = useState(true);
  const [date, setDate] = useState<Date | undefined>(new Date());
  
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

  return (
    <Card>
      <CardHeader className="px-6 py-4 border-b border-gray-200">
        <CardTitle className="text-lg font-medium text-gray-800">Add New Expense</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date Picker */}
            <DatePicker
              date={date}
              setDate={setDate}
              label="Date"
            />
            
            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={category}
                onValueChange={setCategory}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            
            {/* Currency */}
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={currency}
                onValueChange={(value) => {
                  setCurrency(value);
                  // Auto-select office based on currency
                  const matchingOffice = offices.find(o => o.currency === value);
                  if (matchingOffice) {
                    setOffice(matchingOffice.id);
                  }
                }}
              >
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
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
              <Input
                id="exchangeRate"
                type="number"
                step="0.0001"
                min="0.0001"
                placeholder="Enter exchange rate"
                value={exchangeRate}
                onChange={(e) => setExchangeRate(e.target.value)}
                disabled={useSystemRate}
              />
            </div>
            
            {/* Office */}
            <div className="space-y-2">
              <Label htmlFor="office">Office</Label>
              <Select
                value={office}
                onValueChange={setOffice}
              >
                <SelectTrigger id="office">
                  <SelectValue placeholder="Select office" />
                </SelectTrigger>
                <SelectContent>
                  {offices.map((office) => (
                    <SelectItem key={office.id} value={office.id}>
                      {office.name} ({office.currency})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Payment Method */}
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select
                value={paymentMethod}
                onValueChange={setPaymentMethod}
              >
                <SelectTrigger id="paymentMethod">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
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
          
          <div className="flex justify-end">
            <Button type="submit">Add Expense</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
