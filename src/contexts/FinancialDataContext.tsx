
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { ValidationService } from '../services/validationService';
import { RelationshipService } from '../services/relationshipService';
import { 
  Account, Currency, Office, JournalEntry, Expense, 
  BusinessPartner, RevenueCategory, Booking, Passenger,
  ActionType, Invoice, Payment, Receipt, CreditNote
} from '../models/financialEntities';

interface FinancialContextType {
  // Core data sets
  currencies: Currency[];
  offices: Office[];
  accounts: Account[];
  journalEntries: JournalEntry[];
  expenses: Expense[];
  businessPartners: BusinessPartner[];
  
  // New passenger-centric model entities
  bookings: Booking[];
  passengers: Passenger[];
  actionTypes: ActionType[];
  invoices: Invoice[];
  payments: Payment[];
  receipts: Receipt[];
  creditNotes: CreditNote[];
  
  // Validation functions
  validateJournalEntry: (entry: JournalEntry) => { valid: boolean; errors: string[] };
  validateExpense: (expense: Expense) => { valid: boolean; errors: string[] };
  validateBooking: (booking: Booking) => { valid: boolean; errors: string[] };
  validateInvoice: (invoice: Invoice) => { valid: boolean; errors: string[] };
  validatePayment: (payment: Payment) => { valid: boolean; errors: string[] };
  
  // Relationship functions
  getRelatedAccounts: (journalEntry: JournalEntry) => Account[];
  getFieldConnections: (fieldName: string) => string[];
  getPassengersByBooking: (bookingId: string) => Passenger[];
  getInvoicesByPassenger: (passengerId: string) => Invoice[];
  getPaymentsByInvoice: (invoiceId: string) => Payment[];
  
  // Field suggestions
  getSuggestedOffice: (currencyCode: string) => Office | undefined;
  getSuggestedCurrency: (officeId: string) => Currency | undefined;
  
  // Mock data loading for demonstration
  isLoading: boolean;
}

const FinancialDataContext = createContext<FinancialContextType | undefined>(undefined);

