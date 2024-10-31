import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Row } from '@tanstack/react-table'
import { EllipsisVertical } from 'lucide-react'

export interface DropdownOption {
  label: string,
  value: string,
  type: 'item' | 'sub',
  options?: DropdownOption[]
  onClick?: (row: any) => void,
  className?: string
}

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  options: DropdownOption[]
  schema: any
}

export function DataTableRowActions<TData>({
  row,
  options,
  schema
}: DataTableRowActionsProps<TData>) {

  const renderDropdownOption = (option: DropdownOption) => {
    if (option.type == 'item') {
      return (
        <DropdownMenuItem key={option.value + 1} onClick={() => option.onClick?.(row.original)} className={option.className}>
          {option.label}
        </DropdownMenuItem>
      )
    }

    if (option.type == 'sub') {
      return (
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>{option.label}</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={option.value}>
              {option.options?.map((e) => renderDropdownOption(e))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      )
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <EllipsisVertical className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        {options.map((option: DropdownOption) => renderDropdownOption(option))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
