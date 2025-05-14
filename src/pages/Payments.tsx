import React, { useState } from 'react';
import { 
  Search, Filter, Plus, Download, RefreshCw, Eye, 
  CreditCard, DollarSign, Wallet, Receipt, Calendar,
  CheckCircle, AlertTriangle, Printer, FileText, 
  Edit, Trash2, ChevronDown, Check, BadgeDollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Payment } from '@/models/financialEntities';
import { useToast } from '@/components/ui/use-toast';
import { 
  BookingStatus, RefundStatus, 
  Booking, Passenger
} from '../models/financialEntities';
import { 
  REFUND_IN_PROGRESS_STATUSES,
  REFUND_COMPLETED_STATUSES,
  getRefundStatusVariant
} from '../constants/statusCodes';
import { RefundService } from '../services/refundService';

const Payments = () => {
  const [activeTab, setActiveTab] = useState('paymentCapture');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);
  const [selectedVerificationItem, setSelectedVerificationItem] = useState<any>(null);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState<any>(null);
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>(null);
  const { toast } = useToast();
  
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
    ],
    verificationQueue: [
      {
        id: 'VRF-1001',
        paymentId: 'PMT-2501',
        invoiceRef: 'INV-3487',
        customer: 'Business Travel International',
        amount: 2450.75,
        method: 'Credit Card',
        dateSubmitted: '2025-05-02',
        status: 'Pending',
        issues: null
      },
      {
        id: 'VRF-1002',
        paymentId: 'PMT-2502',
        invoiceRef: 'INV-3485',
        customer: 'Holiday Planners',
        amount: 1785.25,
        method: 'Bank Transfer',
        dateSubmitted: '2025-05-02',
        status: 'Pending',
        issues: null
      },
      {
        id: 'VRF-1003',
        paymentId: 'PMT-2505',
        invoiceRef: 'INV-3490',
        customer: 'Mountain Expeditions',
        amount: 3750.00,
        method: 'Credit Card',
        dateSubmitted: '2025-05-01',
        status: 'Issue',
        issues: 'Invalid card authorization code'
      },
      {
        id: 'VRF-1004',
        paymentId: 'PMT-2506',
        invoiceRef: 'INV-3491',
        customer: 'Ocean Cruises',
        amount: 5200.50,
        method: 'Bank Transfer',
        dateSubmitted: '2025-05-01',
        status: 'Issue',
        issues: 'Reference number mismatch'
      }
    ],
    receipts: [
      {
        id: 'RCP-1248',
        paymentId: 'PMT-2498',
        invoiceRef: 'INV-3478',
        customer: 'Business Travel International',
        amount: 1850.00,
        date: '2025-05-01',
        method: 'Credit Card',
        cardLast4: '4242',
        cardType: 'Visa',
        authorizationCode: 'AUTH123456',
        bankReference: null,
        receiptSent: true
      },
      {
        id: 'RCP-1247',
        paymentId: 'PMT-2499',
        invoiceRef: 'INV-3477',
        customer: 'Luxury Vacations',
        amount: 3675.00,
        date: '2025-04-30',
        method: 'Bank Transfer',
        cardLast4: null,
        cardType: null,
        authorizationCode: null,
        bankReference: 'BTRFS29384756',
        receiptSent: true
      },
      {
        id: 'RCP-1246',
        paymentId: 'PMT-2500',
        invoiceRef: 'INV-3475',
        customer: 'Adventure Tours',
        amount: 2250.25,
        date: '2025-04-29',
        method: 'PayPal',
        cardLast4: null,
        cardType: null,
        authorizationCode: 'PP383752991',
        bankReference: null,
        receiptSent: false
      },
      {
        id: 'RCP-1245',
        paymentId: 'PMT-2497',
        invoiceRef: 'INV-3474',
        customer: 'Family Getaways',
        amount: 1950.75,
        date: '2025-04-28',
        method: 'Credit Card',
        cardLast4: '1234',
        cardType: 'MasterCard',
        authorizationCode: 'AUTH654321',
        bankReference: null,
        receiptSent: true
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

  // Handle refund processing
  const handleProcessRefund = (refund: any, approved: boolean) => {
    // In a real application, this would call an API to process the refund
    setSelectedRefund(null);
    setShowRefundModal(false);
    
    // Show feedback toast
    toast({
      title: approved ? "Refund approved" : "Refund rejected",
      description: `${refund.id} for ${formatCurrency(refund.amount)} has been ${approved ? 'approved' : 'rejected'}.`,
      variant: approved ? "default" : "destructive",
    });
  };

  // Handle payment method actions
  const handleAddPaymentMethod = () => {
    setSelectedPaymentMethod(null);
    setShowPaymentMethodModal(true);
  };

  const handleEditPaymentMethod = (method: any) => {
    setSelectedPaymentMethod(method);
    setShowPaymentMethodModal(true);
  };
  
  const handleSavePaymentMethod = (method: any) => {
    // In a real application, this would call an API to save the payment method
    setShowPaymentMethodModal(false);
    
    // Show feedback toast
    toast({
      title: selectedPaymentMethod ? "Payment method updated" : "Payment method added",
      description: `${method.name} has been ${selectedPaymentMethod ? 'updated' : 'added'} successfully.`,
      variant: "default",
    });
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
  
  // Render Payment Verification Tab
  const renderPaymentVerification = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>Payment Verification Queue</CardTitle>
              <CardDescription>Payments requiring verification before processing</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search verifications..." 
                  className="w-[200px] pl-8 md:w-[300px]"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
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
                  <TableHead>Verification ID</TableHead>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentData.verificationQueue.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell className="text-blue-600">{item.paymentId}</TableCell>
                    <TableCell>{item.invoiceRef}</TableCell>
                    <TableCell>{item.customer}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(item.amount)}</TableCell>
                    <TableCell>{item.method}</TableCell>
                    <TableCell>{item.dateSubmitted}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === 'Issue' ? "destructive" : "outline"}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        onClick={() => setSelectedVerificationItem(item)}
                        className={item.status === 'Issue' ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}
                      >
                        {item.status === 'Issue' ? 'Resolve Issue' : 'Verify'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {selectedVerificationItem && (
          <Dialog open={!!selectedVerificationItem} onOpenChange={() => setSelectedVerificationItem(null)}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{selectedVerificationItem.status === 'Issue' ? 'Resolve Verification Issue' : 'Verify Payment'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Verification ID</Label>
                    <p className="font-medium">{selectedVerificationItem.id}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Payment ID</Label>
                    <p className="font-medium text-blue-600">{selectedVerificationItem.paymentId}</p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm text-muted-foreground">Customer</Label>
                  <p className="font-medium">{selectedVerificationItem.customer}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Amount</Label>
                    <p className="font-medium">{formatCurrency(selectedVerificationItem.amount)}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Payment Method</Label>
                    <p className="font-medium">{selectedVerificationItem.method}</p>
                  </div>
                </div>
                
                {selectedVerificationItem.status === 'Issue' && (
                  <div>
                    <Label className="text-sm text-muted-foreground">Issue Description</Label>
                    <p className="text-red-600">{selectedVerificationItem.issues}</p>
                  </div>
                )}
                
                <div>
                  <Label htmlFor="verification-notes">Verification Notes</Label>
                  <textarea
                    id="verification-notes"
                    className="mt-1 block w-full rounded-md border border-input px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    rows={3}
                    placeholder="Add notes about this verification..."
                  ></textarea>
                </div>
              </div>
              <DialogFooter className="sm:justify-start">
                <div className="w-full flex justify-between">
                  <Button variant="outline" onClick={() => setSelectedVerificationItem(null)}>Cancel</Button>
                  <div className="space-x-2">
                    {selectedVerificationItem.status === 'Issue' && (
                      <Button variant="destructive">
                        Reject Payment
                      </Button>
                    )}
                    <Button onClick={() => setSelectedVerificationItem(null)}>
                      {selectedVerificationItem.status === 'Issue' ? 'Mark as Resolved' : 'Approve Payment'}
                    </Button>
                  </div>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    );
  };

  // Render Payment Receipts Tab
  const renderPaymentReceipts = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>Payment Receipts</CardTitle>
              <CardDescription>View and manage payment receipts</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search receipts..." 
                  className="w-[200px] pl-8 md:w-[300px]"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
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
                  <TableHead>Receipt ID</TableHead>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Receipt Sent</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentData.receipts.map((receipt) => (
                  <TableRow key={receipt.id}>
                    <TableCell className="font-medium text-blue-600">{receipt.id}</TableCell>
                    <TableCell>{receipt.paymentId}</TableCell>
                    <TableCell>{receipt.customer}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(receipt.amount)}</TableCell>
                    <TableCell>{receipt.date}</TableCell>
                    <TableCell>{receipt.method}</TableCell>
                    <TableCell>
                      {receipt.receiptSent ? (
                        <Badge variant="success" className="bg-green-100 text-green-800 hover:bg-green-100">
                          <CheckCircle className="mr-1 h-3 w-3" /> Sent
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                          Pending
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-blue-600"
                          onClick={() => {
                            setSelectedReceipt(receipt);
                            setShowReceiptModal(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                          <Printer className="h-4 w-4" />
                        </Button>
                        {!receipt.receiptSent && (
                          <Button variant="outline" size="sm" className="h-7 text-xs">
                            Send Receipt
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Receipt Modal */}
        {showReceiptModal && selectedReceipt && (
          <Dialog open={showReceiptModal} onOpenChange={setShowReceiptModal}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Receipt Details</DialogTitle>
              </DialogHeader>
              <div className="p-4 border rounded-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">Payment Receipt</div>
                  <div className="text-sm text-gray-500">{selectedReceipt.date}</div>
                </div>
                
                <div className="border-t border-b py-3 space-y-2">
                  <div className="grid grid-cols-2">
                    <div className="text-sm text-gray-500">Receipt ID:</div>
                    <div className="font-medium">{selectedReceipt.id}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="text-sm text-gray-500">Payment ID:</div>
                    <div className="font-medium">{selectedReceipt.paymentId}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="text-sm text-gray-500">Invoice:</div>
                    <div className="font-medium">{selectedReceipt.invoiceRef}</div>
                  </div>
                </div>
                
                <div className="border-b py-3 space-y-2">
                  <div className="grid grid-cols-2">
                    <div className="text-sm text-gray-500">Customer:</div>
                    <div className="font-medium">{selectedReceipt.customer}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="text-sm text-gray-500">Amount:</div>
                    <div className="font-medium">{formatCurrency(selectedReceipt.amount)}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="text-sm text-gray-500">Payment Method:</div>
                    <div className="font-medium">{selectedReceipt.method}</div>
                  </div>
                  {selectedReceipt.cardLast4 && (
                    <div className="grid grid-cols-2">
                      <div className="text-sm text-gray-500">Card Details:</div>
                      <div className="font-medium">{selectedReceipt.cardType} ending in {selectedReceipt.cardLast4}</div>
                    </div>
                  )}
                  {selectedReceipt.authorizationCode && (
                    <div className="grid grid-cols-2">
                      <div className="text-sm text-gray-500">Authorization:</div>
                      <div className="font-medium">{selectedReceipt.authorizationCode}</div>
                    </div>
                  )}
                  {selectedReceipt.bankReference && (
                    <div className="grid grid-cols-2">
                      <div className="text-sm text-gray-500">Bank Reference:</div>
                      <div className="font-medium">{selectedReceipt.bankReference}</div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <div className="text-sm text-gray-500">Generated on {new Date().toLocaleDateString()}</div>
                  <div className="text-sm font-medium">Thank you for your business</div>
                </div>
              </div>
              <DialogFooter className="sm:justify-start">
                <div className="w-full flex justify-between">
                  <Button variant="outline" onClick={() => setShowReceiptModal(false)}>Close</Button>
                  <div className="space-x-2">
                    <Button variant="outline">
                      <Printer className="mr-2 h-4 w-4" />
                      Print
                    </Button>
                    <Button>
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    );
  };

  // Render Payment Methods Tab
  const renderPaymentMethods = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Configure and manage payment methods</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search payment methods..." 
                  className="w-[200px] pl-8 md:w-[300px]"
                />
              </div>
              <Button size="sm" onClick={handleAddPaymentMethod}>
                <Plus className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Processing Fee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Currencies</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentData.paymentMethods.map((method) => (
                  <TableRow key={method.id}>
                    <TableCell className="font-medium">{method.name}</TableCell>
                    <TableCell>{method.type}</TableCell>
                    <TableCell>{method.processingFee}</TableCell>
                    <TableCell>
                      <Badge variant={method.status === 'Active' ? "success" : "secondary"}>
                        {method.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{method.supportedCurrencies.join(', ')}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditPaymentMethod(method)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50">
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
      </div>
    );
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Payments & Refunds</h1>
          <p className="text-muted-foreground">Manage payments, refunds, and receipts</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="paymentCapture" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full max-w-xl">
          <TabsTrigger value="paymentCapture">
            <CreditCard className="mr-2 h-4 w-4" />
            Payment Capture
          </TabsTrigger>
          <TabsTrigger value="verification">
            <CheckCircle className="mr-2 h-4 w-4" />
            Verification
          </TabsTrigger>
          <TabsTrigger value="receipts">
            <Receipt className="mr-2 h-4 w-4" />
            Receipts
          </TabsTrigger>
          <TabsTrigger value="refunds">
            <Wallet className="mr-2 h-4 w-4" />
            Refunds
          </TabsTrigger>
          <TabsTrigger value="paymentMethods">
            <BadgeDollarSign className="mr-2 h-4 w-4" />
            Payment Methods
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="paymentCapture">
          {renderPaymentCapture()}
        </TabsContent>
        
        <TabsContent value="verification">
          {renderPaymentVerification()}
        </TabsContent>
        
        <TabsContent value="receipts">
          {renderPaymentReceipts()}
        </TabsContent>
        
        <TabsContent value="refunds">
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle>Pending Refund Requests</CardTitle>
                  <CardDescription>Refund requests awaiting processing</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="search" 
                      placeholder="Search refunds..." 
                      className="w-[200px] pl-8 md:w-[300px]"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
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
                      <TableHead>Refund ID</TableHead>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Request Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {refundData.pendingRequests.map((refund) => (
                      <TableRow key={refund.id}>
                        <TableCell className="font-medium text-blue-600">{refund.id}</TableCell>
                        <TableCell>{refund.bookingId}</TableCell>
                        <TableCell>{refund.customer}</TableCell>
                        <TableCell className="font-medium">{formatCurrency(refund.amount)}</TableCell>
                        <TableCell>{refund.requestDate}</TableCell>
                        <TableCell>
                          <Badge variant={
                            REFUND_IN_PROGRESS_STATUSES.includes(refund.status) ? 
                              "outline" : 
                              getRefundStatusVariant(refund.status)
                          }>
                            {refund.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            refund.priority === 'High' 
                              ? 'bg-red-100 text-red-800' 
                              : refund.priority === 'Medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                          }`}>
                            {refund.priority}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm"
                            onClick={() => {
                              setSelectedRefund(refund);
                              setShowRefundModal(true);
                            }}
                          >
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
                <CardTitle>Processed Refunds</CardTitle>
                <CardDescription>History of processed refund requests</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Refund ID</TableHead>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Request Date</TableHead>
                      <TableHead>Process Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Processor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {refundData.processedRefunds.map((refund) => (
                      <TableRow key={refund.id}>
                        <TableCell className="font-medium text-blue-600">{refund.id}</TableCell>
                        <TableCell>{refund.bookingId}</TableCell>
                        <TableCell>{refund.customer}</TableCell>
                        <TableCell className="font-medium">{formatCurrency(refund.amount)}</TableCell>
                        <TableCell>{refund.requestDate}</TableCell>
                        <TableCell>{refund.processedDate}</TableCell>
                        <TableCell>
                          <Badge variant={getRefundStatusVariant(refund.status)}>
                            {refund.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{refund.processor}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="paymentMethods">
          {renderPaymentMethods()}
        </TabsContent>
      </Tabs>
      
      {/* Payment Modal */}
      {showPaymentModal && (
        <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Record New Payment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="invoice">Invoice</Label>
                <Input id="invoice" placeholder="Select invoice..." />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customer">Customer</Label>
                  <Input id="customer" placeholder="Customer name..." />
                </div>
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" placeholder="0.00" />
                </div>
              </div>
              
              <div>
                <Label>Payment Method</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <RadioGroupItem value="creditCard" id="creditCard" className="peer sr-only" />
                    <Label
                      htmlFor="creditCard"
                      className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Credit Card
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="bankTransfer" id="bankTransfer" className="peer sr-only" />
                    <Label
                      htmlFor="bankTransfer"
                      className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Receipt className="mr-2 h-4 w-4" />
                      Bank Transfer
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              {paymentMethod === 'creditCard' && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="XXXX XXXX XXXX XXXX" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input id="expiryDate" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                </div>
              )}
              
              {paymentMethod === 'bankTransfer' && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="accountName">Account Name</Label>
                    <Input id="accountName" placeholder="Account holder name..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input id="accountNumber" placeholder="Account number..." />
                    </div>
                    <div>
                      <Label htmlFor="bankCode">Bank Code</Label>
                      <Input id="bankCode" placeholder="Bank code..." />
                    </div>
                  </div>
                </div>
              )}
              
              <div>
                <Label htmlFor="notes">Payment Notes</Label>
                <textarea
                  id="notes"
                  className="mt-1 block w-full rounded-md border border-input px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  rows={3}
                  placeholder="Add notes about this payment..."
                ></textarea>
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <Button variant="outline" onClick={() => setShowPaymentModal(false)}>Cancel</Button>
              <Button onClick={() => setShowPaymentModal(false)}>Process Payment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Refund Modal */}
      {showRefundModal && selectedRefund && (
        <Dialog open={showRefundModal} onOpenChange={setShowRefundModal}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Process Refund Request</DialogTitle>
            </DialogHeader>
            <div className="p-4 border rounded-md space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Refund ID</Label>
                  <p className="font-medium text-blue-600">{selectedRefund.id}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Booking ID</Label>
                  <p className="font-medium">{selectedRefund.bookingId}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm text-muted-foreground">Customer</Label>
                <p className="font-medium">{selectedRefund.customer}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Amount</Label>
                  <p className="font-medium">{formatCurrency(selectedRefund.amount)}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Request Date</Label>
                  <p className="font-medium">{selectedRefund.requestDate}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm text-muted-foreground">Reason</Label>
                <p>{selectedRefund.reason}</p>
              </div>
              
              <div>
                <Label htmlFor="refund-notes">Processing Notes</Label>
                <textarea
                  id="refund-notes"
                  className="mt-1 block w-full rounded-md border border-input px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  rows={3}
                  placeholder="Add notes about this refund processing..."
                ></textarea>
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <div className="w-full flex justify-between">
                <Button variant="outline" onClick={() => setShowRefundModal(false)}>Cancel</Button>
                <div className="space-x-2">
                  <Button variant="destructive" onClick={() => handleProcessRefund(selectedRefund, false)}>
                    Reject Refund
                  </Button>
                  <Button onClick={() => handleProcessRefund(selectedRefund, true)}>
                    Approve Refund
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Payment Method Modal */}
      {showPaymentMethodModal && (
        <Dialog open={showPaymentMethodModal} onOpenChange={setShowPaymentMethodModal}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {selectedPaymentMethod ? 'Edit Payment Method' : 'Add Payment Method'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="methodName">Method Name</Label>
                <Input 
                  id="methodName" 
                  placeholder="Credit Card, Bank Transfer, etc..." 
                  defaultValue={selectedPaymentMethod?.name || ''}
                />
              </div>
              
              <div>
                <Label htmlFor="methodType">Method Type</Label>
                <Input 
                  id="methodType" 
                  placeholder="Card Payment, Digital Wallet, etc..." 
                  defaultValue={selectedPaymentMethod?.type || ''}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="processingFee">Processing Fee</Label>
                  <Input 
                    id="processingFee" 
                    placeholder="2.5%" 
                    defaultValue={selectedPaymentMethod?.processingFee || ''}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Input 
                    id="status" 
                    placeholder="Active, Inactive" 
                    defaultValue={selectedPaymentMethod?.status || 'Active'}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="currencies">Supported Currencies</Label>
                <Input 
                  id="currencies" 
                  placeholder="USD, EUR, GBP (comma-separated)" 
                  defaultValue={selectedPaymentMethod?.supportedCurrencies.join(', ') || ''}
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <Button variant="outline" onClick={() => setShowPaymentMethodModal(false)}>Cancel</Button>
              <Button onClick={() => handleSavePaymentMethod({
                name: 'New Payment Method',
                type: 'Digital Payment',
                processingFee: '2.0%',
                status: 'Active',
                supportedCurrencies: ['USD', 'EUR']
              })}>
                {selectedPaymentMethod ? 'Update' : 'Add'} Payment Method
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Payments;
