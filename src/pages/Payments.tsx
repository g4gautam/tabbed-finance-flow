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
import { useToast } from "@/hooks/use-toast";
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
  
  // Sample refund data - in a real app, this would come from an API or database
  const refundData = {
    pendingRequests: [
      {
        id: 'REF-1001',
        bookingId: 'BKG-3701',
        passengerId: 'PSG-4501',
        customer: 'James Wilson',
        amount: 1250.00,
        requestDate: '2025-05-01',
        paymentId: 'PMT-2498',
        status: RefundStatus.REFUND_APPLIED,
        reason: 'Flight cancelled by airline',
        priority: 'High'
      },
      {
        id: 'REF-1002',
        bookingId: 'BKG-3705',
        passengerId: 'PSG-4510',
        customer: 'Maria Rodriguez',
        amount: 850.75,
        requestDate: '2025-05-01',
        paymentId: 'PMT-2499',
        status: RefundStatus.REFUND_APPLIED,
        reason: 'Customer requested cancellation',
        priority: 'Medium'
      },
      {
        id: 'REF-1003',
        bookingId: 'BKG-3712',
        passengerId: 'PSG-4525',
        customer: 'Robert Johnson',
        amount: 2100.50,
        requestDate: '2025-04-30',
        paymentId: 'PMT-2495',
        status: RefundStatus.REFUND_APPLIED,
        reason: 'Duplicate booking',
        priority: 'Low'
      },
      {
        id: 'REF-1004',
        bookingId: 'BKG-3715',
        passengerId: 'PSG-4530',
        customer: 'Sarah Thompson',
        amount: 1575.25,
        requestDate: '2025-04-30',
        paymentId: 'PMT-2493',
        status: RefundStatus.REFUND_IN_PROCESS,
        reason: 'Change of travel plans',
        priority: 'Medium'
      }
    ],
    processedRefunds: [
      {
        id: 'REF-0995',
        bookingId: 'BKG-3685',
        passengerId: 'PSG-4480',
        customer: 'Michael Brown',
        amount: 950.00,
        requestDate: '2025-04-28',
        processedDate: '2025-04-29',
        paymentId: 'PMT-2485',
        status: RefundStatus.REFUNDED,
        reason: 'Flight rescheduled',
        processor: 'Alex Johnson',
        transactionId: 'TXN-38495'
      },
      {
        id: 'REF-0996',
        bookingId: 'BKG-3687',
        passengerId: 'PSG-4485',
        customer: 'Emily Davis',
        amount: 1850.25,
        requestDate: '2025-04-27',
        processedDate: '2025-04-29',
        paymentId: 'PMT-2483',
        status: RefundStatus.REFUNDED,
        reason: 'Medical emergency',
        processor: 'Sam Wilson',
        transactionId: 'TXN-38496'
      },
      {
        id: 'REF-0997',
        bookingId: 'BKG-3690',
        passengerId: 'PSG-4490',
        customer: 'Daniel Martinez',
        amount: 750.50,
        requestDate: '2025-04-26',
        processedDate: '2025-04-28',
        paymentId: 'PMT-2480',
        status: RefundStatus.REFUND_REJECTED,
        reason: 'Non-refundable fare',
        processor: 'Emma Clark',
        notes: 'Customer was informed about non-refundable policy during booking'
      },
      {
        id: 'REF-0998',
        bookingId: 'BKG-3692',
        passengerId: 'PSG-4495',
        customer: 'Olivia Johnson',
        amount: 1200.00,
        requestDate: '2025-04-25',
        processedDate: '2025-04-28',
        paymentId: 'PMT-2478',
        status: RefundStatus.REFUNDED,
        reason: 'Service quality issue',
        processor: 'Alex Johnson',
        transactionId: 'TXN-38493'
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
                
                <div>
                  <div className="text-sm text-gray-500">Customer:</div>
                  <div className="font-medium">{selectedReceipt.customer}</div>
                </div>
                
                <div className="border-t pt-3 space-y-2">
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
                      <div className="text-sm
