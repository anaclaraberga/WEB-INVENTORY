import { Button } from '@/components/custom/button'
import { DataTable } from '@/components/data-table/data-table'
import { BaseTemplate } from '@/template/Base'
import { useNavigate } from 'react-router-dom'
import { columns, toolbar } from './data-table/config'
import { data } from './data-table/data'

export default function Supplier() {
  const navigation = useNavigate()

  return (
    <BaseTemplate>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div className='flex w-full justify-between'>
          <h2 className='text-2xl font-bold tracking-tight'>Fornecedores</h2>
          <Button onClick={() => navigation("/supplier/add")}>Novo fornecedor</Button>
        </div>
      </div>
      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <DataTable data={data} columns={columns} toolbar={toolbar}/>
      </div>
    </BaseTemplate>
  )
}
