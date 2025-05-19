
# FinanceFlow - Financial Management System

## Project Overview

FinanceFlow is a comprehensive financial management system designed to help businesses track, manage, and analyze their financial data. With an intuitive interface and powerful features, it simplifies financial operations and provides valuable insights into your business's financial health.

**URL**: https://lovable.dev/projects/0a6a7460-f775-444f-b9a6-88d7d2991967

## Application Structure

### Navigation Menu

The FinanceFlow application has the following main navigation items in the sidebar:

- **Dashboard** - Overview of financial data and key metrics
- **Ledger** - Financial records and journal entries 
- **Payments** - Payment management and processing
- **Bills & Invoices** - Manage bills, invoices and statements
- **Analytics** - Financial reports and data visualizations
- **Expenses** - Expense tracking and management

### Tab-based Navigation

Several sections include tab-based navigation for accessing related features:

- **Ledger**
  - Accounts
  - Journal Entries
  - Reconciliation
  - Reports

- **Expenses**
  - Overview
  - Fixed Expenses
  - Variable Expenses
  - Reports

### Common Actions and Filters

Throughout the application, you'll find these common UI elements:

- **Date Range Selectors** - Filter data by specific time periods
- **Currency Filters** - Change currency display when viewing financial data
- **Export/Print Options** - Export data to various formats
- **Filter Controls** - Filter data by different attributes
- **Search** - Search functionality for locating specific records

## System Features & Functionality

### Dashboard
- **Financial Overview** - Summary of key financial metrics
- **Recent Transactions** - Latest financial activities
- **Cash Flow Charts** - Visual representation of money movement
- **Outstanding Invoices** - Unpaid invoice summary
- **Expense Breakdown** - Categorized expense visualization

### Ledger
- **Chart of Accounts** - Hierarchical account structure management
- **Journal Entries** - Record and view financial transactions
- **Account Reconciliation** - Match transactions with bank statements
- **Financial Statements** - Generate balance sheets and income statements

### Payments
- **Payment Processing** - Record incoming and outgoing payments
- **Payment Methods** - Track different payment types (credit card, bank transfer)
- **Payment Status Tracking** - Monitor payment lifecycle
- **Receipt Management** - Generate and store payment receipts

### Bills & Invoices
- **Invoice Generation** - Create professional invoices
- **Bill Management** - Track and pay vendor bills
- **Credit Notes** - Process refunds and adjustments
- **Aging Reports** - Track overdue amounts by time period

### Analytics
- **Revenue Analysis** - Analyze income sources and trends
- **Expense Analysis** - Track spending patterns
- **Business Partner Analysis** - Evaluate agent and customer relationships
- **Financial Performance** - Compare actual vs. budgeted figures

### Expenses
- **Expense Tracking** - Record and categorize expenses
- **Fixed vs. Variable Expenses** - Separate tracking for different expense types
- **Multi-currency Support** - Record expenses in different currencies
- **Expense Approval Workflow** - Process for reviewing and approving expenses

## Data Model

### Core Financial Entities

#### Currency
| Field | Description |
|-------|-------------|
| code | Currency code (e.g., USD, EUR) |
| symbol | Currency symbol (e.g., $, €) |
| name | Full currency name |

#### Office
| Field | Description |
|-------|-------------|
| id | Unique identifier |
| name | Office location name |
| currency | Default currency for this office |

#### Account Category
| Field | Description |
|-------|-------------|
| id | Unique identifier |
| name | Category name |
| type | Account category type |
| accounts | Related account records |

#### Account
| Field | Description |
|-------|-------------|
| id | Unique identifier |
| code | Account code for reference |
| name | Account name |
| balance | Current account balance |
| type | Account type (asset, liability, etc.) |

#### Journal Entry
| Field | Description |
|-------|-------------|
| id | Unique identifier |
| date | Transaction date |
| reference | Reference number |
| description | Transaction description |
| debitAccount | Account being debited |
| creditAccount | Account being credited |
| amount | Transaction amount |
| status | Entry status |
| booking_id | Optional link to booking |
| passenger_id | Optional link to passenger |
| action_type | Transaction type (TKT, AMD, RFD) |

#### Expense
| Field | Description |
|-------|-------------|
| id | Unique identifier |
| date | Expense date |
| category | Expense category |
| amount | Expense amount |
| currency | Currency code |
| office | Associated office |
| description | Expense description |
| exchangeRate | Currency exchange rate |
| paymentMethod | Method of payment |
| booking_id | Optional booking reference |
| passenger_id | Optional passenger reference |

