
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp, DollarSign, PieChart, Calendar, CreditCard,
  Building, Tag
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart as RechartsPI,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { ChartContainer } from "@/components/ui/chart";

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

interface ExpenseDashboardProps {
  expenseData: any;
  baseCurrency: string;
  currencies: Currency[];
  offices: Office[];
}

export function ExpenseDashboard({ expenseData, baseCurrency, currencies, offices }: ExpenseDashboardProps) {
  const [includeFixedExpenses, setIncludeFixedExpenses] = useState(true);
  
  const currencySymbol = currencies.find(c => c.code === baseCurrency)?.symbol || '€';
  
  // Calculate totals
  const totalEarnings = expenseData.earnings.reduce((sum: number, item: any) => {
    return sum + (item.amount * expenseData.exchangeRates[item.currency] / expenseData.exchangeRates[baseCurrency]);
  }, 0);
  
  const totalVariableExpenses = expenseData.expenses.reduce((sum: number, item: any) => {
    return sum + (item.amount * expenseData.exchangeRates[item.currency] / expenseData.exchangeRates[baseCurrency]);
  }, 0);
  
  const totalFixedExpenses = expenseData.fixedExpenses.reduce((sum: number, item: any) => {
    return sum + (item.monthly * expenseData.exchangeRates[item.currency] / expenseData.exchangeRates[baseCurrency]);
  }, 0);
  
  const netProfit = totalEarnings - totalVariableExpenses - (includeFixedExpenses ? totalFixedExpenses : 0);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: baseCurrency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Prepare data for expense distribution pie chart
  const expensesByCategory = expenseData.expenseCategories.map((category: any) => {
    const total = expenseData.expenses
      .filter((expense: any) => expense.category.toLowerCase() === category.value)
      .reduce((sum: number, item: any) => {
        return sum + (item.amount * expenseData.exchangeRates[item.currency] / expenseData.exchangeRates[baseCurrency]);
      }, 0);
      
    return {
      name: category.label,
      value: total,
      percentage: total / totalVariableExpenses * 100
    };
  }).filter((item: any) => item.value > 0);

  // Prepare data for expenses by payment method
  const expensesByPaymentMethod = expenseData.paymentMethods.map((method: any) => {
    const total = expenseData.expenses
      .filter((expense: any) => expense.paymentMethod === method.value)
      .reduce((sum: number, item: any) => {
        return sum + (item.amount * expenseData.exchangeRates[item.currency] / expenseData.exchangeRates[baseCurrency]);
      }, 0);
      
    return {
      name: method.label,
      value: total,
      percentage: total / totalVariableExpenses * 100
    };
  }).filter((item: any) => item.value > 0);

  // Prepare data for expenses by office
  const expensesByOffice = offices.map((office: any) => {
    const total = expenseData.expenses
      .filter((expense: any) => expense.office === office.name)
      .reduce((sum: number, item: any) => {
        return sum + (item.amount * expenseData.exchangeRates[item.currency] / expenseData.exchangeRates[baseCurrency]);
      }, 0);
      
    return {
      name: office.name,
      value: total,
      percentage: total / totalVariableExpenses * 100
    };
  }).filter((item: any) => item.value > 0);

  // Prepare data for monthly trend comparison
  const monthlyData = [
    { month: 'Jan', revenue: 215450, expenses: 175260, profit: 40190 },
    { month: 'Feb', revenue: 226780, expenses: 182350, profit: 44430 },
    { month: 'Mar', revenue: 245250, expenses: 192500, profit: 52750 },
    { month: 'Apr', revenue: totalEarnings, expenses: totalVariableExpenses, profit: netProfit }
  ];

  // Chart colors
  const CHART_COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#10B981', '#F59E0B', '#EC4899', '#6366F1'];

  return (
    <div className="space-y-6">
      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-medium text-gray-500">Total Earnings</h3>
              <DollarSign className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalEarnings)}</p>
            <div className="mt-2 flex items-center text-sm font-medium text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+8.5% from previous month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-medium text-gray-500">Variable Expenses</h3>
              <DollarSign className="h-5 w-5 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalVariableExpenses)}</p>
            <div className="mt-2 flex items-center text-sm font-medium text-red-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+5.2% from previous month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-medium text-gray-500">Fixed Expenses</h3>
              <Building className="h-5 w-5 text-orange-500" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalFixedExpenses)}</p>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="include-fixed"
                checked={includeFixedExpenses}
                onChange={(e) => setIncludeFixedExpenses(e.target.checked)}
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="include-fixed" className="text-xs text-gray-600">Include in profit calculation</label>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-medium text-gray-500">Net Profit</h3>
              <PieChart className="h-5 w-5 text-green-500" />
            </div>
            <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(netProfit)}
            </p>
            <div className="mt-2 text-sm font-medium">
              <span className={netProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
                {(netProfit / totalEarnings * 100).toFixed(1)}% margin
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Revenue vs Expenses Chart */}
      <Card>
        <CardHeader className="px-6 py-4 border-b border-gray-200">
          <CardTitle className="text-lg font-medium text-gray-800">Revenue vs. Expenses Trend</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-80">
            <ChartContainer
              config={{
                revenue: { color: "#8B5CF6" },
                expenses: { color: "#F97316" },
                profit: { color: "#10B981" }
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => formatCurrency(value as number)}
                    labelFormatter={(label) => `${label} 2025`}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#F97316" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="profit" name="Profit" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Distribution Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Expense by Category */}
        <Card>
          <CardHeader className="px-6 py-4 border-b border-gray-200">
            <CardTitle className="text-lg font-medium text-gray-800">Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-64">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPI>
                    <Pie
                      data={expensesByCategory}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({name}) => name}
                    >
                      {expensesByCategory.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => formatCurrency(value as number)}
                    />
                    <Legend />
                  </RechartsPI>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Expense by Payment Method */}
        <Card>
          <CardHeader className="px-6 py-4 border-b border-gray-200">
            <CardTitle className="text-lg font-medium text-gray-800">Expenses by Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-64">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPI>
                    <Pie
                      data={expensesByPaymentMethod}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({name}) => name}
                    >
                      {expensesByPaymentMethod.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[(index + 2) % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => formatCurrency(value as number)}
                    />
                    <Legend />
                  </RechartsPI>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Expense by Office */}
        <Card>
          <CardHeader className="px-6 py-4 border-b border-gray-200">
            <CardTitle className="text-lg font-medium text-gray-800">Expenses by Office</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-64">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPI>
                    <Pie
                      data={expensesByOffice}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({name}) => name}
                    >
                      {expensesByOffice.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[(index + 4) % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => formatCurrency(value as number)}
                    />
                    <Legend />
                  </RechartsPI>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Additional Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-800">Expense Categories</h3>
              <Tag className="h-4 w-4 text-purple-500" />
            </div>
            <div className="space-y-2">
              {expensesByCategory.slice(0, 3).map((category: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-xs">{category.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {category.percentage.toFixed(1)}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-800">Payment Methods</h3>
              <CreditCard className="h-4 w-4 text-orange-500" />
            </div>
            <div className="space-y-2">
              {expensesByPaymentMethod.slice(0, 3).map((method: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-xs">{method.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {method.percentage.toFixed(1)}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-800">Top Office</h3>
              <Building className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-lg font-semibold text-gray-800">
              {expensesByOffice.sort((a: any, b: any) => b.value - a.value)[0]?.name}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {formatCurrency(expensesByOffice.sort((a: any, b: any) => b.value - a.value)[0]?.value)} ({expensesByOffice.sort((a: any, b: any) => b.value - a.value)[0]?.percentage.toFixed(1)}% of expenses)
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-800">Recent Period</h3>
              <Calendar className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-lg font-semibold text-gray-800">
              April 2025
            </p>
            <p className="text-xs text-gray-500 mt-1">
              10 expense transactions | 8 revenue entries
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
