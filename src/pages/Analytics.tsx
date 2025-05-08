import React, { useState } from 'react';
import { 
  BarChart2, Download, Calendar, Filter, Search,
  TrendingUp, DollarSign, PieChart, Clock, 
  RefreshCw, Save, Share, Clipboard, Plus,
  ArrowUp, ArrowDown, ChartLine, Info, Users, FileText, Database, Coins
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  PieChart as RechartsPI,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DatePicker } from "@/components/expenses/DatePicker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dateRange, setDateRange] = useState('This Month');
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  
  // Enhanced reports data with investor-focused metrics
  const reportsData = {
    profitLossSummary: {
      totalRevenue: 278450.75,
      totalExpenses: 209750.50,
      grossProfit: 68700.25,
      profitMargin: 24.7,
      burnRate: 52437.63, // Monthly cash burn
      runway: 7.8, // Months of runway remaining
      revenueByCategory: [
        { category: 'Flight Bookings', amount: 146250.00, percentage: 52.5, baseFare: 123500.00, markup: 22750.00, marginPercent: 15.6 },
        { category: 'Hotel Reservations', amount: 78920.00, percentage: 28.3, baseFare: 71200.00, markup: 7720.00, marginPercent: 9.8 },
        { category: 'Package Tours', amount: 45780.75, percentage: 16.4, baseFare: 38900.00, markup: 6880.75, marginPercent: 15.0 },
        { category: 'Insurance Sales', amount: 7500.00, percentage: 2.8, baseFare: 6000.00, markup: 1500.00, marginPercent: 20.0 }
      ],
      revenueBySupplier: [
        { supplier: 'GDS (Amadeus)', amount: 95625.25, percentage: 34.3, costOfSales: 81280.00, margin: 15.0 },
        { supplier: 'GDS (Sabre)', amount: 78420.50, percentage: 28.2, costOfSales: 66650.00, margin: 15.0 },
        { supplier: 'NDC Direct', amount: 58775.00, percentage: 21.1, costOfSales: 45750.00, margin: 22.2 },
        { supplier: 'Own Inventory', amount: 45630.00, percentage: 16.4, costOfSales: 31570.00, margin: 30.8 }
      ],
      revenueByFareType: [
        { fareType: 'Basic', amount: 125302.84, percentage: 45.0, avgTicketValue: 420.75 },
        { fareType: 'Classic', amount: 89104.24, percentage: 32.0, avgTicketValue: 585.50 },
        { fareType: 'Flex', amount: 64043.67, percentage: 23.0, avgTicketValue: 780.25 }
      ],
      revenueByCustomerType: [
        { customerType: 'Travel Agent', amount: 158516.93, percentage: 56.9, transactions: 850, avgValue: 186.49 },
        { customerType: 'Sub-Agent', amount: 64043.67, percentage: 23.0, transactions: 420, avgValue: 152.48 },
        { customerType: 'B2C Direct', amount: 55890.15, percentage: 20.1, transactions: 310, avgValue: 180.29 }
      ],
      expensesByCategory: [
        { category: 'Flight Costs', amount: 131625.00, percentage: 62.8, baseCost: 123500.00, fees: 8125.00 },
        { category: 'Hotel Costs', amount: 63136.00, percentage: 30.1, baseCost: 60500.00, fees: 2636.00 },
        { category: 'Operational Costs', amount: 14989.50, percentage: 7.1, baseCost: 13750.00, fees: 1239.50 }
      ],
      monthlyComparison: [
        { month: 'Jan', revenue: 215450.25, expenses: 175260.80, profit: 40189.45, baseFare: 178923.70, markup: 36526.55, forecast: 210000.00, variance: 2.6 },
        { month: 'Feb', revenue: 226780.50, expenses: 182350.75, profit: 44429.75, baseFare: 188428.85, markup: 38351.65, forecast: 220000.00, variance: 3.1 },
        { month: 'Mar', revenue: 245250.00, expenses: 192500.25, profit: 52749.75, baseFare: 203557.50, markup: 41692.50, forecast: 240000.00, variance: 2.2 },
        { month: 'Apr', revenue: 278450.75, expenses: 209750.50, profit: 68700.25, baseFare: 231114.12, markup: 47336.63, forecast: 270000.00, variance: 3.1 }
      ],
      projections: [
        { month: 'May', projectedRevenue: 306295.83, projectedExpenses: 227750.00, projectedProfit: 78545.83, bookings: 1250, growthRate: 10.0 },
        { month: 'Jun', projectedRevenue: 336925.41, projectedExpenses: 247750.00, projectedProfit: 89175.41, bookings: 1375, growthRate: 10.0 },
        { month: 'Jul', projectedRevenue: 370617.95, projectedExpenses: 270000.00, projectedProfit: 100617.95, bookings: 1513, growthRate: 10.0 },
        { month: 'Aug', projectedRevenue: 407679.74, projectedExpenses: 295000.00, projectedProfit: 112679.74, bookings: 1664, growthRate: 10.0 }
      ],
      refundsAndDisputes: {
        total: 15720.50,
        byChannel: [
          { channel: 'Agent Cancellation', amount: 8250.25, percentage: 52.5 },
          { channel: 'Customer Service', amount: 4250.75, percentage: 27.0 },
          { channel: 'Payment Disputes', amount: 3219.50, percentage: 20.5 }
        ],
        byReason: [
          { reason: 'Schedule Change', amount: 6750.80, percentage: 42.9 },
          { reason: 'Customer Cancellation', amount: 5235.75, percentage: 33.3 },
          { reason: 'Price Dispute', amount: 2520.45, percentage: 16.0 },
          { reason: 'Service Issue', amount: 1213.50, percentage: 7.7 }
        ]
      },
      investorKPIs: {
        customerAcquisitionCost: 32.50,
        customerLifetimeValue: 225.75,
        ltvToCAC: 6.95,
        netPromoterScore: 42,
        monthsToBreakEven: 8,
        projectedAnnualROI: 28.5
      }
    },
    topAgents: [
      { 
        name: 'Business Travel International',
        revenue: 48750.00,
        transactions: 28,
        avgValue: 1741.07,
        netMargin: 7350.25,
        marginPercent: 15.1,
        recentTransaction: '2025-05-01',
        change: '+12.5%',
        creditRiskScore: 'A',
        commissionsGiven: 3560.25
      },
      { 
        name: 'Luxury Vacations',
        revenue: 36250.50,
        transactions: 15,
        avgValue: 2416.70,
        netMargin: 6525.10,
        marginPercent: 18.0,
        recentTransaction: '2025-04-30',
        change: '+8.3%',
        creditRiskScore: 'A',
        commissionsGiven: 2718.75
      },
      { 
        name: 'Holiday Planners',
        revenue: 32780.75,
        transactions: 22,
        avgValue: 1490.03,
        netMargin: 4590.30,
        marginPercent: 14.0,
        recentTransaction: '2025-04-28',
        change: '+5.2%',
        creditRiskScore: 'B',
        commissionsGiven: 2459.00
      },
      { 
        name: 'Executive Travel',
        revenue: 28450.00,
        transactions: 12,
        avgValue: 2370.83,
        netMargin: 5690.00,
        marginPercent: 20.0,
        recentTransaction: '2025-04-27',
        change: '+7.6%',
        creditRiskScore: 'A',
        commissionsGiven: 2133.75
      },
      { 
        name: 'World Tours Corp',
        revenue: 21750.25,
        transactions: 14,
        avgValue: 1553.59,
        netMargin: 2610.00,
        marginPercent: 12.0,
        recentTransaction: '2025-04-25',
        change: '-3.1%',
        creditRiskScore: 'C',
        commissionsGiven: 1631.25
      }
    ],
    topRoutes: [
      {
        route: 'NYC-LON',
        revenue: 38750.25,
        bookings: 145,
        avgFare: 267.24,
        baseCost: 31000.20,
        margin: 19.9
      },
      {
        route: 'LAX-TYO',
        revenue: 35250.75,
        bookings: 85,
        avgFare: 414.71,
        baseCost: 29960.00,
        margin: 15.0
      },
      {
        route: 'JFK-CDG',
        revenue: 28920.50,
        bookings: 110,
        avgFare: 262.91,
        baseCost: 23720.00,
        margin: 18.0
      },
      {
        route: 'SFO-SYD',
        revenue: 25750.00,
        bookings: 45,
        avgFare: 572.22,
        baseCost: 21887.50,
        margin: 15.0
      },
      {
        route: 'ORD-FRA',
        revenue: 22580.25,
        bookings: 70,
        avgFare: 322.57,
        baseCost: 19193.21,
        margin: 15.0
      }
    ],
    savedReports: [
      { 
        id: 1,
        name: 'Monthly Profit & Loss',
        type: 'Financial',
        lastRun: '2025-05-01',
        schedule: 'Monthly',
        format: 'PDF'
      },
      { 
        id: 2,
        name: 'Top Customer Analysis',
        type: 'Customer',
        lastRun: '2025-04-30',
        schedule: 'Weekly',
        format: 'Excel'
      },
      { 
        id: 3,
        name: 'Revenue by Product Category',
        type: 'Sales',
        lastRun: '2025-04-30',
        schedule: 'Weekly',
        format: 'PDF'
      },
      { 
        id: 4,
        name: 'Tax Summary Report',
        type: 'Financial',
        lastRun: '2025-04-01',
        schedule: 'Monthly',
        format: 'PDF'
      },
      { 
        id: 5,
        name: 'Outstanding Invoices Aging',
        type: 'Financial',
        lastRun: '2025-05-01',
        schedule: 'Weekly',
        format: 'Excel'
      }
    ],
    // Add topCustomers data that was missing
    topCustomers: [
      { 
        name: 'Global Travel Corp',
        revenue: 52750.75,
        transactions: 32,
        avgValue: 1648.46,
        recentTransaction: '2025-05-01',
        change: '+15.2%'
      },
      { 
        name: 'Adventure Tours Inc',
        revenue: 38920.50,
        transactions: 24,
        avgValue: 1621.69,
        recentTransaction: '2025-04-29',
        change: '+9.6%'
      },
      { 
        name: 'Corporate Travels LLC',
        revenue: 35750.25,
        transactions: 18,
        avgValue: 1986.13,
        recentTransaction: '2025-04-28',
        change: '+7.3%'
      },
      { 
        name: 'Vacation Experts',
        revenue: 28650.00,
        transactions: 21,
        avgValue: 1364.29,
        recentTransaction: '2025-04-25',
        change: '+4.8%'
      },
      { 
        name: 'Elite Journey Planners',
        revenue: 24980.50,
        transactions: 15,
        avgValue: 1665.37,
        recentTransaction: '2025-04-22',
        change: '-2.1%'
      }
    ]
  };

  // Chart colors
  const COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#10B981', '#F59E0B', '#EC4899', '#6366F1'];
  
  // Format currency
  const formatCurrency = (amount: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };
  
  // Format percentage
  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };
  
  // Render Investor Dashboard
  const renderInvestorDashboard = () => {
    const { profitLossSummary, topAgents, topRoutes } = reportsData;
    const { investorKPIs } = profitLossSummary;
    
    return (
      <div className="space-y-6">
        {/* Key Investor KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-md font-medium">ROI & Value Metrics</CardTitle>
                <ChartLine className="h-5 w-5 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Customer Acquisition Cost (CAC)</span>
                  <span className="text-md font-medium">{formatCurrency(investorKPIs.customerAcquisitionCost)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Customer Lifetime Value (LTV)</span>
                  <span className="text-md font-medium">{formatCurrency(investorKPIs.customerLifetimeValue)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">LTV:CAC Ratio</span>
                  <span className="text-md font-medium">{investorKPIs.ltvToCAC.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Projected Annual ROI</span>
                  <span className="text-md font-medium text-green-600">{formatPercent(investorKPIs.projectedAnnualROI)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-md font-medium">Runway & Burn Rate</CardTitle>
                <Coins className="h-5 w-5 text-amber-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Monthly Burn Rate</span>
                  <span className="text-md font-medium">{formatCurrency(profitLossSummary.burnRate)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Current Runway</span>
                  <span className="text-md font-medium">{profitLossSummary.runway.toFixed(1)} months</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Break-Even Timeline</span>
                  <span className="text-md font-medium">{investorKPIs.monthsToBreakEven} months</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Profit Growth (YoY)</span>
                  <span className="text-md font-medium text-green-600">+32.5%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-md font-medium">Performance Metrics</CardTitle>
                <ChartLine className="h-5 w-5 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Net Promoter Score</span>
                  <span className="text-md font-medium">{investorKPIs.netPromoterScore}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Gross Margin</span>
                  <span className="text-md font-medium">{formatPercent(profitLossSummary.profitMargin)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Customer Retention</span>
                  <span className="text-md font-medium">78.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Revenue Growth (MoM)</span>
                  <span className="text-md font-medium text-green-600">+13.5%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Revenue & Cost Analysis */}
        <Card>
          <CardHeader className="px-6 py-4 border-b border-gray-200">
            <CardTitle className="text-lg font-medium text-gray-800">Revenue Segmentation Analysis</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue by Supplier */}
              <div>
                <h3 className="text-md font-medium mb-3">Revenue by Supplier</h3>
                <div className="mb-4 h-64">
                  <ChartContainer 
                    config={{ 
                      supplier1: { color: "#8B5CF6" },
                      supplier2: { color: "#D946EF" },
                      supplier3: { color: "#F97316" },
                      supplier4: { color: "#0EA5E9" }
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPI>
                        <Pie
                          data={profitLossSummary.revenueBySupplier}
                          dataKey="amount"
                          nameKey="supplier"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({supplier, percentage}) => `${percentage}%`}
                        >
                          {profitLossSummary.revenueBySupplier.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={(props) => {
                          if (props.payload && props.payload.length) {
                            const data = props.payload[0].payload;
                            return (
                              <div className="bg-white p-2 border border-gray-200 shadow-lg rounded">
                                <p className="font-medium">{data.supplier}</p>
                                <p>{formatCurrency(data.amount)}</p>
                                <p>Margin: {formatPercent(data.margin)}</p>
                              </div>
                            );
                          }
                          return null;
                        }} />
                        <Legend />
                      </RechartsPI>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div className="mt-2 overflow-x-auto text-sm">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Margin %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {profitLossSummary.revenueBySupplier.map((item, index) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{item.supplier}</TableCell>
                          <TableCell>{formatCurrency(item.amount)}</TableCell>
                          <TableCell>{formatCurrency(item.costOfSales)}</TableCell>
                          <TableCell>{formatPercent(item.margin)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              {/* Revenue by Fare Type */}
              <div>
                <h3 className="text-md font-medium mb-3">Revenue by Fare Type</h3>
                <div className="mb-4 h-64">
                  <ChartContainer 
                    config={{ 
                      fareType1: { color: "#8B5CF6" },
                      fareType2: { color: "#D946EF" },
                      fareType3: { color: "#F97316" }
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPI>
                        <Pie
                          data={profitLossSummary.revenueByFareType}
                          dataKey="amount"
                          nameKey="fareType"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({fareType, percentage}) => `${percentage}%`}
                        >
                          {profitLossSummary.revenueByFareType.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={(props) => {
                          if (props.payload && props.payload.length) {
                            const data = props.payload[0].payload;
                            return (
                              <div className="bg-white p-2 border border-gray-200 shadow-lg rounded">
                                <p className="font-medium">{data.fareType}</p>
                                <p>{formatCurrency(data.amount)}</p>
                                <p>Avg Ticket: {formatCurrency(data.avgTicketValue)}</p>
                              </div>
                            );
                          }
                          return null;
                        }} />
                        <Legend />
                      </RechartsPI>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div className="mt-2 overflow-x-auto text-sm">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fare Type</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>%</TableHead>
                        <TableHead>Avg Ticket</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {profitLossSummary.revenueByFareType.map((item, index) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{item.fareType}</TableCell>
                          <TableCell>{formatCurrency(item.amount)}</TableCell>
                          <TableCell>{formatPercent(item.percentage)}</TableCell>
                          <TableCell>{formatCurrency(item.avgTicketValue)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>

            <Separator className="my-8" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue by Customer Type */}
              <div>
                <h3 className="text-md font-medium mb-3">Revenue by Customer Type</h3>
                <div className="mb-4 h-64">
                  <ChartContainer 
                    config={{ 
                      customerType1: { color: "#8B5CF6" },
                      customerType2: { color: "#D946EF" },
                      customerType3: { color: "#F97316" }
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPI>
                        <Pie
                          data={profitLossSummary.revenueByCustomerType}
                          dataKey="amount"
                          nameKey="customerType"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({customerType, percentage}) => `${percentage}%`}
                        >
                          {profitLossSummary.revenueByCustomerType.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={(props) => {
                          if (props.payload && props.payload.length) {
                            const data = props.payload[0].payload;
                            return (
                              <div className="bg-white p-2 border border-gray-200 shadow-lg rounded">
                                <p className="font-medium">{data.customerType}</p>
                                <p>{formatCurrency(data.amount)}</p>
                                <p>Transactions: {data.transactions}</p>
                              </div>
                            );
                          }
                          return null;
                        }} />
                        <Legend />
                      </RechartsPI>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div className="mt-2 overflow-x-auto text-sm">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer Type</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Trans.</TableHead>
                        <TableHead>Avg Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {profitLossSummary.revenueByCustomerType.map((item, index) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{item.customerType}</TableCell>
                          <TableCell>{formatCurrency(item.amount)}</TableCell>
                          <TableCell>{item.transactions}</TableCell>
                          <TableCell>{formatCurrency(item.avgValue)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              {/* Refunds & Disputes Analysis */}
              <div>
                <h3 className="text-md font-medium mb-3">Refunds & Disputes Analysis</h3>
                <div className="mb-4 h-64">
                  <ChartContainer 
                    config={{ 
                      reason1: { color: "#8B5CF6" },
                      reason2: { color: "#D946EF" },
                      reason3: { color: "#F97316" },
                      reason4: { color: "#0EA5E9" }
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPI>
                        <Pie
                          data={profitLossSummary.refundsAndDisputes.byReason}
                          dataKey="amount"
                          nameKey="reason"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({reason, percentage}) => `${percentage}%`}
                        >
                          {profitLossSummary.refundsAndDisputes.byReason.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={(props) => {
                          if (props.payload && props.payload.length) {
                            const data = props.payload[0].payload;
                            return (
                              <div className="bg-white p-2 border border-gray-200 shadow-lg rounded">
                                <p className="font-medium">{data.reason}</p>
                                <p>{formatCurrency(data.amount)}</p>
                              </div>
                            );
                          }
                          return null;
                        }} />
                        <Legend />
                      </RechartsPI>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium mb-1">Total Refunds & Disputes</h4>
                  <p className="text-xl font-bold">{formatCurrency(profitLossSummary.refundsAndDisputes.total)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Financial Analytics</h1>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {dateRange}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-4">
                <div className="space-y-2">
                  {["This Week", "This Month", "This Quarter", "This Year"].map((range) => (
                    <Button 
                      key={range}
                      variant={dateRange === range ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => {
                        setDateRange(range);
                        setShowCustomDate(false);
                      }}
                    >
                      {range}
                    </Button>
                  ))}
                  <Button
                    variant={showCustomDate ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setShowCustomDate(true)}
                  >
                    Custom Range
                  </Button>
                  
                  {showCustomDate && (
                    <div className="pt-4 space-y-2">
                      <DatePicker 
                        date={startDate} 
                        setDate={setStartDate}
                        label="Start Date"
                      />
                      <DatePicker 
                        date={endDate} 
                        setDate={setEndDate}
                        label="End Date"
                      />
                      <Button 
                        className="w-full mt-2"
                        onClick={() => {
                          if(startDate && endDate) {
                            setDateRange(`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`);
                          }
                        }}
                      >
                        Apply Range
                      </Button>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="investors">Investor Dashboard</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <div className="space-y-6">
              {/* Dashboard content would go here */}
              <p className="text-muted-foreground">Overview dashboard would display here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="revenue">
            <div className="space-y-6">
              {/* Revenue content would go here */}
              <p className="text-muted-foreground">Revenue analytics would display here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="expenses">
            <div className="space-y-6">
              {/* Expenses content would go here */}
              <p className="text-muted-foreground">Expense analytics would display here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="investors">
            {renderInvestorDashboard()}
          </TabsContent>
          
          <TabsContent value="reports">
            <div className="space-y-6">
              {/* Saved Reports content */}
              <Card>
                <CardHeader className="px-6 py-4 border-b border-gray-200">
                  <CardTitle className="text-lg font-medium text-gray-800">Saved Reports</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Last Run</TableHead>
                        <TableHead>Schedule</TableHead>
                        <TableHead>Format</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reportsData.savedReports.map((report) => (
                        <TableRow key={report.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{report.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{report.type}</Badge>
                          </TableCell>
                          <TableCell>{report.lastRun}</TableCell>
                          <TableCell>{report.schedule}</TableCell>
                          <TableCell>{report.format}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button size="icon" variant="ghost">
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="ghost">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="ghost">
                                <Share className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
