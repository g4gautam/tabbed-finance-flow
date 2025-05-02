
import React, { useState } from 'react';
import { 
  Book, Search, Filter, Plus, Edit, Trash2, 
  ChevronDown, Download, RefreshCw, Eye, FileText
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
import NewAccountModal from '@/components/ledger/NewAccountModal';
import NewJournalEntryModal from '@/components/ledger/NewJournalEntryModal';

const Ledger = () => {
  const [activeTab, setActiveTab] = useState('chartOfAccounts');
  const [expandedAccounts, setExpandedAccounts] = useState([1]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [showNewAccountModal, setShowNewAccountModal] = useState(false);
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);
  
  // Sample account data
  const accountData = {
    categories: [
      {
        id: 1,
        name: 'Assets',
        type: 'Assets',
        accounts: [
          { id: 101, code: '10100', name: 'Cash', balance: 124675.50, type: 'Asset' },
          { id: 102, code: '10200', name: 'Accounts Receivable', balance: 67890.25, type: 'Asset' },
          { id: 103, code: '10300', name: 'Bank Deposits', balance: 225000.00, type: 'Asset' },
          { id: 104, code: '10400', name: 'Travel Inventory', balance: 18450.00, type: 'Asset' }
        ]
      },
      {
        id: 2,
        name: 'Liabilities',
        type: 'Liabilities',
        accounts: [
          { id: 201, code: '20100', name: 'Accounts Payable', balance: 45670.80, type: 'Liability' },
          { id: 202, code: '20200', name: 'Credit Cards', balance: 3450.75, type: 'Liability' },
          { id: 203, code: '20300', name: 'Travel Supplier Payables', balance: 86750.00, type: 'Liability' }
        ]
      },
      {
        id: 3,
        name: 'Equity',
        type: 'Equity',
        accounts: [
          { id: 301, code: '30100', name: 'Owner\'s Capital', balance: 150000.00, type: 'Equity' },
          { id: 302, code: '30200', name: 'Retained Earnings', balance: 78500.00, type: 'Equity' }
        ]
      },
      {
        id: 4,
        name: 'Revenue',
        type: 'Revenue',
        accounts: [
          { id: 401, code: '40100', name: 'Flight Bookings Revenue', balance: 145780.25, type: 'Revenue' },
          { id: 402, code: '40200', name: 'Hotel Bookings Revenue', balance: 78920.00, type: 'Revenue' },
          { id: 403, code: '40300', name: 'Package Tours Revenue', balance: 45780.75, type: 'Revenue' },
          { id: 404, code: '40400', name: 'Insurance Sales Revenue', balance: 8450.00, type: 'Revenue' },
          { id: 405, code: '40500', name: 'Markup Revenue', balance: 23450.50, type: 'Revenue' }
        ]
      },
      {
        id: 5,
        name: 'Expenses',
        type: 'Expenses',
        accounts: [
          { id: 501, code: '50100', name: 'Flight Booking Costs', balance: 126240.00, type: 'Expense' },
          { id: 502, code: '50200', name: 'Hotel Booking Costs', balance: 68980.00, type: 'Expense' },
          { id: 503, code: '50300', name: 'Package Tour Costs', balance: 38760.25, type: 'Expense' },
          { id: 504, code: '50400', name: 'Payment Processing Fees', balance: 4250.50, type: 'Expense' },
          { id: 505, code: '50500', name: 'Staff Salaries', balance: 32500.00, type: 'Expense' },
          { id: 506, code: '50600', name: 'Office Rent', balance: 4800.00, type: 'Expense' }
        ]
      }
    ],
    journalEntries: [
      { 
        id: 1001, 
        date: '2025-05-01', 
        reference: 'JE-2501',
        description: 'Flight booking revenue', 
        debitAccount: 'Cash',
        creditAccount: 'Flight Bookings Revenue',
        amount: 2450.75,
        status: 'Posted'
      },
      { 
        id: 1002, 
        date: '2025-05-01', 
        reference: 'JE-2502',
        description: 'Hotel supplier payment', 
        debitAccount: 'Travel Supplier Payables',
        creditAccount: 'Cash',
        amount: 1850.00,
        status: 'Posted'
      },
      { 
        id: 1003, 
        date: '2025-04-30', 
        reference: 'JE-2503',
        description: 'Insurance sales revenue', 
        debitAccount: 'Accounts Receivable',
        creditAccount: 'Insurance Sales Revenue',
        amount: 450.25,
        status: 'Posted'
      },
      { 
        id: 1004, 
        date: '2025-04-30', 
        reference: 'JE-2504',
        description: 'Monthly office rent payment', 
        debitAccount: 'Office Rent',
        creditAccount: 'Cash',
        amount: 1600.00,
        status: 'Posted'
      },
      { 
        id: 1005, 
        date: '2025-04-29', 
        reference: 'JE-2505',
        description: 'Package tour booking', 
        debitAccount: 'Cash',
        creditAccount: 'Package Tours Revenue',
        amount: 3750.50,
        status: 'Posted'
      }
    ]
  };
  
  // Format currency
  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };
  
  // Toggle account expansion
  const toggleAccountExpansion = (categoryId) => {
    if (expandedAccounts.includes(categoryId)) {
      setExpandedAccounts(expandedAccounts.filter(id => id !== categoryId));
    } else {
      setExpandedAccounts([...expandedAccounts, categoryId]);
    }
  };
  
  // Filter accounts by type
  const filteredCategories = accountData.categories.filter(category => {
    if (filterType === 'All') return true;
    return category.type === filterType;
  });
  
  // Render Chart of Accounts
  const renderChartOfAccounts = () => {
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
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="ml-4">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="All">All Accounts</option>
                <option value="Assets">Assets</option>
                <option value="Liabilities">Liabilities</option>
                <option value="Equity">Equity</option>
                <option value="Revenue">Revenue</option>
                <option value="Expenses">Expenses</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" /> More Filters
            </Button>
            <Button onClick={() => setShowNewAccountModal(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> New Account
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
                <TableHead>Account Code</TableHead>
                <TableHead>Account Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <React.Fragment key={category.id}>
                  <TableRow className="bg-muted/50">
                    <TableCell colSpan={5}>
                      <button
                        className="flex items-center font-medium text-gray-900"
                        onClick={() => toggleAccountExpansion(category.id)}
                      >
                        <ChevronDown 
                          className={`h-5 w-5 mr-2 transition-transform ${expandedAccounts.includes(category.id) ? 'transform rotate-180' : ''}`}
                        />
                        <span className="text-lg">{category.name}</span>
                      </button>
                    </TableCell>
                  </TableRow>
                  {expandedAccounts.includes(category.id) && category.accounts.map((account) => (
                    <TableRow key={account.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{account.code}</TableCell>
                      <TableCell>{account.name}</TableCell>
                      <TableCell>{account.type}</TableCell>
                      <TableCell>{formatCurrency(account.balance)}</TableCell>
                      <TableCell className="space-x-2">
                        <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-900">
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
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    );
  };
  
  // Render Journal Entries
  const renderJournalEntries = () => {
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
                placeholder="Search journal entries..."
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button onClick={() => setShowNewEntryModal(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> New Entry
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
                <TableHead>Date</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Debit Account</TableHead>
                <TableHead>Credit Account</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accountData.journalEntries.map((entry) => (
                <TableRow key={entry.id} className="hover:bg-muted/50">
                  <TableCell>{entry.date}</TableCell>
                  <TableCell className="font-medium text-blue-600">{entry.reference}</TableCell>
                  <TableCell>{entry.description}</TableCell>
                  <TableCell>{entry.debitAccount}</TableCell>
                  <TableCell>{entry.creditAccount}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(entry.amount)}</TableCell>
                  <TableCell>
                    <Badge variant="success">{entry.status}</Badge>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-900">
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
  
  // Render Account Reconciliation tab
  const renderAccountReconciliation = () => {
    return (
      <Card className="p-6">
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Account Reconciliation</h3>
          <p className="text-gray-500 mb-4">Compare your bank statements with your accounting records</p>
          <Button className="flex items-center gap-2 mx-auto">
            <Plus className="h-4 w-4" /> Start Reconciliation
          </Button>
        </div>
      </Card>
    );
  };
  
  // Render Closing Balances tab
  const renderClosingBalances = () => {
    return (
      <Card className="p-6">
        <div className="text-center py-12">
          <Book className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Closing Balances</h3>
          <p className="text-gray-500 mb-4">View and manage period-end closing balances</p>
          <Button className="flex items-center gap-2 mx-auto">
            <Eye className="h-4 w-4" /> View Closing Balances
          </Button>
        </div>
      </Card>
    );
  };

  return (
    <div className="container mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Book className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold">General Ledger</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> Reports
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start mb-6 bg-transparent border-b border-gray-200 p-0">
          <TabsTrigger 
            value="chartOfAccounts"
            className="py-4 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Chart of Accounts
          </TabsTrigger>
          <TabsTrigger 
            value="journalEntries"
            className="py-4 px-1 ml-8 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Journal Entries
          </TabsTrigger>
          <TabsTrigger 
            value="reconciliation"
            className="py-4 px-1 ml-8 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Account Reconciliation
          </TabsTrigger>
          <TabsTrigger 
            value="closingBalances"
            className="py-4 px-1 ml-8 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Closing Balances
          </TabsTrigger>
        </TabsList>
        <TabsContent value="chartOfAccounts" className="mt-0">
          {renderChartOfAccounts()}
        </TabsContent>
        <TabsContent value="journalEntries" className="mt-0">
          {renderJournalEntries()}
        </TabsContent>
        <TabsContent value="reconciliation" className="mt-0">
          {renderAccountReconciliation()}
        </TabsContent>
        <TabsContent value="closingBalances" className="mt-0">
          {renderClosingBalances()}
        </TabsContent>
      </Tabs>
      
      {showNewAccountModal && <NewAccountModal onClose={() => setShowNewAccountModal(false)} categories={accountData.categories} />}
      {showNewEntryModal && <NewJournalEntryModal onClose={() => setShowNewEntryModal(false)} accounts={accountData.categories.flatMap(cat => cat.accounts)} />}
    </div>
  );
};

export default Ledger;
