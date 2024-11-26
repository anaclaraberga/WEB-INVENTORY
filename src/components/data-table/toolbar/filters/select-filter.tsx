import { CommandItem } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

export const SelectFilter = ({ option, isSelected, selectedValues, column, facets }) => {
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
      <div
        className={cn(
          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
          isSelected
            ? 'bg-primary text-primary-foreground'
            : 'opacity-50 [&_svg]:invisible'
        )}
      >
        <CheckIcon className={cn('h-4 w-4')} />
      </div>
      {option.icon && (
        <option.icon className='mr-2 h-4 w-4 text-muted-foreground' />
      )}
      <span>{option.label}</span>
      {facets?.get(option.value) && (
        <span className='ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs'>
          {facets.get(option.value)}
        </span>
      )}
    </CommandItem>)
}