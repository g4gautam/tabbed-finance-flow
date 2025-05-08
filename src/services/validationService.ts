
import { Account, Currency, Expense, JournalEntry, Office } from "../models/financialEntities";

/**
 * ValidationService - Provides validation functions for interconnected data fields
 * throughout the application to maintain data integrity
 */
export class ValidationService {
  /**
   * Validates a journal entry against the available accounts
   */
  static validateJournalEntry(entry: JournalEntry, accounts: Account[]): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Validate accounts exist
    const debitAccountExists = accounts.some(account => account.name === entry.debitAccount);
    const creditAccountExists = accounts.some(account => account.name === entry.creditAccount);
    
    if (!debitAccountExists) {
      errors.push(`Debit account "${entry.debitAccount}" does not exist`);
    }
    
    if (!creditAccountExists) {
      errors.push(`Credit account "${entry.creditAccount}" does not exist`);
    }
    
    // Validate amount
    if (entry.amount <= 0) {
      errors.push("Amount must be greater than zero");
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
  
  /**
   * Validates an expense against available currencies and offices
   */
  static validateExpense(expense: Expense, currencies: Currency[], offices: Office[]): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Validate currency exists
    const currencyExists = currencies.some(currency => currency.code === expense.currency);
    if (!currencyExists) {
      errors.push(`Currency "${expense.currency}" does not exist`);
    }
    
    // Validate office exists
    const officeExists = offices.some(office => office.name === expense.office);
    if (!officeExists) {
      errors.push(`Office "${expense.office}" does not exist`);
    }
    
    // Validate amount and exchange rate
    if (expense.amount <= 0) {
      errors.push("Amount must be greater than zero");
    }
    
    if (expense.exchangeRate <= 0) {
      errors.push("Exchange rate must be greater than zero");
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
  
  /**
   * Validates currency consistency between an office and an expense
   */
  static validateCurrencyConsistency(expense: Expense, offices: Office[]): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    const office = offices.find(o => o.name === expense.office);
    if (office && office.currency !== expense.currency) {
      errors.push(`Warning: Office "${office.name}" typically uses ${office.currency}, but expense uses ${expense.currency}`);
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
}
