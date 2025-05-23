import React, { useState, useEffect } from 'react';
import { 
  Ticket, Search, Filter, Plus, Edit, Trash2, 
  ChevronDown, Download, RefreshCw, Eye, Users,
  Calendar, CheckCheck, ChartPie, ArrowUp, ArrowDown
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  BookingStatus, 
  AmendStatus, 
  RefundStatus,
  Booking as BookingType,
  Passenger as PassengerType,
  Invoice as InvoiceType,
  Payment as PaymentType
} from "@/models/financialEntities";
import {
  getBookingStatusVariant,
  getAmendStatusVariant,
  getRefundStatusVariant,
  isActiveBooking,
  isCompletedBooking,
  isCancelledBooking,
  isRefundable
} from "@/constants/statusCodes";
import { RefundService } from "@/services/refundService";

const Bookings = () => {
  const [activeTab, setActiveTab] = useState('activeBookings');
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const { toast } = useToast();

  // Sample mock data for the passenger-centric booking model with updated statuses
  const mockBookings: BookingType[] = [
    {
      booking_id: 'FFS-BKG-20250508-0001',
      agent_id: 101,
      agent_name: 'Business Travel International',
      total_amount: 2540.50,
      currency: 'USD',
      status: BookingStatus.TICKETED,
      created_at: '2025-05-08',
      route: 'NYC-LON',
      departure_date: '2025-06-15',
      return_date: '2025-06-22',
      passenger_count: 3,
      amend_status: AmendStatus.NONE,
      refund_status: RefundStatus.NONE
    } as any, // Using 'any' for mock data with extra non-interface properties
    {
      booking_id: 'FFS-BKG-20250507-0002',
      agent_id: 102,
      agent_name: 'Luxury Vacations',
      total_amount: 4750.25,
      currency: 'USD',
      status: BookingStatus.CONFIRMED,
      created_at: '2025-05-07',
      route: 'LAX-TYO',
      departure_date: '2025-07-01',
      return_date: '2025-07-15',
      passenger_count: 2,
      amend_status: AmendStatus.NONE,
      refund_status: RefundStatus.NONE
    } as any,
    {
      booking_id: 'FFS-BKG-20250506-0003',
      agent_id: 103,
      agent_name: 'Holiday Planners',
      total_amount: 1850.00,
      currency: 'USD',
      status: BookingStatus.CANCELLED,
      created_at: '2025-05-06',
      route: 'JFK-CDG',
      departure_date: '2025-06-20',
      return_date: '2025-06-27',
      passenger_count: 1,
      amend_status: AmendStatus.NONE,
      refund_status: RefundStatus.NONE
    } as any,
    {
      booking_id: 'FFS-BKG-20250505-0004',
      agent_id: 104,
      agent_name: 'Executive Travel',
      total_amount: 5240.75,
      currency: 'USD',
      status: BookingStatus.TICKETED,
      created_at: '2025-05-05',
      route: 'SFO-SYD',
      departure_date: '2025-05-10',
      return_date: '2025-05-20',
      passenger_count: 4,
      amend_status: AmendStatus.DEP_AMENDED,
      refund_status: RefundStatus.NONE
    } as any,
    {
      booking_id: 'FFS-BKG-20250504-0005',
      agent_id: 105,
      agent_name: 'World Tours Corp',
      total_amount: 3120.50,
      currency: 'USD',
      status: BookingStatus.TICKETED,
      created_at: '2025-05-04',
      route: 'ORD-FRA',
      departure_date: '2025-06-05',
      return_date: '2025-06-12',
      passenger_count: 2,
      amend_status: AmendStatus.NONE,
      refund_status: RefundStatus.REFUND_IN_PROCESS
    } as any
  ];

  const mockPassengers: PassengerType[] = [
    {
      passenger_id: 'FFS-BKG-20250508-0001-P01',
      booking_id: 'FFS-BKG-20250508-0001',
      name: 'John Smith',
      ticket_number: '1234567890123',
      status: BookingStatus.TICKETED,
      fare_amount: 950.25,
      fare_type: 'Business',
      amend_status: AmendStatus.NONE,
      refund_status: RefundStatus.NONE
    },
    {
      passenger_id: 'FFS-BKG-20250508-0001-P02',
      booking_id: 'FFS-BKG-20250508-0001',
      name: 'Jane Smith',
      ticket_number: '1234567890124',
      status: BookingStatus.TICKETED,
      fare_amount: 950.25,
      fare_type: 'Business',
      amend_status: AmendStatus.NONE,
      refund_status: RefundStatus.NONE
    },
    {
      passenger_id: 'FFS-BKG-20250508-0001-P03',
      booking_id: 'FFS-BKG-20250508-0001',
      name: 'Mike Johnson',
      ticket_number: '1234567890125',
      status: BookingStatus.TICKETED,
      fare_amount: 640.00,
      fare_type: 'Economy',
      amend_status: AmendStatus.NONE,
      refund_status: RefundStatus.NONE
    }
  ];

  // Sample mock data for the passenger-centric booking model
  const mockInvoices: InvoiceType[] = [
    {
      invoice_id: 'FFS-INV-20250508-0001',
      booking_id: 'FFS-BKG-20250508-0001',
      passenger_id: 'FFS-BKG-20250508-0001-P01',
      amount: 950.25,
      currency: 'USD',
      status: 'Paid',
      action_type: 'TKT',
      date: '2025-05-08',
      due_date: '2025-05-18'
    },
    {
      invoice_id: 'FFS-INV-20250508-0002',
      booking_id: 'FFS-BKG-20250508-0001',
      passenger_id: 'FFS-BKG-20250508-0001-P02',
      amount: 950.25,
      currency: 'USD',
      status: 'Paid',
      action_type: 'TKT',
      date: '2025-05-08',
      due_date: '2025-05-18'
    },
    {
      invoice_id: 'FFS-INV-20250508-0003',
      booking_id: 'FFS-BKG-20250508-0001',
      passenger_id: 'FFS-BKG-20250508-0001-P03',
      amount: 640.00,
      currency: 'USD',
      status: 'Paid',
      action_type: 'TKT',
      date: '2025-05-08',
      due_date: '2025-05-18'
    },
    {
      invoice_id: 'FFS-INV-20250510-0004',
      booking_id: 'FFS-BKG-20250508-0001',
      passenger_id: 'FFS-BKG-20250508-0001-P01',
      amount: 75.00,
      currency: 'USD',
      status: 'Pending',
      action_type: 'AMD',
      date: '2025-05-10',
      due_date: '2025-05-20'
    }
  ];

  const mockPayments: PaymentType[] = [
    {
      payment_id: 'FFS-PAY-20250508-0001',
      invoice_id: 'FFS-INV-20250508-0001',
      booking_id: 'FFS-BKG-20250508-0001',
      passenger_id: 'FFS-BKG-20250508-0001-P01',
      amount: 950.25,
      currency: 'USD',
      method: 'Credit Card',
      status: 'Completed',
      date: '2025-05-08',
      reference: 'PYCRD12345'
    },
    {
      payment_id: 'FFS-PAY-20250508-0002',
      invoice_id: 'FFS-INV-20250508-0002',
      booking_id: 'FFS-BKG-20250508-0001',
      passenger_id: 'FFS-BKG-20250508-0001-P02',
      amount: 950.25,
      currency: 'USD',
      method: 'Credit Card',
      status: 'Completed',
      date: '2025-05-08',
      reference: 'PYCRD12346'
    },
    {
      payment_id: 'FFS-PAY-20250508-0003',
      invoice_id: 'FFS-INV-20250508-0003',
      booking_id: 'FFS-BKG-20250508-0001',
      passenger_id: 'FFS-BKG-20250508-0001-P03',
      amount: 640.00,
      currency: 'USD',
      method: 'Bank Transfer',
      status: 'Completed',
      date: '2025-05-08',
      reference: 'PYBNK12347'
    }
  ];

  // Function to handle applying for a refund
  const handleApplyForRefund = (bookingId: string) => {
    const booking = mockBookings.find(b => b.booking_id === bookingId);
    if (!booking) return;

    // Check if the booking is eligible for refund
    if (RefundService.isBookingRefundEligible(booking, mockInvoices, mockPayments)) {
      // In a real app, you would update this in your database
      // For mock data, we're just showing a toast notification
      toast({
        title: "Refund Applied",
        description: `Refund application submitted for booking ${bookingId}`,
      });
    } else {
      toast({
        title: "Not Eligible for Refund",
        description: "This booking is not eligible for a refund.",
        variant: "destructive",
      });
    }
  };

  // Function to check if a passenger is eligible for refund
  const isPassengerRefundEligible = (passengerId: string): boolean => {
    const passenger = mockPassengers.find(p => p.passenger_id === passengerId);
    if (!passenger) return false;
    
    return RefundService.isPassengerRefundEligible(passenger, mockInvoices, mockPayments);
  };

  // Format currency
  const formatCurrency = (amount: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  // Filter bookings based on active tab
  const filteredBookings = mockBookings.filter(booking => {
    if (activeTab === 'activeBookings') {
      return isActiveBooking(booking.status, booking.refund_status);
    }
    if (activeTab === 'completedBookings') {
      return isCompletedBooking(booking.status, booking.refund_status);
    }
    if (activeTab === 'canceledBookings') {
      return isCancelledBooking(booking.status);
    }
    if (activeTab === 'amendedBookings') {
      return booking.amend_status !== AmendStatus.NONE;
    }
    if (activeTab === 'refundBookings') {
      return booking.refund_status !== RefundStatus.NONE;
    }
    return true; // All bookings tab
  });

  // Get passengers for a specific booking
  const getBookingPassengers = (bookingId: string) => {
    return mockPassengers.filter(passenger => passenger.booking_id === bookingId);
  };

  // Get invoices for a specific booking
  const getBookingInvoices = (bookingId: string) => {
    return mockInvoices.filter(invoice => invoice.booking_id === bookingId);
  };

  // Get invoices for a specific passenger
  const getPassengerInvoices = (passengerId: string) => {
    return mockInvoices.filter(invoice => invoice.passenger_id === passengerId);
  };

  // Get payments for a specific invoice
  const getInvoicePayments = (invoiceId: string) => {
    return mockPayments.filter(payment => payment.invoice_id === invoiceId);
  };

  // Check if all invoices for a booking are paid
  const areAllInvoicesPaid = (bookingId: string): boolean => {
    const invoices = getBookingInvoices(bookingId);
    if (invoices.length === 0) return false;
    
    return invoices.every(invoice => {
      const payments = getInvoicePayments(invoice.invoice_id);
      return payments.some(payment => payment.status === 'Completed');
    });
  };

  // Function to render refund eligibility status
  const renderRefundEligibility = (booking: BookingType) => {
    if (booking.status !== BookingStatus.TICKETED) {
      return <span className="text-gray-500">Not eligible (not ticketed)</span>;
    }
    
    if (booking.refund_status && booking.refund_status !== RefundStatus.NONE) {
      return (
        <Badge variant={getRefundStatusVariant(booking.refund_status)}>
          {booking.refund_status}
        </Badge>
      );
    }
    
    const isEligible = areAllInvoicesPaid(booking.booking_id);
    
    return isEligible ? (
      <div className="flex items-center">
        <Badge variant="success" className="mr-2">Eligible</Badge>
        <Button 
          variant="outline" 
          size="sm"
          className="text-xs" 
          onClick={() => handleApplyForRefund(booking.booking_id)}
        >
          Apply for Refund
        </Button>
      </div>
    ) : (
      <span className="text-amber-500">Waiting for payment</span>
    );
  };

  // Render Active Bookings Tab
  const renderBookingsList = () => {
    return (
      <Card>
        <div className="p-4 flex flex-wrap items-center justify-between border-b">
          <div className="flex items-center w-full md:w-auto mb-3 md:mb-0">
            <div className="relative flex-grow md:max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search bookings..."
              />
            </div>
            <div className="ml-4">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="route">Filter by Route</option>
                <option value="agent">Filter by Agent</option>
                <option value="date">Filter by Date</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Date Range
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> New Booking
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" /> Export
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Departure</TableHead>
                <TableHead>Return</TableHead>
                <TableHead>Passengers</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amend</TableHead>
                <TableHead>Refund</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.booking_id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{booking.booking_id}</TableCell>
                  <TableCell>{(booking as any).agent_name}</TableCell>
                  <TableCell>{booking.route}</TableCell>
                  <TableCell>{booking.departure_date}</TableCell>
                  <TableCell>{booking.return_date || 'N/A'}</TableCell>
                  <TableCell className="font-medium">{(booking as any).passenger_count}</TableCell>
                  <TableCell>{formatCurrency(booking.total_amount, booking.currency)}</TableCell>
                  <TableCell>
                    <Badge variant={getBookingStatusVariant(booking.status)}>
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {booking.amend_status && booking.amend_status !== AmendStatus.NONE && (
                      <Badge variant={getAmendStatusVariant(booking.amend_status)}>
                        {booking.amend_status}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {booking.refund_status && booking.refund_status !== RefundStatus.NONE && (
                      <Badge variant={getRefundStatusVariant(booking.refund_status)}>
                        {booking.refund_status}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{booking.created_at}</TableCell>
                  <TableCell className="space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => {
                        setSelectedBooking(booking.booking_id);
                        setShowBookingDetails(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-indigo-600 hover:text-indigo-900">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
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

  // Render Analytics Tab
  const renderBookingsAnalytics = () => {
    return (
      <Card>
        <CardHeader className="px-6 py-4 border-b border-gray-200">
          <CardTitle className="text-lg font-medium text-gray-800">Booking Analytics</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-md font-medium">Total Passengers</CardTitle>
                  <Users className="h-5 w-5 text-blue-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-3xl font-bold">112</p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">+12.5%</span> vs last month
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-md font-medium">Average Ticket Value</CardTitle>
                  <Ticket className="h-5 w-5 text-purple-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-3xl font-bold">$845.50</p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">+3.2%</span> vs last month
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-md font-medium">Conversion Rate</CardTitle>
                  <CheckCheck className="h-5 w-5 text-green-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-3xl font-bold">82.4%</p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-red-500 font-medium">-1.8%</span> vs last month
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-md font-medium mb-4">Bookings by Fare Type</h3>
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span>Economy</span>
                  <span>58%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '58%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mb-2 mt-4">
                  <span>Premium Economy</span>
                  <span>24%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '24%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mb-2 mt-4">
                  <span>Business</span>
                  <span>15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mb-2 mt-4">
                  <span>First</span>
                  <span>3%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: '3%' }}></div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-medium mb-4">Passenger Actions</h3>
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span>Ticket Issuance (TKT)</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mb-2 mt-4">
                  <span>Amendments (AMD)</span>
                  <span>15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mb-2 mt-4">
                  <span>Refunds (RFD)</span>
                  <span>7%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '7%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Get status text for display
  const getStatusDisplayText = (status: BookingStatus, amendStatus?: AmendStatus, refundStatus?: RefundStatus): string => {
    if (refundStatus && refundStatus !== RefundStatus.NONE) {
      return refundStatus;
    }
    
    if (amendStatus && amendStatus !== AmendStatus.NONE) {
      return amendStatus;
    }
    
    return status;
  };

  return (
    <div className="container mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Ticket className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold">Passenger Bookings</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <ChartPie className="h-4 w-4" /> Reports
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start mb-6 bg-transparent border-b border-gray-200 p-0">
          <TabsTrigger 
            value="activeBookings"
            className="py-4 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Confirmed/Ticketed
          </TabsTrigger>
          <TabsTrigger 
            value="canceledBookings"
            className="py-4 px-1 ml-8 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Cancelled
          </TabsTrigger>
          <TabsTrigger 
            value="amendedBookings"
            className="py-4 px-1 ml-8 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Amended
          </TabsTrigger>
          <TabsTrigger 
            value="refundBookings"
            className="py-4 px-1 ml-8 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Refunds
          </TabsTrigger>
          <TabsTrigger 
            value="completedBookings"
            className="py-4 px-1 ml-8 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Completed
          </TabsTrigger>
          <TabsTrigger 
            value="bookingsAnalytics"
            className="py-4 px-1 ml-8 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Analytics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="activeBookings" className="mt-0">
          {renderBookingsList()}
        </TabsContent>
        <TabsContent value="completedBookings" className="mt-0">
          {renderBookingsList()}
        </TabsContent>
        <TabsContent value="canceledBookings" className="mt-0">
          {renderBookingsList()}
        </TabsContent>
        <TabsContent value="amendedBookings" className="mt-0">
          {renderBookingsList()}
        </TabsContent>
        <TabsContent value="refundBookings" className="mt-0">
          {renderBookingsList()}
        </TabsContent>
        <TabsContent value="bookingsAnalytics" className="mt-0">
          {renderBookingsAnalytics()}
        </TabsContent>
      </Tabs>
      
      {/* Booking Details Modal */}
      {showBookingDetails && selectedBooking && (
        <Dialog open={showBookingDetails} onOpenChange={setShowBookingDetails}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>
                Booking Details - {selectedBooking}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Booking Summary */}
              <div>
                <h3 className="text-lg font-medium mb-3">Booking Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Agent info */}
                  <div className="p-3 border rounded-md">
                    <div className="text-sm text-gray-500">Agent</div>
                    <div className="font-medium">
                      {(mockBookings.find(b => b.booking_id === selectedBooking) as any)?.agent_name}
                    </div>
                  </div>
                  
                  {/* Route */}
                  <div className="p-3 border rounded-md">
                    <div className="text-sm text-gray-500">Route</div>
                    <div className="font-medium">
                      {mockBookings.find(b => b.booking_id === selectedBooking)?.route}
                    </div>
                  </div>
                  
                  {/* Departure Date */}
                  <div className="p-3 border rounded-md">
                    <div className="text-sm text-gray-500">Departure Date</div>
                    <div className="font-medium">
                      {mockBookings.find(b => b.booking_id === selectedBooking)?.departure_date}
                    </div>
                  </div>
                  
                  {/* Return Date */}
                  <div className="p-3 border rounded-md">
                    <div className="text-sm text-gray-500">Return Date</div>
                    <div className="font-medium">
                      {mockBookings.find(b => b.booking_id === selectedBooking)?.return_date || 'N/A'}
                    </div>
                  </div>
                  
                  {/* Total Amount */}
                  <div className="p-3 border rounded-md">
                    <div className="text-sm text-gray-500">Total Amount</div>
                    <div className="font-medium">
                      {formatCurrency(mockBookings.find(b => b.booking_id === selectedBooking)?.total_amount || 0)}
                    </div>
                  </div>
                  
                  {/* Status */}
                  <div className="p-3 border rounded-md">
                    <div className="text-sm text-gray-500">Status</div>
                    <div className="font-medium">
                      {(() => {
                        const booking = mockBookings.find(b => b.booking_id === selectedBooking);
                        if (!booking) return null;
                        
                        return (
                          <Badge variant={getBookingStatusVariant(booking.status)}>
                            {booking.status}
                          </Badge>
                        );
                      })()}
                    </div>
                  </div>
                  
                  {/* Amendment Status */}
                  <div className="p-3 border rounded-md">
                    <div className="text-sm text-gray-500">Amendment Status</div>
                    <div className="font-medium">
                      {(() => {
                        const booking = mockBookings.find(b => b.booking_id === selectedBooking);
                        if (!booking || !booking.amend_status || booking.amend_status === AmendStatus.NONE) {
                          return "None";
                        }
                        
                        return (
                          <Badge variant={getAmendStatusVariant(booking.amend_status)}>
                            {booking.amend_status}
                          </Badge>
                        );
                      })()}
                    </div>
                  </div>
                  
                  {/* Refund Status */}
                  <div className="p-3 border rounded-md">
                    <div className="text-sm text-gray-500">Refund Status</div>
                    <div className="font-medium">
                      {(() => {
                        const booking = mockBookings.find(b => b.booking_id === selectedBooking);
                        if (!booking || !booking.refund_status || booking.refund_status === RefundStatus.NONE) {
                          return "None";
                        }
                        
                        return (
                          <Badge variant={getRefundStatusVariant(booking.refund_status)}>
                            {booking.refund_status}
                          </Badge>
                        );
                      })()}
                    </div>
                  </div>
                  
                  {/* Created Date */}
                  <div className="p-3 border rounded-md">
                    <div className="text-sm text-gray-500">Created Date</div>
                    <div className="font-medium">
                      {mockBookings.find(b => b.booking_id === selectedBooking)?.created_at}
                    </div>
                  </div>
                  
                  {/* Passenger Count */}
                  <div className="p-3 border rounded-md">
                    <div className="text-sm text-gray-500">Passenger Count</div>
                    <div className="font-medium">
                      {(mockBookings.find(b => b.booking_id === selectedBooking) as any)?.passenger_count}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Passenger Details */}
              <div>
                <h3 className="text-lg font-medium mb-3">Passenger Details</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Passenger ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ticket Number</TableHead>
                      <TableHead>Fare Type</TableHead>
                      <TableHead>Fare Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPassengers
                      .filter(passenger => passenger.booking_id === selectedBooking)
                      .map(passenger => (
                        <TableRow key={passenger.passenger_id}>
                          <TableCell className="font-medium">{passenger.passenger_id}</TableCell>
                          <TableCell>{passenger.name}</TableCell>
                          <TableCell>
                            <Badge variant={getBookingStatusVariant(passenger.status)}>
                              {passenger.status}
                            </Badge>
                            {passenger.amend_status && passenger.amend_status !== AmendStatus.NONE && (
                              <Badge variant={getAmendStatusVariant(passenger.amend_status)} className="ml-2">
                                {passenger.amend_status}
                              </Badge>
                            )}
                            {passenger.refund_status && passenger.refund_status !== RefundStatus.NONE && (
                              <Badge variant={getRefundStatusVariant(passenger.refund_status)} className="ml-2">
                                {passenger.refund_status}
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>{passenger.ticket_number || 'N/A'}</TableCell>
                          <TableCell>{passenger.fare_type}</TableCell>
                          <TableCell>{formatCurrency(passenger.fare_amount)}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
              
              {/* Financial Transactions */}
              <div>
                <h3 className="text-lg font-medium mb-3">Financial Transactions</h3>
                <Tabs defaultValue="invoices" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="invoices">Invoices</TabsTrigger>
                    <TabsTrigger value="payments">Payments</TabsTrigger>
                  </TabsList>
                  <TabsContent value="invoices" className="mt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Invoice ID</TableHead>
                          <TableHead>Passenger</TableHead>
                          <TableHead>Action Type</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Issue Date</TableHead>
                          <TableHead>Due Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getBookingInvoices(selectedBooking).map(invoice => (
                          <TableRow key={invoice.invoice_id}>
                            <TableCell className="font-medium">{invoice.invoice_id}</TableCell>
                            <TableCell>
                              {mockPassengers.find(p => p.passenger_id === invoice.passenger_id)?.name || 'N/A'}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{invoice.action_type}</Badge>
                            </TableCell>
                            <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                            <TableCell>
                              <Badge variant={
                                invoice.status === 'Paid' 
                                  ? 'success' 
                                  : invoice.status === 'Overdue'
                                    ? 'destructive'
                                    : 'warning'
                              }>
                                {invoice.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{invoice.date}</TableCell>
                            <TableCell>{invoice.due_date}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                  <TabsContent value="payments" className="mt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Payment ID</TableHead>
                          <TableHead>Invoice ID</TableHead>
                          <TableHead>Passenger</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Reference</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockPayments
                          .filter(payment => payment.booking_id === selectedBooking)
                          .map(payment => (
                            <TableRow key={payment.payment_id}>
                              <TableCell className="font-medium">{payment.payment_id}</TableCell>
                              <TableCell>{payment.invoice_id}</TableCell>
                              <TableCell>
                                {mockPassengers.find(p => p.passenger_id === payment.passenger_id)?.name || 'N/A'}
                              </TableCell>
                              <TableCell>{payment.method}</TableCell>
                              <TableCell>{formatCurrency(payment.amount)}</TableCell>
                              <TableCell>
                                <Badge variant={payment.status === 'Completed' ? 'success' : 'warning'}>
                                  {payment.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{payment.date}</TableCell>
                              <TableCell>{payment.reference}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowBookingDetails(false)}>
                Close
              </Button>
              <Button className="flex items-center gap-2">
                <Download className="h-4 w-4" /> Export Details
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Bookings;
