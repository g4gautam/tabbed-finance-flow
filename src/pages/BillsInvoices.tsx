
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, CreditCard, Download, RefreshCw, Eye, Filter, Search, 
  Plus, CheckCircle, AlertTriangle, XCircle, ArrowRight, Calendar
} from 'lucide-react';
import { Invoice, CreditNote } from '@/models/financialEntities';
import { useNavigate } from 'react-router-dom';

// Dummy data for invoices with booking and passenger IDs
const invoices: Invoice[] = [
  {
    invoice_id: "FFS-INV-20250505-0001",
    booking_id: "FFS-BKG-20250505-0001",
    passenger_id: "FFS-BKG-20250505-0001-P01",
    amount: 1450.00,
    currency: "USD",
    status: "Paid",
    action_type: "TKT",
    date: "2025-05-05",
    due_date: "2025-05-12"
  },
  {
    invoice_id: "FFS-INV-20250505-0002",
    booking_id: "FFS-BKG-20250505-0001",
    passenger_id: "FFS-BKG-20250505-0001-P02",
    amount: 1450.00,
    currency: "USD",
    status: "Paid",
    action_type: "TKT",
    date: "2025-05-05",
    due_date: "2025-05-12"
  },
  {
    invoice_id: "FFS-INV-20250504-0001",
    booking_id: "FFS-BKG-20250504-0002",
    passenger_id: "FFS-BKG-20250504-0002-P01",
    amount: 1875.50,
    currency: "USD",
    status: "Pending",
    action_type: "TKT",
    date: "2025-05-04",
    due_date: "2025-05-11"
  },
  {
    invoice_id: "FFS-INV-20250503-0001",
    booking_id: "FFS-BKG-20250503-0001",
    amount: 6320.25,
    currency: "USD",
    status: "Overdue",
    action_type: "TKT",
    date: "2025-05-03",
    due_date: "2025-05-10"
  },
  {
    invoice_id: "FFS-INV-20250430-0001",
    booking_id: "FFS-BKG-20250430-0001",
    passenger_id: "FFS-BKG-20250430-0001-P01",
    amount: 950.75,
    currency: "USD",
    status: "Paid",
    action_type: "AMD",
    date: "2025-04-30",
    due_date: "2025-05-07"
  }
];

const creditNotes: CreditNote[] = [
  {
    credit_note_id: "FFS-CN-20250502-0001",
    invoice_id: "FFS-INV-20250502-0001",
    booking_id: "FFS-BKG-20250502-0003",
    passenger_id: "FFS-BKG-20250502-0003-P01",
    amount: 750.25,
    currency: "USD",
    reason: "Flight cancellation",
    status: "Processed",
    date: "2025-05-02"
  },
  {
    credit_note_id: "FFS-CN-20250501-0001",
    invoice_id: "FFS-INV-20250501-0001",
    booking_id: "FFS-BKG-20250501-0001",
    passenger_id: "FFS-BKG-20250501-0001-P01",
    amount: 320.00,
    currency: "USD",
    reason: "Partial refund",
    status: "Pending",
    date: "2025-05-01"
  }
];

const BillsInvoices = () => {
  const [activeTab, setActiveTab] = useState("invoices");
  const navigate = useNavigate();

  // Format currency
  const formatCurrency = (amount: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  // View booking details
  const viewBooking = (bookingId: string) => {
    navigate(`/bookings?id=${bookingId}`);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Bills & Invoices</h1>

      <div className="flex flex-col gap-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">53</p>
                  <p className="text-xs text-muted-foreground">This month</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Pending Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-xs text-muted-foreground">Awaiting payment</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-yellow-50 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Overdue Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-xs text-muted-foreground">Past due date</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Paid Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">42</p>
                  <p className="text-xs text-muted-foreground">This month</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs and Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="invoices" className="flex items-center gap-2">
                <FileText className="h-4 w-4" /> Invoices
              </TabsTrigger>
              <TabsTrigger value="credit-notes" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" /> Credit Notes
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="w-64 pl-10" 
                  placeholder="Search..." 
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Date Range
              </Button>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> New Invoice
              </Button>
            </div>
          </div>

          {/* Invoices Tab */}
          <TabsContent value="invoices">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Action Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.invoice_id}>
                        <TableCell className="font-medium">{invoice.invoice_id}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.due_date}</TableCell>
                        <TableCell>
                          <Button 
                            variant="link" 
                            className="p-0 h-auto font-medium text-primary"
                            onClick={() => viewBooking(invoice.booking_id)}
                          >
                            {invoice.booking_id}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Badge variant={invoice.action_type === 'TKT' ? 'default' : invoice.action_type === 'AMD' ? 'outline' : 'destructive'}>
                            {invoice.action_type === 'TKT' ? 'Ticket' : 
                             invoice.action_type === 'AMD' ? 'Amendment' : 'Refund'}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatCurrency(invoice.amount, invoice.currency)}</TableCell>
                        <TableCell>
                          <Badge variant={
                            invoice.status === 'Paid' ? 'success' : 
                            invoice.status === 'Pending' ? 'warning' : 'destructive'
                          }>
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Credit Notes Tab */}
          <TabsContent value="credit-notes">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Credit Note ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {creditNotes.map((note) => (
                      <TableRow key={note.credit_note_id}>
                        <TableCell className="font-medium">{note.credit_note_id}</TableCell>
                        <TableCell>{note.date}</TableCell>
                        <TableCell>{note.invoice_id}</TableCell>
                        <TableCell>
                          <Button 
                            variant="link" 
                            className="p-0 h-auto font-medium text-primary"
                            onClick={() => viewBooking(note.booking_id)}
                          >
                            {note.booking_id}
                          </Button>
                        </TableCell>
                        <TableCell>{note.reason}</TableCell>
                        <TableCell>{formatCurrency(note.amount, note.currency)}</TableCell>
                        <TableCell>
                          <Badge variant={note.status === 'Processed' ? 'success' : 'warning'}>
                            {note.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BillsInvoices;
