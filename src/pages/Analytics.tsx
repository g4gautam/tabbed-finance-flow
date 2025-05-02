
import React, { useState } from 'react';
import { 
  BarChart2, Download, Calendar, Filter, Search,
  TrendingUp, DollarSign, PieChart, Clock,
  RefreshCw, Save, Share, Clipboard, Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dateRange, setDateRange] = useState('This Month');
  const [showCustomDate, setShowCustomDate] = useState(false);
  
  // Sample reports data
  const reportsData = {
    profitLossSummary: {
      totalRevenue: 278450.75,
      totalExpenses: 209750.50,
      grossProfit: 68700.25,
      profitMargin: 24.7,
      revenueByCategory: [
        { category: 'Flight Bookings', amount: 146250.00, percentage: 52.5 },
        { category: 'Hotel Reservations', amount: 78920.00, percentage: 28.3 },
        { category: 'Package Tours', amount: 45780.75, percentage: 16.4 },
        { category: 'Insurance Sales', amount: 7500.00, percentage: 2.8 }
      ],
      expensesByCategory: [
        { category: 'Flight Costs', amount: 131625.00, percentage: 62.8 },
        { category: 'Hotel Costs', amount: 63136.00, percentage: 30.1 },
        { category: 'Operational Costs', amount: 14989.50, percentage: 7.1 }
      ],
      monthlyComparison: [
        { month: 'Jan', revenue: 215450.25, expenses: 175260.80, profit: 40189.45 },
        { month: 'Feb', revenue: 226780.50, expenses: 182350.75, profit: 44429.75 },
        { month: 'Mar', revenue: 245250.00, expenses: 192500.25, profit: 52749.75 },
        { month: 'Apr', revenue: 278450.75, expenses: 209750.50, profit: 68700.25 }
      ]
    },
    topCustomers: [
      { 
        name: 'Business Travel International',
        revenue: 48750.00,
        transactions: 28,
        avgValue: 1741.07,
        recentTransaction: '2025-05-01',
        change: '+12.5%'
      },
      { 
        name: 'Luxury Vacations',
        revenue: 36250.50,
        transactions: 15,
        avgValue: 2416.70,
        recentTransaction: '2025-04-30',
        change: '+8.3%'
      },
      { 
        name: 'Holiday Planners',
        revenue: 32780.75,
        transactions: 22,
        avgValue: 1490.03,
        recentTransaction: '2025-04-28',
        change: '+5.2%'
      },
      { 
        name: 'Executive Travel',
        revenue: 28450.00,
        transactions: 12,
        avgValue: 2370.83,
        recentTransaction: '2025-04-27',
        change: '+7.6%'
      },
      { 
        name: 'World Tours Corp',
        revenue: 21750.25,
        transactions: 14,
        avgValue: 1553.59,
        recentTransaction: '2025-04-25',
        change: '-3.1%'
      }
    ],
    savedReports: [
      { 
        id: 1,
        name: 'Monthly Profit & Loss',
        type: 'Financial',
        lastRun: '2025-05-01',
        schedule: 'Monthly',
        format: 'PDF'
      },
      { 
        id: 2,
        name: 'Top Customer Analysis',
        type: 'Customer',
        lastRun: '2025-04-30',
        schedule: 'Weekly',
        format: 'Excel'
      },
      { 
        id: 3,
        name: 'Revenue by Product Category',
        type: 'Sales',
        lastRun: '2025-04-30',
        schedule: 'Weekly',
        format: 'PDF'
      },
      { 
        id: 4,
        name: 'Tax Summary Report',
        type: 'Financial',
        lastRun: '2025-04-01',
        schedule: 'Monthly',
        format: 'PDF'
      },
      { 
        id: 5,
        name: 'Outstanding Invoices Aging',
        type: 'Financial',
        lastRun: '2025-05-01',
        schedule: 'Weekly',
        format: 'Excel'
      }
    ]
  };
  
  // Format currency
  const formatCurrency = (amount: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };
  
  // Format percentage
  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };
  
  // Render Financial Dashboard
  const renderFinancialDashboard = () => {
    const { profitLossSummary } = reportsData;
    
    return (
      <div className="space-y-6">
        {/* Key Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                <DollarSign className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(profitLossSummary.totalRevenue)}</p>
              <div className="mt-2 flex items-center text-sm font-medium text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>8.2% from previous period</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
                <DollarSign className="h-5 w-5 text-red-500" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(profitLossSummary.totalExpenses)}</p>
              <div className="mt-2 flex items-center text-sm font-medium text-red-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>6.7% from previous period</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-gray-500">Gross Profit</h3>
                <BarChart2 className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(profitLossSummary.grossProfit)}</p>
              <div className="mt-2 flex items-center text-sm font-medium text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>11.4% from previous period</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-gray-500">Profit Margin</h3>
                <PieChart className="h-5 w-5 text-purple-500" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{formatPercent(profitLossSummary.profitMargin)}</p>
              <div className="mt-2 flex items-center text-sm font-medium text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>2.8% from previous period</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Revenue by Category */}
        <Card>
          <CardHeader className="px-6 py-4 border-b border-gray-200">
            <CardTitle className="text-lg font-medium text-gray-800">Revenue by Category</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6">
              {/* This would be a chart in a real implementation */}
              <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <PieChart size={48} className="text-blue-500 mx-auto mb-3" />
                  <p className="text-gray-500">Revenue Distribution Chart</p>
                </div>
              </div>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      % of Revenue
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Distribution
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {profitLossSummary.revenueByCategory.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(item.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatPercent(item.percentage)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="h-2.5 rounded-full bg-blue-600" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        {/* Monthly Comparison */}
        <Card>
          <CardHeader className="px-6 py-4 border-b border-gray-200">
            <CardTitle className="text-lg font-medium text-gray-800">Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6">
              {/* This would be a chart in a real implementation */}
              <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart2 size={48} className="text-blue-500 mx-auto mb-3" />
                  <p className="text-gray-500">Monthly Performance Chart</p>
                </div>
              </div>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Month
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expenses
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Profit
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Margin
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {profitLossSummary.monthlyComparison.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.month} 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                        {formatCurrency(item.revenue)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                        {formatCurrency(item.expenses)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                        {formatCurrency(item.profit)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatPercent((item.profit / item.revenue) * 100)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  // Render Customer Analysis
  const renderCustomerAnalysis = () => {
    const { topCustomers } = reportsData;
    
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="px-6 py-4 border-b border-gray-200">
            <CardTitle className="text-lg font-medium text-gray-800">Top Customers by Revenue</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6">
              {/* This would be a chart in a real implementation */}
              <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart2 size={48} className="text-blue-500 mx-auto mb-3" />
                  <p className="text-gray-500">Customer Revenue Chart</p>
                </div>
              </div>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transactions
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Avg. Transaction
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Transaction
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      YoY Change
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topCustomers.map((customer, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {customer.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {formatCurrency(customer.revenue)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {customer.transactions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(customer.avgValue)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {customer.recentTransaction}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex items-center ${
                          customer.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {customer.change.startsWith('+') ? 
                            <TrendingUp className="h-4 w-4 mr-1" /> : 
                            <TrendingUp className="h-4 w-4 mr-1 transform rotate-180" />
                          }
                          {customer.change}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="px-6 py-4 border-b border-gray-200">
            <CardTitle className="text-lg font-medium text-gray-800">Customer Acquisition & Retention Analysis</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* These would be charts in a real implementation */}
              <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <PieChart size={48} className="text-blue-500 mx-auto mb-3" />
                  <p className="text-gray-500">Customer Acquisition Chart</p>
                </div>
              </div>
              <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <PieChart size={48} className="text-green-500 mx-auto mb-3" />
                  <p className="text-gray-500">Customer Retention Chart</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-1">New Customers (MTD)</h4>
                <p className="text-2xl font-bold text-gray-800">12</p>
                <p className="text-sm text-green-600 mt-1">+20% from previous month</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Retention Rate</h4>
                <p className="text-2xl font-bold text-gray-800">82.5%</p>
                <p className="text-sm text-green-600 mt-1">+3.5% from previous month</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Customer Lifetime Value</h4>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(24500)}</p>
                <p className="text-sm text-green-600 mt-1">+5.2% from previous month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  // Render Saved Reports
  const renderSavedReports = () => {
    const { savedReports } = reportsData;
    
    return (
      <div className="space-y-6">
        <Card>
          <div className="p-4 flex flex-wrap items-center justify-between border-b border-gray-200">
            <div className="flex items-center w-full md:w-auto mb-3 md:mb-0">
              <div className="relative flex-grow md:max-w-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search reports..."
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
              <Button size="sm" className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> New Report
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Run
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Schedule
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Format
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {savedReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {report.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.lastRun}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.schedule}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Badge variant="neutral">{report.format}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                      <button className="text-blue-600 hover:text-blue-900" aria-label="Run Report">
                        <RefreshCw className="h-4 w-4 inline-block" />
                      </button>
                      <button className="text-indigo-600 hover:text-indigo-900" aria-label="Download">
                        <Download className="h-4 w-4 inline-block" />
                      </button>
                      <button className="text-green-600 hover:text-green-900" aria-label="Share">
                        <Share className="h-4 w-4 inline-block" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900" aria-label="Copy Report Link">
                        <Clipboard className="h-4 w-4 inline-block" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        
        <Card>
          <CardHeader className="px-6 py-4 border-b border-gray-200">
            <CardTitle className="text-lg font-medium text-gray-800">Report Scheduling</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6">
              {/* This would be a calendar in a real implementation */}
              <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Calendar size={48} className="text-blue-500 mx-auto mb-3" />
                  <p className="text-gray-500">Report Schedule Calendar</p>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Upcoming Reports</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="flex h-8 w-8 rounded-full bg-blue-100 items-center justify-center">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </span>
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">Top Customer Analysis</p>
                      <p className="text-xs text-gray-500">Scheduled for: 2025-05-07</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="flex h-8 w-8 rounded-full bg-blue-100 items-center justify-center">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </span>
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">Revenue by Product Category</p>
                      <p className="text-xs text-gray-500">Scheduled for: 2025-05-07</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="flex h-8 w-8 rounded-full bg-blue-100 items-center justify-center">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </span>
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">Outstanding Invoices Aging</p>
                      <p className="text-xs text-gray-500">Scheduled for: 2025-05-08</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Report Recipients</h4>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">MJ</span>
                      <span className="ml-3 text-sm text-gray-900">Michael Johnson (Finance Director)</span>
                    </div>
                    <span className="text-xs text-gray-500">5 reports</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">SW</span>
                      <span className="ml-3 text-sm text-gray-900">Sarah Williams (CEO)</span>
                    </div>
                    <span className="text-xs text-gray-500">3 reports</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">DC</span>
                      <span className="ml-3 text-sm text-gray-900">David Chen (Sales Manager)</span>
                    </div>
                    <span className="text-xs text-gray-500">2 reports</span>
                  </li>
                </ul>
                <button className="mt-4 text-sm text-blue-600 flex items-center">
                  <Plus className="h-4 w-4 mr-1" /> Add Recipient
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center">
            <BarChart2 className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative inline-block text-left">
              <select
                className="block appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={dateRange}
                onChange={(e) => {
                  setDateRange(e.target.value);
                  setShowCustomDate(e.target.value === 'Custom Range');
                }}
              >
                <option>Today</option>
                <option>Yesterday</option>
                <option>Last 7 Days</option>
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Quarter</option>
                <option>Custom Range</option>
              </select>
            </div>
            
            {showCustomDate && (
              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  className="block appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="date"
                  className="block appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}
            
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Save className="h-4 w-4" /> Save
            </Button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mb-6">
          <Tabs defaultValue="dashboard" onValueChange={(value) => setActiveTab(value)}>
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
              <TabsTrigger value="dashboard">Financial Dashboard</TabsTrigger>
              <TabsTrigger value="customerAnalysis">Customer Analysis</TabsTrigger>
              <TabsTrigger value="productAnalysis">Product Analysis</TabsTrigger>
              <TabsTrigger value="savedReports">Saved Reports</TabsTrigger>
              <TabsTrigger value="customReports">Custom Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard">
              {renderFinancialDashboard()}
            </TabsContent>
            <TabsContent value="customerAnalysis">
              {renderCustomerAnalysis()}
            </TabsContent>
            <TabsContent value="savedReports">
              {renderSavedReports()}
            </TabsContent>
            <TabsContent value="productAnalysis">
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">Product Analysis content will be available soon</p>
              </div>
            </TabsContent>
            <TabsContent value="customReports">
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">Custom Reports content will be available soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
