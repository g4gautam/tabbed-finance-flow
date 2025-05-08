
/**
 * Core Financial Entities - These define the data structures and relationships
 * between different parts of the application
 */

// Currency - used across the application
export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

// Office Location - used in expenses and ledger
export interface Office {
  id: string;
  name: string;
  currency: string;
}

// Account Category - used in ledger
export interface AccountCategory {
  id: number;
  name: string;
  type: string;
  accounts: Account[];
}

// Account - used in ledger and journal entries
export interface Account {
  id: number;
  code: string;
  name: string;
  balance: number;
  type: string;
}

// Journal Entry - connects accounts in ledger
export interface JournalEntry {
  id: number;
  date: string;
  reference: string;
  description: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
  status: string;
  booking_id?: string;     // Link to booking when relevant
  passenger_id?: string;   // Link to passenger when relevant
  action_type?: string;    // TKT, AMD, RFD when relevant
}

// Expense - tracked across the system
export interface Expense {
  id: number;
  date: string;
  category: string;
  amount: number;
  currency: string;
  office: string;
  description?: string;
  exchangeRate: number;
  paymentMethod: string;
  booking_id?: string;     // Optional link to booking
  passenger_id?: string;   // Optional link to passenger
}

// Agent/Customer - used in analytics and sales
export interface BusinessPartner {
  id: number;
  name: string;
  type: 'agent' | 'customer' | 'supplier';
  currency?: string;
  creditRiskScore?: string;
  revenue?: number;
  transactions?: number;
  avgValue?: number;
  recentTransaction?: string;
  change?: string;
}

// Revenue Category - used in analytics and reporting
export interface RevenueCategory {
  category: string;
  amount: number;
  percentage: number;
  baseFare?: number;
  markup?: number;
  marginPercent?: number;
}

// Exchange Rate - connects currencies
export interface ExchangeRate {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  date: string;
}

// === NEW ENTITIES FOR PASSENGER-CENTRIC BOOKING MODEL ===

// Booking - master record for a flight booking transaction
export interface Booking {
  booking_id: string;      // e.g., FFS-BKG-20250508-0001
  agent_id: number;        // Reference to BusinessPartner
  total_amount: number;    // Total amount for all passengers
  currency: string;        // Currency code
  status: string;          // Active, Canceled, Completed
  created_at: string;      // Date created
  route: string;           // E.g. NYC-LON
  departure_date: string;  // Departure date
  return_date?: string;    // Return date if round-trip
}

// Passenger - individual traveler within a booking
export interface Passenger {
  passenger_id: string;    // e.g., FFS-BKG-20250508-0001-P01
  booking_id: string;      // Parent booking ID
  name: string;            // Passenger name
  ticket_number?: string;  // Airline ticket number when issued
  status: string;          // Active, Canceled, Refunded
  fare_amount: number;     // Individual fare amount
  fare_type: string;       // Basic, Classic, Flex
}

// ActionType - types of financial actions that can be taken on a booking/passenger
export interface ActionType {
  code: string;            // TKT (Ticket), AMD (Amendment), RFD (Refund)
  name: string;            // Ticket, Amendment, Refund
  gl_account: string;      // Linked GL account code
  description: string;     // Detailed description of action type
}

// Invoice - financial document issued to customer
export interface Invoice {
  invoice_id: string;      // e.g., FFS-INV-20250508-0001
  booking_id: string;      // Link to booking
  passenger_id?: string;   // Link to specific passenger (optional if group invoice)
  amount: number;          // Amount
  currency: string;        // Currency code
  status: string;          // Paid, Pending, Overdue
  action_type: string;     // TKT, AMD, RFD
  date: string;            // Invoice date
  due_date: string;        // Due date
}

// Credit Note - document issued for refunds or adjustments
export interface CreditNote {
  credit_note_id: string;  // e.g., FFS-CN-20250508-0001
  invoice_id: string;      // Related invoice
  booking_id: string;      // Link to booking
  passenger_id: string;    // Link to specific passenger
  amount: number;          // Amount
  currency: string;        // Currency code
  reason: string;          // Reason for credit note
  status: string;          // Processed, Pending
  date: string;            // Issue date
}

// Payment - financial transaction received from customer
export interface Payment {
  payment_id: string;      // e.g., FFS-PAY-20250508-0001
  invoice_id: string;      // Related invoice
  booking_id: string;      // Link to booking
  passenger_id?: string;   // Link to passenger if passenger-specific
  amount: number;          // Amount
  currency: string;        // Currency code
  method: string;          // Credit Card, Bank Transfer, etc.
  status: string;          // Completed, Pending, Failed
  date: string;            // Payment date
  reference: string;       // Payment reference/confirmation number
}

// Receipt - confirmation document for payment
export interface Receipt {
  receipt_id: string;      // e.g., FFS-RCP-20250508-0001
  payment_id: string;      // Related payment
  booking_id: string;      // Link to booking
  passenger_id?: string;   // Link to passenger
  date: string;            // Issue date
  amount: number;          // Receipt amount
  currency: string;        // Currency code
}
