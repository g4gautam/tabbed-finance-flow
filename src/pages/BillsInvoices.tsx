import React, { useState } from 'react';
import { 
  FileText, Search, Plus, ChevronDown, Filter, 
  Download, Printer, Mail, ExternalLink, 
  Clock, AlertTriangle, CheckCircle, RefreshCw,
  Edit, Trash2, Eye, ArrowRight, Calendar
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const BillsInvoices = () => {
  const [activeTab, setActiveTab] = useState('invoices');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showCreditNoteModal, setShowCreditNoteModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [creditNoteReason, setCreditNoteReason] = useState('');
  const [creditNoteAmount, setCreditNoteAmount] = useState('');
  
  // Sample data
  const invoicingData = {
    recentInvoices: [
      { 
        id: 'INV-3487', 
        customer: 'Business Travel International',
        date: '2025-05-01',
        dueDate: '2025-05-15',
        amount: 2450.75,
        status: 'Pending',
        items: [
          { description: 'Flight Booking: NYC to London', quantity: 2, unitPrice: 850.00, amount: 1700.00 },
          { description: 'Hotel Accommodation: 4 nights', quantity: 4, unitPrice: 175.00, amount: 700.00 },
          { description: 'Travel Insurance', quantity: 2, unitPrice: 25.00, amount: 50.00 }
        ]
      },
      { 
        id: 'INV-3486', 
        customer: 'Luxury Vacations',
        date: '2025-04-30',
        dueDate: '2025-05-14',
        amount: 3675.00,
        status: 'Paid',
        items: [
          { description: 'Premium Flight Booking: MIA to PAR', quantity: 1, unitPrice: 2250.00, amount: 2250.00 },
          { description: 'Luxury Hotel Accommodation: 5 nights', quantity: 5, unitPrice: 275.00, amount: 1375.00 },
          { description: 'Premium Travel Insurance', quantity: 1, unitPrice: 50.00, amount: 50.00 }
        ]
      },
      { 
        id: 'INV-3485', 
        customer: 'Holiday Planners',
        date: '2025-04-28',
        dueDate: '2025-05-12',
        amount: 1785.25,
        status: 'Pending',
        items: [
          { description: 'Group Flight Booking: LAX to MIA', quantity: 5, unitPrice: 275.00, amount: 1375.00 },
          { description: 'Mid-range Hotel: 2 nights', quantity: 5, unitPrice: 75.00, amount: 375.00 },
          { description: 'Basic Travel Insurance', quantity: 5, unitPrice: 7.05, amount: 35.25 }
        ]
      },
      { 
        id: 'INV-3484', 
        customer: 'Executive Travel',
        date: '2025-04-27',
        dueDate: '2025-05-11',
        amount: 4125.50,
        status: 'Paid',
        items: [
          { description: 'Business Class Flight: NYC to HKG', quantity: 1, unitPrice: 3250.00, amount: 3250.00 },
          { description: 'Airport Transfer Service', quantity: 2, unitPrice: 125.00, amount: 250.00 },
          { description: 'Business Travel Insurance', quantity: 1, unitPrice: 85.50, amount: 85.50 },
          { description: 'Priority Check-in Service', quantity: 1, unitPrice: 40.00, amount: 40.00 }
        ]
      },
      { 
        id: 'INV-3483', 
        customer: 'World Tours Corp',
        date: '2025-04-25',
        dueDate: '2025-05-09',
        amount: 6750.00,
        status: 'Overdue',
        items: [
          { description: 'Guided Tour Package: European Highlights', quantity: 2, unitPrice: 2850.00, amount: 5700.00 },
          { description: 'Optional Excursions Bundle', quantity: 2, unitPrice: 450.00, amount: 900.00 },
          { description: 'Comprehensive Travel Insurance', quantity: 2, unitPrice: 75.00, amount: 150.00 }
        ]
      }
    ],
    creditNotes: [
      {
        id: 'CN-0124',
        relatedInvoice: 'INV-3470',
        customer: 'Business Travel International',
        date: '2025-04-20',
        amount: 850.00,
        status: 'Processed',
        reason: 'Flight cancellation'
      },
      {
        id: 'CN-0123',
        relatedInvoice: 'INV-3465',
        customer: 'Holiday Planners',
        date: '2025-04-15',
        amount: 375.00,
        status: 'Processed',
        reason: 'Booking date change fee refund'
      },
      {
        id: 'CN-0122',
        relatedInvoice: 'INV-3460',
        customer: 'World Tours Corp',
        date: '2025-04-10',
        amount: 1250.00,
        status: 'Pending',
        reason: 'Service not provided as described'
      }
    ],
    customers: [
      { id: 1, name: 'Business Travel International', contactPerson: 'Sarah Williams', email: 'swilliams@bti.example.com', phone: '+1 (555) 123-4567' },
      { id: 2, name: 'Luxury Vacations', contactPerson: 'Michael Johnson', email: 'mjohnson@luxvac.example.com', phone: '+1 (555) 234-5678' },
      { id: 3, name: 'Holiday Planners', contactPerson: 'David Chen', email: 'dchen@holidayplanners.example.com', phone: '+1 (555) 345-6789' },
      { id: 4, name: 'Executive Travel', contactPerson: 'Jessica Brown', email: 'jbrown@exectravel.example.com', phone: '+1 (555) 456-7890' },
      { id: 5, name: 'World Tours Corp', contactPerson: 'Robert Smith', email: 'rsmith@worldtours.example.com', phone: '+1 (555) 567-8901' }
    ],
    products: [
      { id: 1, name: 'Economy Flight Booking', category: 'Flights', unitPrice: 275.00 },
      { id: 2, name: 'Business Class Flight', category: 'Flights', unitPrice: 1250.00 },
      { id: 3, name: 'First Class Flight', category: 'Flights', unitPrice: 3250.00 },
      { id: 4, name: 'Standard Hotel Room', category: 'Accommodation', unitPrice: 125.00 },
      { id: 5, name: 'Premium Hotel Room', category: 'Accommodation', unitPrice: 225.00 },
      { id: 6, name: 'Basic Travel Insurance', category: 'Insurance', unitPrice: 25.00 },
      { id: 7, name: 'Comprehensive Travel Insurance', category: 'Insurance', unitPrice: 75.00 },
      { id: 8, name: 'Airport Transfer Service', category: 'Services', unitPrice: 65.00 },
      { id: 9, name: 'Guided Tour Package', category: 'Tours', unitPrice: 850.00 },
      { id: 10, name: 'Visa Processing Fee', category: 'Services', unitPrice: 150.00 }
    ]
  };
  
  // Format currency
  const formatCurrency = (amount: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };
  
  // Get status badge variant based on status
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Paid':
        return <Badge variant="success">{status}</Badge>;
      case 'Pending':
        return <Badge variant="secondary">{status}</Badge>;
      case 'Overdue':
        return <Badge variant="destructive">{status}</Badge>;
      case 'Processed':
        return <Badge variant="success">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  // Handle credit note creation
  const handleCreateCreditNote = () => {
    if (!selectedInvoice) {
      toast({
        title: "Error",
        description: "Please select an invoice",
        variant: "destructive"
      });
      return;
    }

    if (!creditNoteAmount || parseFloat(creditNoteAmount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }

    if (!creditNoteReason) {
      toast({
        title: "Error",
        description: "Please enter a reason for the credit note",
        variant: "destructive"
      });
      return;
    }

    // In a real application, this would be sent to the server
    // For this demo, we'll just show a success message and close the modal
    toast({
      title: "Credit Note Created",
      description: `Credit note for ${formatCurrency(parseFloat(creditNoteAmount))} has been created.`,
    });
    
    setShowCreditNoteModal(false);
    setSelectedInvoice(null);
    setCreditNoteReason('');
    setCreditNoteAmount('');
  };
  
  // Render Invoices Tab
  const renderInvoices = () => {
    return (
      <Card>
        <div className="p-4 flex flex-wrap items-center justify-between border-b">
          <div className="flex items-center w-full md:w-auto mb-3 md:mb-0">
            <div className="relative flex-grow md:max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input 
                className="pl-10"
                placeholder="Search invoices..."
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
            <Button onClick={() => setShowInvoiceModal(true)} className="flex items-center">
              <Plus className="h-4 w-4 mr-2" /> New Invoice
            </Button>
            <Button variant="outline" className="flex items-center">
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoicingData.recentInvoices.map((invoice) => (
                <TableRow key={invoice.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-blue-600">{invoice.id}</TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Printer className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    );
  };
  
  // Render Credit Notes Tab
  const renderCreditNotes = () => {
    return (
      <Card>
        <div className="p-4 flex flex-wrap items-center justify-between border-b">
          <div className="flex items-center w-full md:w-auto mb-3 md:mb-0">
            <div className="relative flex-grow md:max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input 
                className="pl-10"
                placeholder="Search credit notes..."
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
            <Button onClick={() => setShowCreditNoteModal(true)} className="flex items-center">
              <Plus className="h-4 w-4 mr-2" /> New Credit Note
            </Button>
            <Button variant="outline" className="flex items-center">
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Credit Note #</TableHead>
                <TableHead>Related Invoice</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoicingData.creditNotes.map((creditNote) => (
                <TableRow key={creditNote.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-blue-600">{creditNote.id}</TableCell>
                  <TableCell>{creditNote.relatedInvoice}</TableCell>
                  <TableCell>{creditNote.customer}</TableCell>
                  <TableCell>{creditNote.date}</TableCell>
                  <TableCell>{formatCurrency(creditNote.amount)}</TableCell>
                  <TableCell>{creditNote.reason}</TableCell>
                  <TableCell>{getStatusBadge(creditNote.status)}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Printer className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    );
  };
  
  // Render Statements Tab
  const renderStatements = () => {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">Statement Generation</h3>
          <p className="text-gray-500 mb-6">Generate account statements for your customers</p>
          <Button className="mx-auto flex items-center">
            <Plus className="h-4 w-4 mr-2" /> Generate New Statement
          </Button>
        </div>
      </Card>
    );
  };
  
  // Render Templates Tab
  const renderTemplates = () => {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">Document Templates</h3>
          <p className="text-gray-500 mb-6">Manage templates for invoices, credit notes, and statements</p>
          <Button className="mx-auto flex items-center">
            <Eye className="h-4 w-4 mr-2" /> View Templates
          </Button>
        </div>
      </Card>
    );
  };
  
  // Invoice Creation Modal
  const renderInvoiceModal = () => {
    return (
      <Dialog open={showInvoiceModal} onOpenChange={setShowInvoiceModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Customer Selection */}
            <div>
              <label htmlFor="customer" className="block text-sm font-medium text-gray-700 mb-1">
                Customer
              </label>
              <select
                id="customer"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  const customerId = parseInt(e.target.value);
                  setSelectedCustomer(invoicingData.customers.find(c => c.id === customerId) || null);
                }}
              >
                <option value="">Select a customer</option>
                {invoicingData.customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Customer Details */}
            {selectedCustomer && (
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Customer Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Contact Person:</p>
                    <p className="text-sm font-medium">{selectedCustomer.contactPerson}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email:</p>
                    <p className="text-sm font-medium">{selectedCustomer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone:</p>
                    <p className="text-sm font-medium">{selectedCustomer.phone}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Invoice Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="invoice-number" className="block text-sm font-medium text-gray-700 mb-1">
                  Invoice Number
                </label>
                <Input
                  id="invoice-number"
                  value="INV-3488"
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="invoice-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Invoice Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="invoice-date"
                    type="date"
                    className="pl-10"
                    defaultValue="2025-05-02"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="due-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="due-date"
                    type="date"
                    className="pl-10"
                    defaultValue="2025-05-16"
                  />
                </div>
              </div>
            </div>
            
            {/* Line Items */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Invoice Items</h4>
              <div className="border border-gray-200 rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead><span className="sr-only">Actions</span></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <select className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">Select a product</option>
                          {invoicingData.products.map((product) => (
                            <option key={product.id} value={product.id}>
                              {product.name} ({formatCurrency(product.unitPrice)})
                            </option>
                          ))}
                        </select>
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          min="1" 
                          placeholder="Qty"
                          defaultValue="1"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <Input
                            className="pl-7"
                            placeholder="0.00"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        $0.00
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={5}>
                        <Button variant="ghost" className="flex items-center text-blue-600">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Line Item
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <div className="p-4 bg-gray-50 border-t">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Subtotal:</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Tax (0%):</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold">$0.00</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes to appear on the invoice"
                rows={3}
              />
            </div>
            
            {/* Terms and Conditions */}
            <div>
              <label htmlFor="terms" className="block text-sm font-medium text-gray-700 mb-1">
                Terms and Conditions
              </label>
              <Textarea
                id="terms"
                placeholder="Terms and conditions"
                defaultValue="Payment is due within 14 days of invoice date. Late payments are subject to a 2% monthly fee."
                rows={2}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInvoiceModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowInvoiceModal(false)}>
              Create Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  // Credit Note Modal
  const renderCreditNoteModal = () => {
    return (
      <Dialog open={showCreditNoteModal} onOpenChange={setShowCreditNoteModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Credit Note</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="invoice" className="block text-sm font-medium text-gray-700 mb-1">
                Related Invoice
              </label>
              <Select 
                onValueChange={(value) => {
                  const invoice = invoicingData.recentInvoices.find(inv => inv.id === value);
                  setSelectedInvoice(invoice);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an invoice" />
                </SelectTrigger>
                <SelectContent>
                  {invoicingData.recentInvoices.map((invoice) => (
                    <SelectItem key={invoice.id} value={invoice.id}>
                      {invoice.id} - {invoice.customer} ({formatCurrency(invoice.amount)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedInvoice && (
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Invoice Details</h4>
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="text-gray-600">Customer:</span> {selectedInvoice.customer}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">Invoice Date:</span> {selectedInvoice.date}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">Original Amount:</span> {formatCurrency(selectedInvoice.amount)}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">Status:</span> {getStatusBadge(selectedInvoice.status)}
                  </p>
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="credit-note-amount" className="block text-sm font-medium text-gray-700 mb-1">
                Credit Note Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <Input
                  id="credit-note-amount"
                  type="number"
                  placeholder="0.00"
                  className="pl-7"
                  value={creditNoteAmount}
                  onChange={(e) => setCreditNoteAmount(e.target.value)}
                  step="0.01"
                  min="0.01"
                  max={selectedInvoice?.amount || 9999999}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                Reason for Credit Note
              </label>
              <Textarea
                id="reason"
                placeholder="Enter the reason for this credit note"
                value={creditNoteReason}
                onChange={(e) => setCreditNoteReason(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreditNoteModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateCreditNote}>
              Create Credit Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'invoices':
        return renderInvoices();
      case 'creditNotes':
        return renderCreditNotes();
      case 'statements':
        return renderStatements();
      case 'templates':
        return renderTemplates();
      default:
        return (
          <Card className="p-6">
            <div className="text-center py-8">
              <p className="text-gray-500">Select a tab to view content</p>
            </div>
          </Card>
        );
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <FileText className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Billing & Invoicing</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
          <Button variant="outline" className="flex items-center">
            <Printer className="h-4 w-4 mr-2" /> Batch Print
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-gray-500">Invoices This Month</h3>
            <FileText className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">24</p>
          <p className="mt-1 text-sm text-gray-600">Value: {formatCurrency(83750.25)}</p>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-gray-500">Pending Invoices</h3>
            <Clock className="h-5 w-5 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">7</p>
          <p className="mt-1 text-sm text-gray-600">Value: {formatCurrency(19250.50)}</p>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-gray-500">Overdue Invoices</h3>
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">3</p>
          <p className="mt-1 text-sm text-gray-600">Value: {formatCurrency(12750.00)}</p>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-gray-500">Paid Invoices</h3>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">14</p>
          <p className="mt-1 text-sm text-gray-600">Value: {formatCurrency(51750.75)}</p>
        </Card>
      </div>
      
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="creditNotes">Credit Notes & Refunds</TabsTrigger>
          <TabsTrigger value="statements">Statement Generation</TabsTrigger>
          <TabsTrigger value="templates">Document Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="invoices" className="mt-6">
          {renderInvoices()}
        </TabsContent>
        <TabsContent value="creditNotes" className="mt-6">
          {renderCreditNotes()}
        </TabsContent>
        <TabsContent value="statements" className="mt-6">
          {renderStatements()}
        </TabsContent>
        <TabsContent value="templates" className="mt-6">
          {renderTemplates()}
        </TabsContent>
      </Tabs>
      
      {/* Modals */}
      {renderInvoiceModal()}
      {renderCreditNoteModal()}
    </div>
  );
};

export default BillsInvoices;
