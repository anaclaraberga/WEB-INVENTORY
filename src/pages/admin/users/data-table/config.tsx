import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { DropdownOption } from '@/components/data-table/data-table-row-actions'
import { Checkbox } from '@/components/ui/checkbox'

import { DataTableToolbarConfig } from '@/components/data-table/data-table-toolbar'
import { UserSchema } from './schema'

export const rowActionsOptions: DropdownOption[] = [
  {
    type: 'item',
    value: 'edit',
    label: 'Edit',
    onClick: () => console.log('Edited')
  },
  {
    type: 'item',
    value: 'delete',
    label: 'Delete',
    className: '!text-red-500 hover:text-red-500',
    onClick: () => console.log('Deleted')
  },
]

export const columns: ColumnDef<UserSchema>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Id' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nome' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('name')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('email')}
          </span>
        </div>
      )
    },
  },
]

export const toolbar: DataTableToolbarConfig = {
  placeholder: 'Filtrar usuarios...',
  searchKey: 'name',
  filters: [],
}
