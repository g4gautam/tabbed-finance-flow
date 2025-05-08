
import { Account, Currency, Office, JournalEntry, Expense } from "../models/financialEntities";

/**
 * RelationshipService - Maps and manages relationships between different entities
 * in the financial system
 */
export class RelationshipService {
  /**
   * Maps which accounts are affected by a journal entry
   */
  static getRelatedAccounts(journalEntry: JournalEntry, accounts: Account[]): Account[] {
    return accounts.filter(account => 
      account.name === journalEntry.debitAccount || 
      account.name === journalEntry.creditAccount
    );
  }
  
  /**
   * Maps which currency and office are related to an expense
   */
  static getRelatedEntities(expense: Expense, currencies: Currency[], offices: Office[]): {
    currency?: Currency;
    office?: Office;
  } {
    return {
      currency: currencies.find(c => c.code === expense.currency),
      office: offices.find(o => o.name === expense.office)
    };
  }
  
  /**
   * Finds all expenses related to a specific office
   */
  static getExpensesByOffice(office: Office, expenses: Expense[]): Expense[] {
    return expenses.filter(expense => expense.office === office.name);
  }
  
  /**
   * Finds all expenses in a specific currency
   */
  static getExpensesByCurrency(currency: string, expenses: Expense[]): Expense[] {
    return expenses.filter(expense => expense.currency === currency);
  }
  
  /**
   * Maps which journal entries affect a specific account
   */
  static getJournalEntriesForAccount(accountName: string, entries: JournalEntry[]): JournalEntry[] {
    return entries.filter(entry => 
      entry.debitAccount === accountName || 
      entry.creditAccount === accountName
    );
  }
  
  /**
   * Creates a visual connection map for the UI
   */
  static getFieldConnectionMap(): Record<string, string[]> {
    return {
      "currency": ["office", "expense.currency", "exchangeRate"],
      "office": ["expense.office", "currency"],
      "account": ["journalEntry.debitAccount", "journalEntry.creditAccount"],
      "expense.category": ["account"],
      "expense.paymentMethod": ["account"],
      "journalEntry": ["account.balance"]
    };
  }
}
