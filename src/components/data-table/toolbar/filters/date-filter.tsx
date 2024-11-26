import { Button } from "@/components/custom/button"
import { Calendar } from "@/components/ui/calendar"
import { CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"

export const DateFilter = ({ option, isSelected, selectedValues, column, facets }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(option.value ?? null));
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setIsOpen(false);
  };

  console.log(selectedDate)

  const format = (date: Date | null) => {
    if (!date) return 'Selecionar Data';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <CommandItem
      key={option.value}
      onSelect={() => {
        if (isSelected) {
          selectedValues.delete(option.value)
        } else {
          selectedValues.add(option.value)
        }
        const filterValues = Array.from(selectedValues)
        column?.setFilterValue(
          filterValues.length ? filterValues : undefined
        )
      }}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            {selectedDate ? (
              format(selectedDate)
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateChange}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
          />
        </PopoverContent>
      </Popover>
    </CommandItem>)
}