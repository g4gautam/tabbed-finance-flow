
import React, { useState } from 'react';
import { 
  DollarSign, Wallet, CreditCard, 
  AlertTriangle, TrendingUp, ChevronDown, 
  ChevronUp, ArrowRight
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Dashboard = () => {
  const [dateRange, setDateRange] = useState('This Month');
  
  // Sample data
  const financialData = {
    totalRevenue: 278450.75,
    pendingPayments: 46250.50,
    outstandingInvoices: 62350.25,
    creditUtilization: 64,
    recentTransactions: [
      { id: 'TRX-1042', date: '2025-05-01', amount: 2245.50, customer: 'Business Travel Intl.', type: 'Payment', status: 'Completed' },
      { id: 'TRX-1041', date: '2025-04-30', amount: 1785.25, customer: 'Holiday Planners', type: 'Invoice', status: 'Pending' },
      { id: 'TRX-1040', date: '2025-04-29', amount: 920.00, customer: 'World Tours Corp', type: 'Refund', status: 'Processing' },
      { id: 'TRX-1039', date: '2025-04-28', amount: 3675.00, customer: 'Luxury Vacations', type: 'Payment', status: 'Completed' },
      { id: 'TRX-1038', date: '2025-04-28', amount: 1920.75, customer: 'Executive Travel', type: 'Invoice', status: 'Pending' }
    ],
    revenueBySource: [
      { source: 'Flight Bookings', amount: 146250.00, percentage: 52.5, trend: '+12.3%' },
      { source: 'Hotel Reservations', amount: 78920.00, percentage: 28.3, trend: '+8.6%' },
      { source: 'Package Tours', amount: 45780.75, percentage: 16.4, trend: '+5.2%' },
      { source: 'Insurance Sales', amount: 7500.00, percentage: 2.8, trend: '-2.1%' }
    ],
    alertsNotifications: [
      { id: 1, type: 'warning', message: 'Invoice #INV-2854 payment overdue by 5 days', time: '2 hours ago' },
      { id: 2, type: 'info', message: 'New payment received from Business Travel Intl.', time: '4 hours ago' },
      { id: 3, type: 'success', message: 'End of month reconciliation completed', time: '1 day ago' },
      { id: 4, type: 'warning', message: 'Credit limit threshold reached for Holiday Planners', time: '2 days ago' }
    ]
  };
  
  // Format currency
  const formatCurrency = (amount: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <div className="container mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Financial Dashboard</h1>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="bg-white rounded-md shadow-sm">
            <select 
              className="block w-full py-2 pl-3 pr-10 text-base border border-gray-200 rounded-md focus:outline-none focus:ring-primary sm:text-sm"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Quarter</option>
              <option>Custom Range</option>
            </select>
          </div>
          <button className="bg-primary text-primary-foreground w-full sm:w-auto px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
            Export Report
          </button>
        </div>
      </div>
      
      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
              <DollarSign className="h-6 w-6 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(financialData.totalRevenue)}</p>
            <div className="mt-2 flex items-center text-sm font-medium text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>8.2% from previous period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">Pending Payments</CardTitle>
              <Wallet className="h-6 w-6 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(financialData.pendingPayments)}</p>
            <div className="mt-2 flex items-center text-sm font-medium text-gray-600">
              <span>12 payments pending verification</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">Outstanding Invoices</CardTitle>
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(financialData.outstandingInvoices)}</p>
            <div className="mt-2 flex items-center text-sm font-medium text-red-600">
              <span>3 invoices overdue</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">Credit Utilization</CardTitle>
              <CreditCard className="h-6 w-6 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-800">{financialData.creditUtilization}%</p>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    financialData.creditUtilization > 80 ? 'bg-red-500' : 
                    financialData.creditUtilization > 60 ? 'bg-yellow-500' : 'bg-green-500'
                  }`} 
                  style={{ width: `${financialData.creditUtilization}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between px-6 py-4 border-b">
            <CardTitle className="text-lg font-medium text-gray-800">Recent Transactions</CardTitle>
            <button className="text-sm text-primary hover:text-primary/80 font-medium flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {financialData.recentTransactions.map((transaction, index) => (
                    <TableRow key={index} className="hover:bg-muted/50">
                      <TableCell className="font-medium text-primary">{transaction.id}</TableCell>
                      <TableCell className="text-muted-foreground">{transaction.date}</TableCell>
                      <TableCell>{transaction.customer}</TableCell>
                      <TableCell className="text-muted-foreground">{transaction.type}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(transaction.amount)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                            transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-blue-100 text-blue-800'}`}>
                          {transaction.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        {/* Alerts & Notifications */}
        <Card>
          <CardHeader className="px-6 py-4 border-b">
            <CardTitle className="text-lg font-medium text-gray-800">Alerts & Notifications</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ul className="divide-y divide-gray-200">
              {financialData.alertsNotifications.map((alert) => (
                <li key={alert.id} className="py-3">
                  <div className="flex items-start">
                    <div className={`mt-1 mr-3 flex-shrink-0 rounded-full p-1 
                      ${alert.type === 'warning' ? 'bg-yellow-100' : 
                        alert.type === 'info' ? 'bg-blue-100' : 
                        'bg-green-100'}`}>
                      <AlertTriangle className={`h-5 w-5 
                        ${alert.type === 'warning' ? 'text-yellow-600' : 
                          alert.type === 'info' ? 'text-blue-600' : 
                          'text-green-600'}`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      {/* Revenue by Source */}
      <Card className="mt-6">
        <CardHeader className="px-6 py-4 border-b">
          <CardTitle className="text-lg font-medium text-gray-800">Revenue by Source</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>% of Total</TableHead>
                  <TableHead>Trend</TableHead>
                  <TableHead>Distribution</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {financialData.revenueBySource.map((source, index) => (
                  <TableRow key={index} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{source.source}</TableCell>
                    <TableCell>{formatCurrency(source.amount)}</TableCell>
                    <TableCell className="text-muted-foreground">{source.percentage.toFixed(1)}%</TableCell>
                    <TableCell>
                      <span className={`text-sm font-medium ${source.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {source.trend.startsWith('+') ? 
                          <ChevronUp className="h-4 w-4 inline mr-1" /> : 
                          <ChevronDown className="h-4 w-4 inline mr-1" />
                        }
                        {source.trend}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="h-2.5 rounded-full bg-primary" 
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
