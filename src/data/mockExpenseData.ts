
// Mock data for the Multi-Currency Expense Management System

export const mockExpenseData = {
  // Expense entries
  expenses: [
    {
      id: 1,
      date: '2025-04-02',
      category: 'Marketing',
      amount: 45,
      currency: 'EUR',
      office: 'Italy',
      description: 'Facebook Ad Campaign',
      exchangeRate: 1,
      paymentMethod: 'bank'
    },
    {
      id: 2,
      date: '2025-04-03',
      category: 'Office',
      amount: 3500,
      currency: 'INR',
      office: 'India',
      description: 'Office supplies purchase',
      exchangeRate: 0.011,
      paymentMethod: 'cash'
    },
    {
      id: 3,
      date: '2025-04-05',
      category: 'Software',
      amount: 120,
      currency: 'USD',
      office: 'USA',
      description: 'Software subscription',
      exchangeRate: 0.92,
      paymentMethod: 'credit'
    },
    {
      id: 4,
      date: '2025-04-10',
      category: 'Travel',
      amount: 85,
      currency: 'GBP',
      office: 'UK',
      description: 'Client visit transportation',
      exchangeRate: 1.15,
      paymentMethod: 'credit'
    },
    {
      id: 5,
      date: '2025-04-12',
      category: 'Marketing',
      amount: 75,
      currency: 'EUR',
      office: 'Italy',
      description: 'Google Ads',
      exchangeRate: 1,
      paymentMethod: 'bank'
    },
    {
      id: 6,
      date: '2025-04-15',
      category: 'Utilities',
      amount: 4200,
      currency: 'INR',
      office: 'India',
      description: 'Electricity bill',
      exchangeRate: 0.011,
      paymentMethod: 'bank'
    },
    {
      id: 7,
      date: '2025-04-18',
      category: 'Staff',
      amount: 150,
      currency: 'USD',
      office: 'USA',
      description: 'Team lunch',
      exchangeRate: 0.92,
      paymentMethod: 'credit'
    },
    {
      id: 8,
      date: '2025-04-20',
      category: 'Office',
      amount: 35,
      currency: 'GBP',
      office: 'UK',
      description: 'Office stationery',
      exchangeRate: 1.15,
      paymentMethod: 'cash'
    },
    {
      id: 9,
      date: '2025-04-25',
      category: 'Marketing',
      amount: 120,
      currency: 'EUR',
      office: 'Italy',
      description: 'Trade show booth',
      exchangeRate: 1,
      paymentMethod: 'bank'
    },
    {
      id: 10,
      date: '2025-04-28',
      category: 'Travel',
      amount: 8500,
      currency: 'INR',
      office: 'India',
      description: 'Flight tickets for sales team',
      exchangeRate: 0.011,
      paymentMethod: 'credit'
    }
  ],
  
  // Earnings data
  earnings: [
    {
      id: 1,
      date: '2025-04-01',
      amount: 250,
      currency: 'EUR',
      office: 'Italy',
      tickets: 25,
      exchangeRate: 1
    },
    {
      id: 2,
      date: '2025-04-05',
      amount: 12000,
      currency: 'INR',
      office: 'India',
      tickets: 30,
      exchangeRate: 0.011
    },
    {
      id: 3,
      date: '2025-04-10',
      amount: 350,
      currency: 'USD',
      office: 'USA',
      tickets: 15,
      exchangeRate: 0.92
    },
    {
      id: 4,
      date: '2025-04-15',
      amount: 180,
      currency: 'GBP',
      office: 'UK',
      tickets: 12,
      exchangeRate: 1.15
    },
    {
      id: 5,
      date: '2025-04-20',
      amount: 480,
      currency: 'EUR',
      office: 'Italy',
      tickets: 40,
      exchangeRate: 1
    },
    {
      id: 6,
      date: '2025-04-25',
      amount: 18500,
      currency: 'INR',
      office: 'India',
      tickets: 45,
      exchangeRate: 0.011
    },
    {
      id: 7,
      date: '2025-04-28',
      amount: 520,
      currency: 'USD',
      office: 'USA',
      tickets: 22,
      exchangeRate: 0.92
    },
    {
      id: 8,
      date: '2025-04-30',
      amount: 260,
      currency: 'GBP',
      office: 'UK',
      tickets: 18,
      exchangeRate: 1.15
    }
  ],
  
  // Fixed expenses for each office
  fixedExpenses: [
    {
      officeId: 'italy',
      name: 'Italy',
      currency: 'EUR',
      monthly: 3500,
      breakdown: {
        rent: 1200,
        salaries: 2000,
        utilities: 300
      }
    },
    {
      officeId: 'india',
      name: 'India',
      currency: 'INR',
      monthly: 185000,
      breakdown: {
        rent: 45000,
        salaries: 120000,
        utilities: 20000
      }
    },
    {
      officeId: 'usa',
      name: 'USA',
      currency: 'USD',
      monthly: 5800,
      breakdown: {
        rent: 2800,
        salaries: 2500,
        utilities: 500
      }
    },
    {
      officeId: 'uk',
      name: 'UK',
      currency: 'GBP',
      monthly: 4200,
      breakdown: {
        rent: 1800,
        salaries: 2000,
        utilities: 400
      }
    }
  ],
  
  // Exchange rates relative to base (EUR)
  exchangeRates: {
    EUR: 1,
    INR: 0.011,
    USD: 0.92,
    GBP: 1.15
  },
  
  // Categories
  expenseCategories: [
    { value: 'marketing', label: 'Marketing' },
    { value: 'office', label: 'Office Supplies' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'staff', label: 'Staff' },
    { value: 'rent', label: 'Rent' },
    { value: 'travel', label: 'Travel' },
    { value: 'software', label: 'Software' },
    { value: 'other', label: 'Other' }
  ],
  
  // Payment methods
  paymentMethods: [
    { value: 'cash', label: 'Cash' },
    { value: 'bank', label: 'Bank Transfer' },
    { value: 'credit', label: 'Credit Card' },
    { value: 'upi', label: 'UPI/Mobile Payment' }
  ]
};
