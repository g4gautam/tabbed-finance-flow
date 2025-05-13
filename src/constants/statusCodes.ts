
import { BookingStatus, AmendStatus, RefundStatus } from '../models/financialEntities';

// Status groupings for filtering
export const ACTIVE_BOOKING_STATUSES = [BookingStatus.CONFIRMED, BookingStatus.TICKETED];
export const CANCELLED_BOOKING_STATUSES = [BookingStatus.CANCELLED, BookingStatus.AUTO_CANCELLED, BookingStatus.VOIDED];
export const COMPLETED_BOOKING_STATUSES = [BookingStatus.TICKETED]; // Consider completed when ticketed

export const AMENDED_STATUSES = [
  AmendStatus.AMENDED, 
  AmendStatus.DEP_AMENDED, 
  AmendStatus.RET_AMENDED, 
  AmendStatus.NAME_AMENDED
];

export const REFUND_IN_PROGRESS_STATUSES = [
  RefundStatus.REFUND_APPLIED, 
  RefundStatus.REFUND_IN_PROCESS
];

export const REFUND_COMPLETED_STATUSES = [
  RefundStatus.REFUNDED, 
  RefundStatus.REFUND_REJECTED
];

// Helper function to determine badge variant based on status
export const getBookingStatusVariant = (status: BookingStatus): "info" | "success" | "destructive" | "neutral" => {
  switch (status) {
    case BookingStatus.CONFIRMED:
      return 'info';
    case BookingStatus.TICKETED:
      return 'success';
    case BookingStatus.CANCELLED:
    case BookingStatus.AUTO_CANCELLED:
    case BookingStatus.VOIDED:
      return 'destructive';
    default:
      return 'neutral';
  }
};

export const getAmendStatusVariant = (status?: AmendStatus): "warning" | "neutral" => {
  if (!status || status === AmendStatus.NONE) return 'neutral';
  return 'warning';
};

export const getRefundStatusVariant = (status?: RefundStatus): "pending" | "success" | "danger" | "neutral" => {
  if (!status || status === RefundStatus.NONE) return 'neutral';
  switch (status) {
    case RefundStatus.REFUND_APPLIED:
    case RefundStatus.REFUND_IN_PROCESS:
      return 'pending';
    case RefundStatus.REFUNDED:
      return 'success';
    case RefundStatus.REFUND_REJECTED:
      return 'danger';
    default:
      return 'neutral';
  }
};

// Helper function to determine if a booking is considered "active" for filtering
export const isActiveBooking = (status: BookingStatus, refundStatus?: RefundStatus): boolean => {
  return ACTIVE_BOOKING_STATUSES.includes(status) && 
    (!refundStatus || refundStatus === RefundStatus.NONE);
};

// Helper function to determine if a booking is considered "completed" for filtering
export const isCompletedBooking = (status: BookingStatus, refundStatus?: RefundStatus): boolean => {
  return COMPLETED_BOOKING_STATUSES.includes(status) && 
    (refundStatus === RefundStatus.REFUNDED);
};

// Helper function to determine if a booking is considered "cancelled" for filtering
export const isCancelledBooking = (status: BookingStatus): boolean => {
  return CANCELLED_BOOKING_STATUSES.includes(status);
};

// Helper function to determine if a booking/passenger is eligible for refund
export const isRefundable = (status: BookingStatus, refundStatus?: RefundStatus): boolean => {
  // Only ticketed bookings with no refund status or rejected refunds can be refunded
  return status === BookingStatus.TICKETED && 
    (!refundStatus || 
     refundStatus === RefundStatus.NONE || 
     refundStatus === RefundStatus.REFUND_REJECTED);
};
