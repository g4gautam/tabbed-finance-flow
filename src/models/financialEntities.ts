
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
