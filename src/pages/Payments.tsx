
import React, { useState } from 'react';
import { 
  CreditCard, Search, Plus, ChevronDown, 
  Filter, Download, Check, FileText, 
  DollarSign, Printer, Calendar, RefreshCw,
  CheckCircle, AlertTriangle, Eye, Edit, Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { Label } from '@/components/ui/label';

const Payments = () => {
  const [activeTab, setActiveTab] = useState('paymentCapture');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  // Sample data
  const paymentData = {
    pendingPayments: [
      { 
        id: 'PMT-2501', 
        invoiceRef: 'INV-3487',
        customer: 'Business Travel International',
        amount: 2450.75,
        dueDate: '2025-05-10',
        status: 'Pending',
        method: 'Credit Card'
      },
      { 
        id: 'PMT-2502',
        invoiceRef: 'INV-3485',
        customer: 'Holiday Planners', 
        amount: 1785.25,
        dueDate: '2025-05-07',
        status: 'Pending',
        method: 'Bank Transfer'
      },
      { 
        id: 'PMT-2503',
        invoiceRef: 'INV-3482',
        customer: 'Executive Travel',
        amount: 3250.00,
        dueDate: '2025-05-05',
        status: 'Overdue',
        method: 'Credit Card'
      },
      { 
        id: 'PMT-2504',
        invoiceRef: 'INV-3480',
        customer: 'World Tours Corp',
        amount: 4120.50,
        dueDate: '2025-05-03',
        status: 'Overdue',
        method: 'Bank Transfer'
      }
    ],
    recentPayments: [
      { 
        id: 'PMT-2498',
        invoiceRef: 'INV-3478',
        customer: 'Business Travel International',
        amount: 1850.00,
        date: '2025-05-01',
        method: 'Credit Card',
        status: 'Completed',
        receiptNumber: 'RCP-1248'
      },
      { 
        id: 'PMT-2499',
        invoiceRef: 'INV-3477',
        customer: 'Luxury Vacations',
        amount: 3675.00,
        date: '2025-04-30',
        method: 'Bank Transfer',
        status: 'Completed',
        receiptNumber: 'RCP-1247'
      },
      { 
        id: 'PMT-2500',
        invoiceRef: 'INV-3475',
        customer: 'Adventure Tours',
        amount: 2250.25,
        date: '2025-04-29',
        method: 'PayPal',
        status: 'Completed',
        receiptNumber: 'RCP-1246'
      },
      { 
        id: 'PMT-2497',
        invoiceRef: 'INV-3474',
        customer: 'Family Getaways',
        amount: 1950.75,
        date: '2025-04-28',
        method: 'Credit Card',
        status: 'Completed',
        receiptNumber: 'RCP-1245'
      }
    ],
    paymentMethods: [
      {
        id: 1,
        name: 'Credit Card',
        type: 'Card Payment',
        processingFee: '2.5%',
        status: 'Active',
        supportedCurrencies: ['USD', 'EUR', 'GBP']
      },
      {
        id: 2,
        name: 'Bank Transfer',
        type: 'Direct Deposit',
        processingFee: '0.5%',
        status: 'Active',
        supportedCurrencies: ['USD', 'EUR', 'GBP', 'JPY', 'AUD']
      },
      {
        id: 3,
        name: 'PayPal',
        type: 'Digital Wallet',
        processingFee: '3.0%',
        status: 'Active',
        supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD']
      },
      {
        id: 4,
        name: 'Digital Wallet',
        type: 'Digital Wallet',
        processingFee: '2.0%',
        status: 'Active',
        supportedCurrencies: ['USD', 'EUR']
      },
      {
        id: 5,
        name: 'Cash',
        type: 'Physical Payment',
        processingFee: '0.0%',
        status: 'Active',
        supportedCurrencies: ['USD', 'EUR', 'GBP', 'JPY', 'AUD']
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

  // Render Payment Capture Tab
  const renderPaymentCapture = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>Pending Payments</CardTitle>
              <CardDescription>Payments awaiting processing or verification</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search payments..." 
                  className="w-[200px] pl-8 md:w-[300px]"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button size="sm" onClick={() => setShowPaymentModal(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Record Payment
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentData.pendingPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium text-blue-600">{payment.id}</TableCell>
                    <TableCell>{payment.invoiceRef}</TableCell>
                    <TableCell>{payment.customer}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(payment.amount)}</TableCell>
                    <TableCell>{payment.dueDate}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        payment.status === 'Pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {payment.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" className="h-7 bg-green-600 hover:bg-green-700">
                        Process
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recent Payments</CardTitle>
            <CardDescription>Recently processed payments</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Receipt</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentData.recentPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium text-blue-600">{payment.id}</TableCell>
                    <TableCell>{payment.invoiceRef}</TableCell>
                    <TableCell>{payment.customer}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(payment.amount)}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell className="text-blue-600">{payment.receiptNumber}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  // Render Payment Methods Tab
  const renderPaymentMethods = () => {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Payment Methods</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search payment methods..." 
                className="w-[200px] pl-8 md:w-[300px]"
              />
            </div>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Method Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Processing Fee</TableHead>
                <TableHead>Supported Currencies</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentData.paymentMethods.map((method) => (
                <TableRow key={method.id}>
                  <TableCell className="font-medium">{method.name}</TableCell>
                  <TableCell>{method.type}</TableCell>
                  <TableCell>{method.processingFee}</TableCell>
                  <TableCell>{method.supportedCurrencies.join(', ')}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {method.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };

  // Payment Modal
  const renderPaymentModal = () => {
    return (
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Record New Payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="invoice">Invoice</Label>
              <select
                id="invoice"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="INV-3487">INV-3487 - Business Travel International</option>
                <option value="INV-3485">INV-3485 - Holiday Planners</option>
                <option value="INV-3482">INV-3482 - Executive Travel</option>
                <option value="INV-3480">INV-3480 - World Tours Corp</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <Input
                  id="amount"
                  className="pl-7 pr-12"
                  placeholder="0.00"
                  defaultValue="2450.75"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">USD</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="payment-date">Payment Date</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="payment-date"
                  type="date"
                  className="pl-10"
                  defaultValue="2025-05-02"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    id="payment-method-cc"
                    type="radio"
                    name="payment-method"
                    checked={paymentMethod === 'creditCard'}
                    onChange={() => setPaymentMethod('creditCard')}
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <Label htmlFor="payment-method-cc">Credit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    id="payment-method-bank"
                    type="radio"
                    name="payment-method"
                    checked={paymentMethod === 'bankTransfer'}
                    onChange={() => setPaymentMethod('bankTransfer')}
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <Label htmlFor="payment-method-bank">Bank Transfer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    id="payment-method-paypal"
                    type="radio"
                    name="payment-method"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <Label htmlFor="payment-method-paypal">PayPal</Label>
                </div>
              </div>
            </div>
            
            {paymentMethod === 'creditCard' && (
              <div className="space-y-4 p-4 border border-gray-200 rounded-md bg-gray-50">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input
                    id="card-number"
                    placeholder="•••• •••• •••• ••••"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiration-date">Expiration Date</Label>
                    <Input
                      id="expiration-date"
                      placeholder="MM / YY"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      placeholder="•••"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {paymentMethod === 'bankTransfer' && (
              <div className="space-y-4 p-4 border border-gray-200 rounded-md bg-gray-50">
                <div className="space-y-2">
                  <Label htmlFor="reference-number">Transfer Reference Number</Label>
                  <Input
                    id="reference-number"
                    placeholder="Enter bank reference"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bank-name">Bank Name</Label>
                  <Input
                    id="bank-name"
                    placeholder="Enter bank name"
                  />
                </div>
              </div>
            )}
            
            {paymentMethod === 'paypal' && (
              <div className="space-y-4 p-4 border border-gray-200 rounded-md bg-gray-50">
                <div className="space-y-2">
                  <Label htmlFor="paypal-email">PayPal Email</Label>
                  <Input
                    id="paypal-email"
                    type="email"
                    placeholder="Enter PayPal email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transaction-id">Transaction ID</Label>
                  <Input
                    id="transaction-id"
                    placeholder="Enter PayPal transaction ID"
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <textarea
                id="notes"
                rows={3}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Add any additional notes about this payment"
              ></textarea>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowPaymentModal(false)}>
              Record Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <CreditCard className="h-8 w-8 text-primary mr-2" />
          <h1 className="text-3xl font-bold">Payment Processing</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
          <Button variant="outline" size="sm">
            <DollarSign className="mr-2 h-4 w-4" /> Batch Process
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Pending Payments</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Value: {formatCurrency(11605.50)}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Payments Today</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Value: {formatCurrency(4300.75)}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Overdue Payments</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Value: {formatCurrency(7370.50)}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Processed This Month</p>
                <p className="text-2xl font-bold">42</p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Value: {formatCurrency(98450.25)}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="paymentCapture" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="paymentCapture">Payment Capture</TabsTrigger>
          <TabsTrigger value="paymentVerification">Payment Verification</TabsTrigger>
          <TabsTrigger value="paymentReceipts">Payment Receipts</TabsTrigger>
          <TabsTrigger value="paymentMethods">Payment Methods</TabsTrigger>
        </TabsList>
        <TabsContent value="paymentCapture" className="mt-6">
          {renderPaymentCapture()}
        </TabsContent>
        <TabsContent value="paymentVerification" className="mt-6">
          <Card className="p-6">
            <p className="text-center text-muted-foreground">Payment verification functionality will be implemented soon.</p>
          </Card>
        </TabsContent>
        <TabsContent value="paymentReceipts" className="mt-6">
          <Card className="p-6">
            <p className="text-center text-muted-foreground">Payment receipts functionality will be implemented soon.</p>
          </Card>
        </TabsContent>
        <TabsContent value="paymentMethods" className="mt-6">
          {renderPaymentMethods()}
        </TabsContent>
      </Tabs>
      
      {/* Payment Modal */}
      {renderPaymentModal()}
    </div>
  );
};

export default Payments;