#### Business Partner
| Field | Description |
|-------|-------------|
| id | Unique identifier |
| name | Partner name |
| type | Partner type (agent, customer, supplier) |
| currency | Partner's default currency |
| creditRiskScore | Risk assessment score |
| revenue | Total revenue generated |
| transactions | Number of transactions |
| avgValue | Average transaction value |
| recentTransaction | Date of most recent transaction |
| change | Change in activity or status |

### Booking-Related Entities

#### Booking
| Field | Description |
|-------|-------------|
| booking_id | Unique booking identifier |
| agent_id | Reference to business partner |
| total_amount | Total booking amount |
| currency | Currency code |
| status | Booking status |
| created_at | Creation date |
| route | Travel route |
| departure_date | Departure date |
| return_date | Return date (if applicable) |
| amend_status | Amendment status |
| refund_status | Refund status |

#### Passenger
| Field | Description |
|-------|-------------|
| passenger_id | Unique passenger identifier |
| booking_id | Associated booking |
| name | Passenger name |
| ticket_number | Airline ticket number |
| status | Passenger status |
| fare_amount | Individual fare amount |
| fare_type | Fare category |
| amend_status | Amendment status |
| refund_status | Refund status |

#### Invoice
| Field | Description |
|-------|-------------|
| invoice_id | Unique invoice identifier |
| booking_id | Associated booking |
| passenger_id | Associated passenger (if applicable) |
| amount | Invoice amount |
| currency | Currency code |
| status | Invoice status |
| action_type | Action type code |
| date | Invoice date |
| due_date | Payment due date |

#### Credit Note
| Field | Description |
|-------|-------------|
| credit_note_id | Unique credit note identifier |
| invoice_id | Associated invoice |
| booking_id | Associated booking |
| passenger_id | Associated passenger |
| amount | Credit note amount |
| currency | Currency code |
| reason | Reason for credit note |
| status | Credit note status |
| date | Issue date |

#### Payment
| Field | Description |
|-------|-------------|
| payment_id | Unique payment identifier |
| invoice_id | Associated invoice |
| booking_id | Associated booking |
| passenger_id | Associated passenger (if applicable) |
| amount | Payment amount |
| currency | Currency code |
| method | Payment method |
| status | Payment status |
| date | Payment date |
| reference | Payment reference number |

#### Receipt
| Field | Description |
|-------|-------------|
| receipt_id | Unique receipt identifier |
| payment_id | Associated payment |
| booking_id | Associated booking |
| passenger_id | Associated passenger (if applicable) |
| date | Issue date |
| amount | Receipt amount |
| currency | Currency code |

## Available Reports

### Ledger Reports
- **Trial Balance** - Summary of all debit and credit balances
- **Balance Sheet** - Snapshot of assets, liabilities, and equity
- **Income Statement** - Profit and loss over a specified period
- **Cash Flow Statement** - Tracking of cash movements
- **Journal Entry Log** - Chronological list of all journal entries

### Expense Reports
- **Expense by Category** - Breakdown of expenses by category
- **Expense by Office** - Expenses segregated by office location
- **Fixed vs Variable Analysis** - Comparison of expense types
- **Monthly Expense Trend** - Expense patterns over time
- **Currency Exchange Impact** - Effect of exchange rates on expenses

### Payment Reports
- **Payment Collection Report** - Overview of received payments
- **Aging Analysis** - Outstanding payments by age
- **Payment Method Distribution** - Breakdown by payment method
- **Overdue Payments** - List of late payments
- **Payment Forecast** - Projected upcoming payments

### Analytics Reports
- **Revenue by Source** - Income breakdown by category
- **Customer Profitability** - Analysis of customer value
- **Agent Performance** - Evaluation of agent-generated business
- **Financial KPI Dashboard** - Key performance indicators
- **Year-over-Year Comparison** - Multi-year trend analysis

## Technical Implementation

### Technology Stack
- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn-ui
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Data Fetching**: TanStack Query (React Query)
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **Form Management**: React Hook Form with Zod validation

### Key Components
- **AppLayout** - Main application layout with sidebar
- **Sidebar** - Navigation component with collapsible menu
- **TabNavigation** - Tab-based secondary navigation
- **DataTable** - Reusable table component with sorting and filtering
- **DateRangePicker** - Component for selecting date ranges
- **CurrencySelector** - Dropdown for currency selection
- **ExchangeRateModal** - Modal for managing currency exchange rates
- **ExpenseForm** - Form for adding and editing expenses
- **JournalEntryForm** - Form for creating journal entries
- **FilterControls** - Reusable filter components

## How to Edit This Code

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/0a6a7460-f775-444f-b9a6-88d7d2991967) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## How to Deploy This Project

Simply open [Lovable](https://lovable.dev/projects/0a6a7460-f775-444f-b9a6-88d7d2991967) and click on Share -> Publish.

## Custom Domain Connection

Yes, you can connect a custom domain to your Lovable project!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
