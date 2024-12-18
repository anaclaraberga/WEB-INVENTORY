import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from './data-table-view-options'

import { DataTableFacetedFilter } from './data-table-faceted-filter'

export interface DataTableToolbarConfig {
  placeholder: string,
  searchKey: string,
  filters: {
    type?: string,
    key: string,
    title: string,
    options: {
      label: string,
      value: string,
      icon?: React.ComponentType<{ className?: string }>
    }[]
  }[]
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  config: DataTableToolbarConfig
}

export function DataTableToolbar<TData>({
  table, config
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder={config.placeholder}
          value={(table.getColumn(config.searchKey)?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn(config.searchKey)?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div className='flex gap-x-2'>
          {config.filters.map((filter, key) => {
            return table.getColumn(filter.key) && (
              <DataTableFacetedFilter
                key={key}
                column={table.getColumn(filter.key)}
                title={filter.title}
                options={filter.options}
                type={filter.type}
              />
            )
          })}
        </div>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
