import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { DataTableRowActions, DropdownOption } from '@/components/data-table/data-table-row-actions'
import { Checkbox } from '@/components/ui/checkbox'

import { DataTableToolbarConfig } from '@/components/data-table/data-table-toolbar'
import { ProductSchema, productSchema } from './schema'

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

export const columns: ColumnDef<ProductSchema>[] = [
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
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Preço' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('price')}
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} schema={productSchema} options={rowActionsOptions} />,
  },
]

export const toolbar: DataTableToolbarConfig = {
  placeholder: 'Filtrar produtos...',
  searchKey: 'name',
  filters: [{
    key: 'price',
    title: 'Preço',
    options: [
      {
        label: '< 50',
        value: '50'
      },
      {
        label: '< 100',
        value: '100'
      },
      {
        label: '< 300',
        value: '300'
      }
    ]
  }]
}
