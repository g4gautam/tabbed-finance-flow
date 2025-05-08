
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { ValidationService } from '../services/validationService';
import { RelationshipService } from '../services/relationshipService';
import { 
  Account, Currency, Office, JournalEntry, Expense, 
  BusinessPartner, RevenueCategory 
} from '../models/financialEntities';

interface FinancialContextType {
  // Core data sets
  currencies: Currency[];
  offices: Office[];
  accounts: Account[];
  journalEntries: JournalEntry[];
  expenses: Expense[];
  businessPartners: BusinessPartner[];
  
  // Validation functions
  validateJournalEntry: (entry: JournalEntry) => { valid: boolean; errors: string[] };
  validateExpense: (expense: Expense) => { valid: boolean; errors: string[] };
  
  // Relationship functions
  getRelatedAccounts: (journalEntry: JournalEntry) => Account[];
  getFieldConnections: (fieldName: string) => string[];
  
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
      
      // Set state
      setAccounts(allAccounts);
      setJournalEntries(journalEntriesData);
      setExpenses(expensesData);
      setCurrencies(currenciesData);
      setOffices(officesData);
      setBusinessPartners(businessPartnersData);
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
  
  // Relationship functions
  const getRelatedAccounts = (journalEntry: JournalEntry) => {
    return RelationshipService.getRelatedAccounts(journalEntry, accounts);
  };
  
  const getFieldConnections = (fieldName: string) => {
    const connectionMap = RelationshipService.getFieldConnectionMap();
    return connectionMap[fieldName] || [];
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
      validateJournalEntry,
      validateExpense,
      getRelatedAccounts,
      getFieldConnections,
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
