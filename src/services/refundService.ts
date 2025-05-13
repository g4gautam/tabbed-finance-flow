
import { 
  Booking, Passenger, Invoice, Payment, 
  RefundStatus, BookingStatus 
} from '../models/financialEntities';

export class RefundService {
  /**
   * Checks if a booking is eligible for refund based on payment status
   * @param booking The booking to check
   * @param invoices List of all invoices
   * @param payments List of all payments
   * @returns boolean indicating if the booking is refund-eligible
   */
  static isBookingRefundEligible(
    booking: Booking, 
    invoices: Invoice[], 
    payments: Payment[]
  ): boolean {
    // Only ticketed bookings can be refunded
    if (booking.status !== BookingStatus.TICKETED) {
      return false;
    }

    // If already in refund process, not eligible for new refund
    if (booking.refund_status && 
        booking.refund_status !== RefundStatus.NONE && 
        booking.refund_status !== RefundStatus.REFUND_REJECTED) {
      return false;
    }

    // Check if all booking invoices are paid
    const bookingInvoices = invoices.filter(inv => inv.booking_id === booking.booking_id);
    if (bookingInvoices.length === 0) return false;

    // Check if all invoices are paid
    return bookingInvoices.every(invoice => {
      const invoicePayments = payments.filter(pmt => pmt.invoice_id === invoice.invoice_id);
      return invoicePayments.some(pmt => pmt.status === 'Completed');
    });
  }

  /**
   * Checks if a passenger is eligible for refund based on payment status
   * @param passenger The passenger to check
   * @param invoices List of all invoices
   * @param payments List of all payments
   * @returns boolean indicating if the passenger is refund-eligible
   */
  static isPassengerRefundEligible(
    passenger: Passenger, 
    invoices: Invoice[], 
    payments: Payment[]
  ): boolean {
    // Only ticketed passengers can be refunded
    if (passenger.status !== BookingStatus.TICKETED) {
      return false;
    }

    // If already in refund process, not eligible for new refund
    if (passenger.refund_status && 
        passenger.refund_status !== RefundStatus.NONE &&
        passenger.refund_status !== RefundStatus.REFUND_REJECTED) {
      return false;
    }

    // Check if passenger invoices are paid
    const passengerInvoices = invoices.filter(inv => inv.passenger_id === passenger.passenger_id);
    if (passengerInvoices.length === 0) return false;

    // Check if all invoices are paid
    return passengerInvoices.every(invoice => {
      const invoicePayments = payments.filter(pmt => pmt.invoice_id === invoice.invoice_id);
      return invoicePayments.some(pmt => pmt.status === 'Completed');
    });
  }

  /**
   * Applies refund status to a booking
   * @param booking The booking to update
   * @param invoices List of all invoices
   * @param payments List of all payments
   * @returns Updated booking or null if not eligible
   */
  static applyForRefund(
    booking: Booking, 
    invoices: Invoice[], 
    payments: Payment[]
  ): Booking | null {
    if (!this.isBookingRefundEligible(booking, invoices, payments)) {
      return null;
    }
    
    return {
      ...booking,
      refund_status: RefundStatus.REFUND_APPLIED
    };
  }

  /**
   * Applies refund status to a passenger
   * @param passenger The passenger to update
   * @param invoices List of all invoices
   * @param payments List of all payments
   * @returns Updated passenger or null if not eligible
   */
  static applyPassengerRefund(
    passenger: Passenger,
    invoices: Invoice[],
    payments: Payment[]
  ): Passenger | null {
    if (!this.isPassengerRefundEligible(passenger, invoices, payments)) {
      return null;
    }

    return {
      ...passenger,
      refund_status: RefundStatus.REFUND_APPLIED
    };
  }

  /**
   * Handles payment completion to automatically update refund eligibility
   * @param payment The completed payment
   * @param invoices List of all invoices
   * @param bookings List of all bookings
   * @param passengers List of all passengers
   * @returns Object containing updated bookings and passengers arrays if any changes were made
   */
  static handlePaymentCompleted(
    payment: Payment, 
    invoices: Invoice[],
    bookings: Booking[],
    passengers: Passenger[]
  ): { updatedBookings?: Booking[], updatedPassengers?: Passenger[] } {
    // Only process completed payments
    if (payment.status !== 'Completed') {
      return {};
    }

    // Find the related invoice
    const invoice = invoices.find(inv => inv.invoice_id === payment.invoice_id);
    if (!invoice) return {};

    const result: { updatedBookings?: Booking[], updatedPassengers?: Passenger[] } = {};
    
    // Update passenger refund eligibility if payment is for passenger
    if (invoice.passenger_id) {
      const passenger = passengers.find(p => p.passenger_id === invoice.passenger_id);
      if (passenger && passenger.status === BookingStatus.TICKETED && 
          (!passenger.refund_status || passenger.refund_status === RefundStatus.NONE)) {
        const updatedPassengers = [...passengers];
        const passengerIndex = updatedPassengers.findIndex(p => p.passenger_id === passenger.passenger_id);
        
        // Check if all passenger invoices are paid
        const allInvoicesPaid = invoices
          .filter(inv => inv.passenger_id === passenger.passenger_id)
          .every(inv => {
            const payments = invoices
              .filter(pmt => pmt.invoice_id === inv.invoice_id)
              .some(pmt => pmt.status === 'Completed');
            return payments;
          });
            
        if (allInvoicesPaid && passengerIndex >= 0) {
          // Mark passenger as refund eligible
          updatedPassengers[passengerIndex] = {
            ...passenger,
            refund_status: RefundStatus.NONE  // Not applying for refund automatically, just eligible
          };
          result.updatedPassengers = updatedPassengers;
        }
      }
    }
    
    // Update booking refund eligibility
    const booking = bookings.find(b => b.booking_id === invoice.booking_id);
    if (booking && booking.status === BookingStatus.TICKETED && 
        (!booking.refund_status || booking.refund_status === RefundStatus.NONE)) {
      
      const updatedBookings = [...bookings];
      const bookingIndex = updatedBookings.findIndex(b => b.booking_id === booking.booking_id);
      
      // Check if all booking invoices are paid
      const allInvoicesPaid = invoices
        .filter(inv => inv.booking_id === booking.booking_id)
        .every(inv => {
          const invPayments = invoices
            .filter(pmt => pmt.invoice_id === inv.invoice_id)
            .some(pmt => pmt.status === 'Completed');
          return invPayments;
        });
          
      if (allInvoicesPaid && bookingIndex >= 0) {
        // Mark booking as refund eligible
        updatedBookings[bookingIndex] = {
          ...booking,
          refund_status: RefundStatus.NONE  // Not applying for refund automatically, just eligible
        };
        result.updatedBookings = updatedBookings;
      }
    }
    
    return result;
  }
}
