import { Button } from '@/components/custom/button'
import { BaseTemplate } from '@/template/Base'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { tasks } from './data/tasks'

export default function Products() {
  return (
    <BaseTemplate>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div className='flex w-full justify-between'>
          <h2 className='text-2xl font-bold tracking-tight'>Produtos</h2>
          <Button>New product</Button>
        </div>
      </div>
      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <DataTable data={tasks} columns={columns} />
      </div>
    </BaseTemplate>
  )
}
