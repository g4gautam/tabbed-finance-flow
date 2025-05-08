
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Ledger from "./pages/Ledger";
import Payments from "./pages/Payments";
import BillsInvoices from "./pages/BillsInvoices";
import Analytics from "./pages/Analytics";
import Expenses from "./pages/Expenses";
import Bookings from "./pages/Bookings"; // New Bookings page
import { AppLayout } from "./components/layout/AppLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ledger" element={
            <AppLayout>
              <Ledger />
            </AppLayout>
          } />
          <Route path="/payments" element={
            <AppLayout>
              <Payments />
            </AppLayout>
          } />
          <Route path="/bills-invoices" element={
            <AppLayout>
              <BillsInvoices />
            </AppLayout>
          } />
          <Route path="/analytics" element={
            <AppLayout>
              <Analytics />
            </AppLayout>
          } />
          <Route path="/expenses" element={
            <AppLayout>
              <Expenses />
            </AppLayout>
          } />
          <Route path="/bookings" element={
            <AppLayout>
              <Bookings />
            </AppLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
