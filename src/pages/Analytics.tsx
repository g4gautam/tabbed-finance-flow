
import React, { useState } from 'react';
import { 
  BarChart2, Download, Calendar, Filter, Search,
  TrendingUp, DollarSign, PieChart, Clock, 
  RefreshCw, Save, Share, Clipboard, Plus,
  ArrowUp, ArrowDown, ChartLine, Info, Users, Graph, FileText, Database, Coins
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
                <Graph className="h-5 w-5 text-blue-500" />
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
                  <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(profitLossSummary.refundsAndDisputes.total)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatPercent((profitLossSummary.refundsAndDisputes.total / profitLossSummary.totalRevenue) * 100)} of Total Revenue
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Financial Projections */}
        <Card>
          <CardHeader className="px-6 py-4 border-b border-gray-200">
            <CardTitle className="text-lg font-medium text-gray-800">Financial Projections</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6 h-80">
              <ChartContainer 
                config={{ 
                  projectedRevenue: { color: "#8B5CF6" },
                  projectedExpenses: { color: "#F97316" },
                  projectedProfit: { color: "#10B981" }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[...profitLossSummary.monthlyComparison, ...profitLossSummary.projections]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => formatCurrency(value as number)}
                      labelFormatter={(label) => `${label} 2025`}
                    />
                    <Legend />
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="revenue" name="Actual Revenue" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorRevenue)" />
                    <Area type="monotone" dataKey="profit" name="Actual Profit" stroke="#10B981" fillOpacity={1} fill="url(#colorProfit)" />
                    <Line type="monotone" dataKey="projectedRevenue" name="Projected Revenue" stroke="#8B5CF6" strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="projectedProfit" name="Projected Profit" stroke="#10B981" strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Projected Revenue</TableHead>
                    <TableHead>Projected Expenses</TableHead>
                    <TableHead>Projected Profit</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Growth Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profitLossSummary.projections.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.month} 2025</TableCell>
                      <TableCell className="text-blue-600 font-medium">{formatCurrency(item.projectedRevenue)}</TableCell>
                      <TableCell className="text-red-600 font-medium">{formatCurrency(item.projectedExpenses)}</TableCell>
                      <TableCell className="text-green-600 font-medium">{formatCurrency(item.projectedProfit)}</TableCell>
                      <TableCell>{item.bookings}</TableCell>
                      <TableCell>{formatPercent(item.growthRate)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-700">Break-Even Point</h3>
                    <Info className="h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-xl font-bold mt-2">Q3 2025</p>
                  <p className="text-sm text-gray-500">Expected after 8 months</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-700">Investor ROI Timeline</h3>
                    <Info className="h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-xl font-bold mt-2">Q2 2026</p>
                  <p className="text-sm text-gray-500">Expected after 14 months</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-700">Target Annual Growth</h3>
                    <Info className="h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-xl font-bold mt-2">120%</p>
                  <p className="text-sm text-gray-500">Year-over-Year</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  // Render Agent Analysis
  const renderAgentAnalysis = () => {
    const { topAgents } = reportsData;
    
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="px-6 py-4 border-b border-gray-200">
            <CardTitle className="text-lg font-medium text-gray-800">Top Agents by Revenue & Profitability</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6 h-64">
              <ChartContainer 
                config={{ 
                  revenue: { color: "#8B5CF6" },
                  netMargin: { color: "#10B981" }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topAgents.map(a => ({
                    name: a.name.split(' ').slice(0, 2).join(' '), // Shorten names for display
                    revenue: a.revenue,
                    netMargin: a.netMargin
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8B5CF6" />
                    <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                    <Tooltip 
                      formatter={(value, name) => {
                        return name === 'revenue' || name === 'netMargin' ? 
                          formatCurrency(value as number) : 
                          value;
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#8B5CF6" />
                    <Bar yAxisId="right" dataKey="netMargin" name="Net Margin" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="mt-4 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent Name</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Net Margin</TableHead>
                    <TableHead>Margin %</TableHead>
                    <TableHead>Transactions</TableHead>
                    <TableHead>Commissions</TableHead>
                    <TableHead>Credit Risk</TableHead>
                    <TableHead>YoY Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topAgents.map((agent, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{agent.name}</TableCell>
                      <TableCell>{formatCurrency(agent.revenue)}</TableCell>
                      <TableCell className="text-green-600 font-medium">{formatCurrency(agent.netMargin)}</TableCell>
                      <TableCell>{formatPercent(agent.marginPercent)}</TableCell>
                      <TableCell>{agent.transactions}</TableCell>
                      <TableCell>{formatCurrency(agent.commissionsGiven)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={agent.creditRiskScore === 'A' ? "success" : 
                                agent.creditRiskScore === 'B' ? "warning" : "destructive"}
                        >
                          {agent.creditRiskScore}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center ${
                          agent.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {agent.change.startsWith('+') ? 
                            <ArrowUp className="h-4 w-4 mr-1" /> : 
                            <ArrowDown className="h-4 w-4 mr-1" />
                          }
                          {agent.change}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="px-6 py-4 border-b border-gray-200">
            <CardTitle className="text-lg font-medium text-gray-800">Agent Performance Analytics</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Agent Profitability Matrix */}
              <div>
                <h3 className="text-md font-medium mb-3">Agent Profitability Matrix</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Agent Type</TableHead>
                        <TableHead>Avg. Margin</TableHead>
                        <TableHead>Ticket Volume</TableHead>
                        <TableHead>Credit Risk</TableHead>
                        <TableHead>Retention</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Enterprise</TableCell>
                        <TableCell>15.2%</TableCell>
                        <TableCell>High</TableCell>
                        <TableCell>Very Low</TableCell>
                        <TableCell>92%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">SMB Agency</TableCell>
                        <TableCell>18.7%</TableCell>
                        <TableCell>Medium</TableCell>
                        <TableCell>Low</TableCell>
                        <TableCell>85%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Boutique</TableCell>
                        <TableCell>22.5%</TableCell>
                        <TableCell>Low</TableCell>
                        <TableCell>Medium</TableCell>
                        <TableCell>78%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">New Agent</TableCell>
                        <TableCell>25.0%</TableCell>
                        <TableCell>Very Low</TableCell>
                        <TableCell>High</TableCell>
                        <TableCell>65%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium mb-2">Agent Risk Assessment</h4>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-green-600">A</div>
                      <div className="text-xs text-gray-500">65%</div>
                      <div className="text-xs">Low Risk</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-amber-500">B</div>
                      <div className="text-xs text-gray-500">22%</div>
                      <div className="text-xs">Medium Risk</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-orange-500">C</div>
                      <div className="text-xs text-gray-500">10%</div>
                      <div className="text-xs">High Risk</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-red-600">D</div>
                      <div className="text-xs text-gray-500">3%</div>
                      <div className="text-xs">Very High Risk</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Agent Growth & Retention */}
              <div>
                <h3 className="text-md font-medium mb-3">Agent Growth & Retention</h3>
                <div className="h-80">
                  <ChartContainer 
                    config={{ 
                      newAgents: { color: "#8B5CF6" },
                      retentionRate: { color: "#10B981" }
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        { month: 'Jan', newAgents: 12, retentionRate: 88 },
                        { month: 'Feb', newAgents: 15, retentionRate: 89 },
                        { month: 'Mar', newAgents: 10, retentionRate: 90 },
                        { month: 'Apr', newAgents: 18, retentionRate: 92 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8B5CF6" />
                        <YAxis yAxisId="right" orientation="right" stroke="#10B981" domain={[80, 100]} />
                        <Tooltip />
                        <Legend />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="newAgents"
                          name="New Agents"
                          stroke="#8B5CF6"
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="retentionRate"
                          name="Retention Rate %"
                          stroke="#10B981"
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-medium mb-1 text-sm">Agent Onboarding Target</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">18/25</span>
                      <span className="text-sm text-amber-600">72% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-medium mb-1 text-sm">Agent Retention Target</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">92%</span>
                      <span className="text-sm text-green-600">+4% from Q1</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  // Render Route Analysis
  const renderRouteAnalysis = () => {
    const { topRoutes } = reportsData;
    
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="px-6 py-4 border-b border-gray-200">
            <CardTitle className="text-lg font-medium text-gray-800">Top Routes by Revenue & Profitability</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6 h-64">
              <ChartContainer 
                config={{ 
                  revenue: { color: "#8B5CF6" },
                  baseCost: { color: "#F97316" },
                  margin: { color: "#10B981" }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topRoutes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="route" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => {
                        return name === 'margin' ? 
                          `${value}%` : 
                          formatCurrency(value as number);
                      }}
                    />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue" fill="#8B5CF6" />
                    <Bar dataKey="baseCost" name="Base Cost" fill="#F97316" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="mt-4 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Base Cost</TableHead>
                    <TableHead>Margin %</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Avg Fare</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topRoutes.map((route, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{route.route}</TableCell>
                      <TableCell>{formatCurrency(route.revenue)}</TableCell>
                      <TableCell>{formatCurrency(route.baseCost)}</TableCell>
                      <TableCell>{formatPercent(route.margin)}</TableCell>
                      <TableCell>{route.bookings}</TableCell>
                      <TableCell>{formatCurrency(route.avgFare)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="px-6 py-4 border-b border-gray-200">
            <CardTitle className="text-lg font-medium text-gray-800">Route Profit Analysis</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Route Profitability by Season */}
              <div>
                <h3 className="text-md font-medium mb-3">Route Profitability by Season</h3>
                <div className="h-80">
                  <ChartContainer 
                    config={{ 
                      winter: { color: "#8B5CF6" },
                      spring: { color: "#10B981" },
                      summer: { color: "#F97316" },
                      fall: { color: "#0EA5E9" }
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { route: 'NYC-LON', winter: 16.5, spring: 18.2, summer: 22.5, fall: 19.8 },
                        { route: 'LAX-TYO', winter: 12.8, spring: 14.5, summer: 17.9, fall: 15.2 },
                        { route: 'JFK-CDG', winter: 15.2, spring: 17.8, summer: 21.5, fall: 18.5 },
                        { route: 'SFO-SYD', winter: 13.5, spring: 14.2, summer: 16.8, fall: 14.9 },
                        { route: 'ORD-FRA', winter: 14.8, spring: 15.2, summer: 16.5, fall: 15.0 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="route" />
                        <YAxis />
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                        <Bar dataKey="winter" name="Winter" fill="#8B5CF6" />
                        <Bar dataKey="spring" name="Spring" fill="#10B981" />
                        <Bar dataKey="summer" name="Summer" fill="#F97316" />
                        <Bar dataKey="fall" name="Fall" fill="#0EA5E9" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
              
              {/* Route Cost Breakdown */}
              <div>
                <h3 className="text-md font-medium mb-3">Route Cost Breakdown</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Route</TableHead>
                        <TableHead>Seat Cost</TableHead>
                        <TableHead>GDS Fees</TableHead>
                        <TableHead>Payment Proc.</TableHead>
                        <TableHead>Support</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">NYC-LON</TableCell>
                        <TableCell>92.5%</TableCell>
                        <TableCell>4.2%</TableCell>
                        <TableCell>2.8%</TableCell>
                        <TableCell>0.5%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">LAX-TYO</TableCell>
                        <TableCell>94.2%</TableCell>
                        <TableCell>3.5%</TableCell>
                        <TableCell>1.8%</TableCell>
                        <TableCell>0.5%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">JFK-CDG</TableCell>
                        <TableCell>93.1%</TableCell>
                        <TableCell>3.8%</TableCell>
                        <TableCell>2.6%</TableCell>
                        <TableCell>0.5%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">SFO-SYD</TableCell>
                        <TableCell>95.8%</TableCell>
                        <TableCell>2.2%</TableCell>
                        <TableCell>1.5%</TableCell>
                        <TableCell>0.5%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">ORD-FRA</TableCell>
                        <TableCell>92.8%</TableCell>
                        <TableCell>4.0%</TableCell>
                        <TableCell>2.7%</TableCell>
                        <TableCell>0.5%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium mb-2">Route Profitability Factors</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span>Direct connections yield 4.5% higher margins</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span>NDC routes average 7.2% higher margins than GDS</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                      <span>Legacy routes experiencing 2.8% margin compression</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      <span>High-volume routes show 3.5% higher operational costs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  // Render Financial Dashboard (modified to include base fare and markup)
  const renderFinancialDashboard = () => {
    const { profitLossSummary } = reportsData;
    
    return (
      <div className="space-y-6">
        {/* Key Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                <DollarSign className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(profitLossSummary.totalRevenue)}</p>
              <div className="mt-2 flex items-center text-sm font-medium text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>8.2% from previous period</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
                <DollarSign className="h-5 w-5 text-red-500" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(profitLossSummary.totalExpenses)}</p>
              <div className="mt-2 flex items-center text-sm font-medium text-red-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>6.7% from previous period</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-gray-500">Gross Profit</h3>
                <BarChart2 className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(profitLossSummary.grossProfit)}</p>
              <div className="mt-2 flex items-center text-sm font-medium text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>11.4% from previous period</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-gray-500">Profit Margin</h3>
                <PieChart className="h-5 w-5 text-purple-500" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{formatPercent(profitLossSummary.profitMargin)}</p>
              <div className="mt-2 flex items-center text-sm font-medium text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>2.8% from previous period</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Revenue by Category with Base Fare and Markup */}
        <Card>
          <CardHeader className="px-6 py-4 border-b border-gray-200">
            <CardTitle className="text-lg font-medium text-gray-800">Revenue by Category</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6 h-64">
              <ChartContainer 
                config={{ 
                  revenue: { color: "#8B5CF6" },
                  expenses: { color: "#F97316" }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPI>
                    <Pie
                      data={profitLossSummary.revenueByCategory}
                      dataKey="amount"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({category, percentage}) => `${category}: ${percentage}%`}
                    >
                      {profitLossSummary.revenueByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={(props) => {
                      if (props.payload && props.payload.length) {
                        const data = props.payload[0].payload;
                        return (
                          <div className="bg-white p-2 border border-gray-200 shadow-lg rounded">
                            <p className="font-medium">{data.category}</p>
                            <p>{formatCurrency(data.amount)}</p>
                            <p>Base Fare: {formatCurrency(data.baseFare)}</p>
                            <p>Markup: {formatCurrency(data.markup)} ({formatPercent(data.marginPercent)})</p>
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
            <div className="mt-4 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Base Fare</TableHead>
                    <TableHead>Markup</TableHead>
                    <TableHead>Margin %</TableHead>
                    <TableHead>Distribution</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profitLossSummary.revenueByCategory.map((item, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{item.category}</TableCell>
                      <TableCell>{formatCurrency(item.amount)}</TableCell>
                      <TableCell>{formatCurrency(item.baseFare)}</TableCell>
                      <TableCell>{formatCurrency(item.markup)}</TableCell>
                      <TableCell>{formatPercent(item.marginPercent)}</TableCell>
                      <TableCell>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="h-2.5 rounded-full"
                            style={{ 
                              width: `${item.percentage}%`,
                              backgroundColor: COLORS[index % COLORS.length]
                            }}
                          ></div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        {/* Enhanced Monthly Comparison with Base Fare and Markup */}
        <Card>
          <CardHeader className="px-6 py-4 border-b border-gray-200">
            <CardTitle className="text-lg font-medium text-gray-800">Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6 h-64">
              <ChartContainer 
                config={{ 
                  revenue: { color: "#8B5CF6" },
                  expenses: { color: "#F97316" },
                  profit: { color: "#10B981" },
                  forecast: { color: "#6366F1" }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={profitLossSummary.monthlyComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => formatCurrency(value as number)}
                      labelFormatter={(label) => `${label} 2025`}
                    />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue" fill="#8B5CF6" />
                    <Bar dataKey="baseFare" name="Base Fare" fill="#F97316" />
                    <Bar dataKey="markup" name="Markup" fill="#10B981" />
                    <Line type="monotone" dataKey="forecast" name="Forecast" stroke="#6366F1" strokeWidth={2} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="mt-4 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Base Fare</TableHead>
                    <TableHead>Markup</TableHead>
                    <TableHead>Expenses</TableHead>
                    <TableHead>Profit</TableHead>
                    <TableHead>Forecast</TableHead>
                    <TableHead>Variance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profitLossSummary.monthlyComparison.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.month} 2025</TableCell>
                      <TableCell className="text-blue-600 font-medium">{formatCurrency(item.revenue)}</TableCell>
                      <TableCell>{formatCurrency(item.baseFare)}</TableCell>
                      <TableCell className="text-green-600">{formatCurrency(item.markup)}</TableCell>
                      <TableCell className="text-red-600 font-medium">{formatCurrency(item.expenses)}</TableCell>
                      <TableCell className="text-green-600 font-medium">{formatCurrency(item.profit)}</TableCell>
                      <TableCell>{formatCurrency(item.forecast)}</TableCell>
                      <TableCell className={item.variance > 0 ? "text-green-600" : "text-red-600"}>
                        {item.variance > 0 ? "+" : ""}{formatPercent(item.variance)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  // Render Customer Analysis
  const renderCustomerAnalysis = () => {
    const { topCustomers } = reportsData;
    
    // Prepare data for customer bar chart
    const customerChartData = topCustomers.map(c => ({
      name: c.name.split(' ').slice(0, 2).join(' '), // Shorten names for display
      revenue: c.revenue,
      transactions: c.transactions
    }));
    
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="px-6 py-4 border-b border-gray-200">
            <CardTitle className="text-lg font-medium text-gray-800">Top Customers by Revenue</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6 h-64">
              <ChartContainer 
                config={{ 
                  revenue: { color: "#8B5CF6" },
                  transactions: { color: "#0EA5E9" }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={customerChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8B5CF6" />
                    <YAxis yAxisId="right" orientation="right" stroke="#0EA5E9" />
                    <Tooltip 
                      formatter={(value, name) => {
                        return name === 'revenue' ? 
                          formatCurrency(value as number) : 
                          value;
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#8B5CF6" />
                    <Bar yAxisId="right" dataKey="transactions" name="Transactions" fill="#0EA5E9" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="mt-4 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Transactions</TableHead>
                    <TableHead>Avg. Transaction</TableHead>
                    <TableHead>Last Transaction</TableHead>
                    <TableHead>YoY Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCustomers.map((customer, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(customer.revenue)}</TableCell>
                      <TableCell>{customer.transactions}</TableCell>
                      <TableCell>{formatCurrency(customer.avgValue)}</TableCell>
                      <TableCell>{customer.recentTransaction}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center ${
                          customer.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {customer.change.startsWith('+') ? 
                            <TrendingUp className="h-4 w-4 mr-1" /> : 
                            <TrendingUp className="h-4 w-4 mr-1 transform rotate-180" />
                          }
                          {customer.change}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="px-6 py-4 border-b border-gray-200">
            <CardTitle className="text-lg font-medium text-gray-800">Customer Acquisition & Retention Analysis</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Acquisition Chart */}
              <div className="h-64">
                <ChartContainer config={{ acquisition: { color: "#8B5CF6" } }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { month: 'Jan', new: 8, retained: 85 },
                      { month: 'Feb', new: 10, retained: 87 },
                      { month: 'Mar', new: 8, retained: 89 },
                      { month: 'Apr', new: 12, retained: 92 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="new"
                        name="New Customers"
                        stroke="#8B5CF6"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              {/* Customer Retention Chart */}
              <div className="h-64">
                <ChartContainer config={{ retention: { color: "#10B981" } }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { month: 'Jan', new: 8, retained: 85 },
                      { month: 'Feb', new: 10, retained: 87 },
                      { month: 'Mar', new: 8, retained: 89 },
                      { month: 'Apr', new: 12, retained: 92 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="retained"
                        name="Retention %"
                        stroke="#10B981"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-1">New Customers (MTD)</h4>
                <p className="text-2xl font-bold text-gray-800">12</p>
                <p className="text-sm text-green-600 mt-1">+20% from previous month</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Retention Rate</h4>
                <p className="text-2xl font-bold text-gray-800">82.5%</p>
                <p className="text-sm text-green-600 mt-1">+3.5% from previous month</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Customer Lifetime Value</h4>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(24500)}</p>
                <p className="text-sm text-green-600 mt-1">+5.2% from previous month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  // Render Saved Reports
  const renderSavedReports = () => {
    const { savedReports } = reportsData;
    
    return (
      <div className="space-y-6">
        <Card>
          <div className="p-4 flex flex-wrap items-center justify-between border-b border-gray-200">
            <div className="flex items-center w-full md:w-auto mb-3 md:mb-0">
              <div className="relative flex-grow md:max-w-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search reports..."
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
              <Button size="sm" className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> New Report
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Last Run</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {savedReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium text-blue-600">{report.name}</TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>{report.lastRun}</TableCell>
                    <TableCell>{report.schedule}</TableCell>
                    <TableCell><Badge variant="neutral">{report.format}</Badge></TableCell>
                    <TableCell className="space-x-2">
                      <button className="text-blue-600 hover:text-blue-900" aria-label="Run Report">
                        <RefreshCw className="h-4 w-4 inline-block" />
                      </button>
                      <button className="text-indigo-600 hover:text-indigo-900" aria-label="Download">
                        <Download className="h-4 w-4 inline-block" />
                      </button>
                      <button className="text-green-600 hover:text-green-900" aria-label="Share">
                        <Share className="h-4 w-4 inline-block" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900" aria-label="Copy Report Link">
                        <Clipboard className="h-4 w-4 inline-block" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
        
        <Card>
          <CardHeader className="px-6 py-4 border-b border-gray-200">
            <CardTitle className="text-lg font-medium text-gray-800">Report Scheduling</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6">
              {/* Monthly report schedule visualization */}
              <div className="h-64">
                <ChartContainer config={{ scheduled: { color: "#8B5CF6" } }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { day: '1', reports: 2 },
                      { day: '7', reports: 5 },
                      { day: '15', reports: 3 },
                      { day: '22', reports: 1 },
                      { day: '30', reports: 4 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" label={{ value: 'Day of Month', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Scheduled Reports', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="reports" name="Scheduled Reports" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Upcoming Reports</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="flex h-8 w-8 rounded-full bg-blue-100 items-center justify-center">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </span>
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">Top Customer Analysis</p>
                      <p className="text-xs text-gray-500">Scheduled for: 2025-05-07</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="flex h-8 w-8 rounded-full bg-blue-100 items-center justify-center">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </span>
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">Revenue by Product Category</p>
                      <p className="text-xs text-gray-500">Scheduled for: 2025-05-07</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="flex h-8 w-8 rounded-full bg-blue-100 items-center justify-center">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </span>
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">Outstanding Invoices Aging</p>
                      <p className="text-xs text-gray-500">Scheduled for: 2025-05-08</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Report Recipients</h4>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">MJ</span>
                      <span className="ml-3 text-sm text-gray-900">Michael Johnson (Finance Director)</span>
                    </div>
                    <span className="text-xs text-gray-500">5 reports</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">SW</span>
                      <span className="ml-3 text-sm text-gray-900">Sarah Williams (CEO)</span>
                    </div>
                    <span className="text-xs text-gray-500">3 reports</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">DC</span>
                      <span className="ml-3 text-sm text-gray-900">David Chen (Sales Manager)</span>
                    </div>
                    <span className="text-xs text-gray-500">2 reports</span>
                  </li>
                </ul>
                <button className="mt-4 text-sm text-blue-600 flex items-center">
                  <Plus className="h-4 w-4 mr-1" /> Add Recipient
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center">
            <BarChart2 className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative inline-block text-left">
              <select
                className="block appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={dateRange}
                onChange={(e) => {
                  setDateRange(e.target.value);
                  setShowCustomDate(e.target.value === 'Custom Range');
                }}
              >
                <option>Today</option>
                <option>Yesterday</option>
                <option>Last 7 Days</option>
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Quarter</option>
                <option>Custom Range</option>
              </select>
            </div>
            
            {showCustomDate && (
              <div className="flex items-center space-x-2">
                <DatePicker date={startDate} setDate={setStartDate} placeholder="Start date" />
                <span className="text-gray-500">to</span>
                <DatePicker date={endDate} setDate={setEndDate} placeholder="End date" />
              </div>
            )}
            
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Save className="h-4 w-4" /> Save
            </Button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mb-6">
          <Tabs defaultValue="dashboard" onValueChange={(value) => setActiveTab(value)}>
            <TabsList className="grid grid-cols-2 md:grid-cols-7 mb-4">
              <TabsTrigger value="dashboard">Financial Dashboard</TabsTrigger>
              <TabsTrigger value="investorDashboard">Investor Dashboard</TabsTrigger>
              <TabsTrigger value="agentAnalysis">Agent Analysis</TabsTrigger>
              <TabsTrigger value="routeAnalysis">Route Analysis</TabsTrigger>
              <TabsTrigger value="customerAnalysis">Customer Analysis</TabsTrigger>
              <TabsTrigger value="savedReports">Saved Reports</TabsTrigger>
              <TabsTrigger value="customReports">Custom Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard">
              {renderFinancialDashboard()}
            </TabsContent>
            <TabsContent value="investorDashboard">
              {renderInvestorDashboard()}
            </TabsContent>
            <TabsContent value="agentAnalysis">
              {renderAgentAnalysis()}
            </TabsContent>
            <TabsContent value="routeAnalysis">
              {renderRouteAnalysis()}
            </TabsContent>
            <TabsContent value="customerAnalysis">
              {renderCustomerAnalysis()}
            </TabsContent>
            <TabsContent value="savedReports">
              {renderSavedReports()}
            </TabsContent>
            <TabsContent value="customReports">
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">Custom Reports content will be available soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