export function FinancialDataProvider({ children, mockData }: { children: ReactNode, mockData: any }) {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [offices, setOffices] = useState<Office[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [businessPartners, setBusinessPartners] = useState<BusinessPartner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // New passenger-centric model states
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [actionTypes, setActionTypes] = useState<ActionType[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [creditNotes, setCreditNotes] = useState<CreditNote[]>([]);
  
  // Load mock data on mount
  useEffect(() => {
    if (mockData) {
      // Extract data from mock data
      const allAccounts: Account[] = mockData.accountData?.categories.flatMap(cat => cat.accounts) || [];
      const journalEntriesData: JournalEntry[] = mockData.accountData?.journalEntries || [];
      const expensesData: Expense[] = mockData.mockExpenseData?.expenses || [];
      const currenciesData: Currency[] = mockData.currencies || [];
      const officesData: Office[] = mockData.offices || [];
      const businessPartnersData: BusinessPartner[] = [
        ...(mockData.reportsData?.topAgents || []).map((agent: any) => ({ ...agent, type: 'agent' })),
        ...(mockData.reportsData?.topCustomers || []).map((customer: any) => ({ ...customer, type: 'customer' }))
      ];
      
      // Set state for existing data
      setAccounts(allAccounts);
      setJournalEntries(journalEntriesData);
      setExpenses(expensesData);
      setCurrencies(currenciesData);
      setOffices(officesData);
      setBusinessPartners(businessPartnersData);
      
      // Set state for new passenger-centric model data
      // Mock data would be provided in production
      setBookings(mockData.bookings || []);
      setPassengers(mockData.passengers || []);
      setActionTypes(mockData.actionTypes || [
        { code: 'TKT', name: 'Ticket', gl_account: '40100', description: 'Initial ticket issuance' },
        { code: 'AMD', name: 'Amendment', gl_account: '40200', description: 'Booking amendment or change' },
        { code: 'RFD', name: 'Refund', gl_account: '40300', description: 'Ticket refund or cancellation' }
      ]);
      setInvoices(mockData.invoices || []);
      setPayments(mockData.payments || []);
      setReceipts(mockData.receipts || []);
      setCreditNotes(mockData.creditNotes || []);
      
      setIsLoading(false);
    }
  }, [mockData]);
  
  // Validation functions
  const validateJournalEntry = (entry: JournalEntry) => {
    return ValidationService.validateJournalEntry(entry, accounts);
  };
  
  const validateExpense = (expense: Expense) => {
    return ValidationService.validateExpense(expense, currencies, offices);
  };
  
  // New validation functions for passenger-centric model
  const validateBooking = (booking: Booking) => {
    // Basic validation logic for booking
    const errors: string[] = [];
    if (!booking.booking_id) errors.push('Booking ID is required');
    if (!booking.agent_id) errors.push('Agent is required');
    if (!booking.total_amount) errors.push('Total amount is required');
    if (!booking.currency) errors.push('Currency is required');
    if (!booking.status) errors.push('Status is required');
    if (!booking.created_at) errors.push('Created date is required');
    
    return { valid: errors.length === 0, errors };
  };
  
  const validateInvoice = (invoice: Invoice) => {
    // Basic validation logic for invoice
    const errors: string[] = [];
    if (!invoice.invoice_id) errors.push('Invoice ID is required');
    if (!invoice.booking_id) errors.push('Booking ID is required');
    if (!invoice.amount) errors.push('Amount is required');
    if (!invoice.currency) errors.push('Currency is required');
    if (!invoice.status) errors.push('Status is required');
    if (!invoice.action_type) errors.push('Action type is required');
    if (!invoice.date) errors.push('Invoice date is required');
    
    return { valid: errors.length === 0, errors };
  };
  
  const validatePayment = (payment: Payment) => {
    // Basic validation logic for payment
    const errors: string[] = [];
    if (!payment.payment_id) errors.push('Payment ID is required');
    if (!payment.invoice_id) errors.push('Invoice ID is required');
    if (!payment.booking_id) errors.push('Booking ID is required');
    if (!payment.amount) errors.push('Amount is required');
    if (!payment.currency) errors.push('Currency is required');
    if (!payment.method) errors.push('Payment method is required');
    if (!payment.status) errors.push('Status is required');
    if (!payment.date) errors.push('Payment date is required');
    
    return { valid: errors.length === 0, errors };
  };
  
  // Relationship functions
  const getRelatedAccounts = (journalEntry: JournalEntry) => {
    return RelationshipService.getRelatedAccounts(journalEntry, accounts);
  };
  
  const getFieldConnections = (fieldName: string) => {
    const connectionMap = RelationshipService.getFieldConnectionMap();
    return connectionMap[fieldName] || [];
  };
  
  // New relationship functions for passenger-centric model
  const getPassengersByBooking = (bookingId: string) => {
    return passengers.filter(passenger => passenger.booking_id === bookingId);
  };
  
  const getInvoicesByPassenger = (passengerId: string) => {
    return invoices.filter(invoice => invoice.passenger_id === passengerId);
  };
  
  const getPaymentsByInvoice = (invoiceId: string) => {
    return payments.filter(payment => payment.invoice_id === invoiceId);
  };
  
  // Field suggestions
  const getSuggestedOffice = (currencyCode: string) => {
    return offices.find(office => office.currency === currencyCode);
  };
  
  const getSuggestedCurrency = (officeId: string) => {
    const office = offices.find(o => o.id === officeId);
    return office ? currencies.find(c => c.code === office.currency) : undefined;
  };
  
  return (
    <FinancialDataContext.Provider value={{
      currencies,
      offices,
      accounts,
      journalEntries,
      expenses,
      businessPartners,
      bookings,
      passengers,
      actionTypes,
      invoices,
      payments,
      receipts,
      creditNotes,
      validateJournalEntry,
      validateExpense,
      validateBooking,
      validateInvoice,
      validatePayment,
      getRelatedAccounts,
      getFieldConnections,
      getPassengersByBooking,
      getInvoicesByPassenger,
      getPaymentsByInvoice,
      getSuggestedOffice,
      getSuggestedCurrency,
      isLoading
    }}>
      {children}
    </FinancialDataContext.Provider>
  );
}

export const useFinancialData = () => {
  const context = useContext(FinancialDataContext);
  if (context === undefined) {
    throw new Error('useFinancialData must be used within a FinancialDataProvider');
  }
  return context;
};
