import { SupplierService } from '@/api/services/supplier'
import { Button } from '@/components/custom/button'
import { DataTable } from '@/components/data-table/data-table'
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions'
import { BaseTemplate } from '@/template/Base'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { columns, toolbar } from './data-table/config'
import { supplierSchema } from './data-table/schema'

export default function Supplier() {
  const navigation = useNavigate()
  const [data, setData] = useState([])

  useEffect(() => {
    SupplierService
      .findAll()
      .then(response => setData(response.data))
      .catch(error => console.log(error))
  }, [])

  const newColumns = [
    ...columns,
    {
      id: 'actions',
      cell: ({ row }) => <DataTableRowActions row={row} schema={supplierSchema} options={[
        {
          type: 'item',
          value: 'edit',
          label: 'Edit',
          onClick: (row) => { navigation("/admin/suppliers/" + row.id) }
        },
        {
          type: 'item',
          value: 'delete',
          label: 'Delete',
          className: '!text-red-500 hover:text-red-500',
          onClick: (row) => console.log(row)
        },
      ]} />,
    },
  ]

  return (
    <BaseTemplate>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div className='flex w-full justify-between'>
          <h2 className='text-2xl font-bold tracking-tight'>Fornecedores</h2>
          <Button onClick={() => navigation("/supplier/add")}>Novo fornecedor</Button>
        </div>
      </div>
      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <DataTable data={data} columns={newColumns} toolbar={toolbar} />
      </div>
    </BaseTemplate>
  )
}
