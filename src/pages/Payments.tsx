
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
  Search, Filter, Plus, Download, RefreshCw, Eye, 
  CreditCard, DollarSign, Wallet, BankCheck, Calendar
} from 'lucide-react';
import { Payment } from '@/models/financialEntities';
import { useNavigate } from 'react-router-dom';

// Dummy data for payments with booking and passenger references
const payments: Payment[] = [
  {
    payment_id: "FFS-PAY-20250505-0001",
    invoice_id: "FFS-INV-20250505-0001",
    booking_id: "FFS-BKG-20250505-0001",
    amount: 2900.00,
    currency: "USD",
    method: "Credit Card",
    status: "Completed",
    date: "2025-05-05",
    reference: "TXREF-85421"
  },
  {
    payment_id: "FFS-PAY-20250504-0001",
    invoice_id: "FFS-INV-20250504-0001",
    booking_id: "FFS-BKG-20250504-0002",
    passenger_id: "FFS-BKG-20250504-0002-P01",
    amount: 1875.50,
    currency: "USD",
    method: "Bank Transfer",
    status: "Pending",
    date: "2025-05-04",
    reference: "BKTR-74125"
  },
  {
    payment_id: "FFS-PAY-20250503-0001",
    invoice_id: "FFS-INV-20250503-0001",
    booking_id: "FFS-BKG-20250503-0001",
    amount: 6320.25,
    currency: "USD",
    method: "Credit Card",
    status: "Completed",
    date: "2025-05-03",
    reference: "TXREF-85412"
  },
  {
    payment_id: "FFS-PAY-20250430-0001",
    invoice_id: "FFS-INV-20250430-0001",
    booking_id: "FFS-BKG-20250430-0001",
    passenger_id: "FFS-BKG-20250430-0001-P01",
    amount: 950.75,
    currency: "USD",
    method: "PayPal",
    status: "Completed",
    date: "2025-04-30",
    reference: "PYPL-45127"
  },
  {
    payment_id: "FFS-PAY-20250428-0001",
    invoice_id: "FFS-INV-20250428-0001",
    booking_id: "FFS-BKG-20250428-0001",
    amount: 1250.00,
    currency: "USD",
    method: "Bank Transfer",
    status: "Failed",
    date: "2025-04-28",
    reference: "BKTR-74118"
  }
];

const PaymentsPage = () => {
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
      <h1 className="text-3xl font-bold mb-6">Payments</h1>

      <div className="flex flex-col gap-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{formatCurrency(145620.50)}</p>
                  <p className="text-xs text-muted-foreground">This month</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Credit Card Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{formatCurrency(98450.25)}</p>
                  <p className="text-xs text-muted-foreground">67% of total</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Bank Transfers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{formatCurrency(35270.00)}</p>
                  <p className="text-xs text-muted-foreground">24% of total</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                  <BankCheck className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Other Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{formatCurrency(11900.25)}</p>
                  <p className="text-xs text-muted-foreground">9% of total</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payments Table */}
        <Card>
          <CardHeader className="px-6 py-4 border-b">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium text-gray-800">Payment Transactions</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    className="w-64 pl-10" 
                    placeholder="Search payments..." 
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" /> Filter
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Date Range
                </Button>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Record Payment
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.payment_id}>
                    <TableCell className="font-medium">{payment.payment_id}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.invoice_id}</TableCell>
                    <TableCell>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto font-medium text-primary"
                        onClick={() => viewBooking(payment.booking_id)}
                      >
                        {payment.booking_id}
                      </Button>
                    </TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>{formatCurrency(payment.amount, payment.currency)}</TableCell>
                    <TableCell>
                      <Badge variant={
                        payment.status === 'Completed' ? 'success' : 
                        payment.status === 'Pending' ? 'warning' : 'destructive'
                      }>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{payment.reference}</TableCell>
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
      </div>
    </div>
  );
};

export default PaymentsPage;
