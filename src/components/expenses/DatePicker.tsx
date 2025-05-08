
import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useFinancialData } from "../../contexts/FinancialDataContext";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  fieldName?: string;
}

export function DatePicker({ 
  date, 
  setDate, 
  label, 
  placeholder = "Pick a date",
  className,
  disabled = false,
  fieldName
}: DatePickerProps) {
  // Connect to financial data context if fieldName is provided
  const financialData = fieldName ? useFinancialData() : null;
  const hasConnections = fieldName && financialData ? financialData.getFieldConnections(fieldName).length > 0 : false;
  
  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      {label && (
        <div className="flex items-center">
          <span className="text-sm font-medium">{label}</span>
          {hasConnections && (
            <Badge variant="outline" className="ml-2">Connected</Badge>
          )}
        </div>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
