
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw, Save } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Currency {
  code: string;
  symbol: string;
  name: string;
}

interface ExchangeRateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currencies: Currency[];
  exchangeRates: Record<string, number>;
}

export function ExchangeRateModal({ isOpen, onClose, currencies, exchangeRates }: ExchangeRateModalProps) {
  const [rates, setRates] = useState<Record<string, string>>(
    Object.entries(exchangeRates).reduce((acc, [code, rate]) => {
      acc[code] = rate.toString();
      return acc;
    }, {} as Record<string, string>)
  );
  
  const [isFetching, setIsFetching] = useState(false);

  const handleRateChange = (currencyCode: string, value: string) => {
    setRates(prev => ({
      ...prev,
      [currencyCode]: value
    }));
  };

  const handleFetchLatest = () => {
    setIsFetching(true);
    // Simulate API call to fetch latest rates
    setTimeout(() => {
      setIsFetching(false);
      setRates({
        EUR: "1",
        INR: "0.0105",
        USD: "0.91",
        GBP: "1.17"
      });
      toast({
        title: "Exchange rates updated",
        description: "Latest exchange rates have been fetched."
      });
    }, 1500);
  };

  const handleSave = () => {
    // Validate rates
    for (const [code, rate] of Object.entries(rates)) {
      const parsedRate = parseFloat(rate);
      if (isNaN(parsedRate) || parsedRate <= 0) {
        toast({
          title: "Invalid exchange rate",
          description: `The exchange rate for ${code} must be a positive number.`,
          variant: "destructive"
        });
        return;
      }
    }
    
    // Format rates to numbers
    const formattedRates = Object.entries(rates).reduce((acc, [code, rate]) => {
      acc[code] = parseFloat(rate);
      return acc;
    }, {} as Record<string, number>);
    
    console.log('Saving exchange rates:', formattedRates);
    
    toast({
      title: "Exchange rates saved",
      description: "Your exchange rates have been updated."
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Exchange Rate Management</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-gray-500 mb-4">
            Set the exchange rates for all currencies relative to your base currency (EUR).
          </p>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Currency</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Exchange Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currencies.map((currency) => (
                <TableRow key={currency.code}>
                  <TableCell className="font-medium">
                    {currency.symbol} {currency.name}
                  </TableCell>
                  <TableCell>{currency.code}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="0.0001"
                      step="0.0001"
                      value={rates[currency.code] || "1"}
                      onChange={(e) => handleRateChange(currency.code, e.target.value)}
                      className="w-24"
                      disabled={currency.code === "EUR"} // Base currency rate is always 1
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="mt-4 text-sm text-gray-500">
            <p>Last updated: May 2, 2025 09:45 AM</p>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button
            variant="outline"
            onClick={handleFetchLatest}
            disabled={isFetching}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
            {isFetching ? "Fetching..." : "Fetch Latest"}
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Rates
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
