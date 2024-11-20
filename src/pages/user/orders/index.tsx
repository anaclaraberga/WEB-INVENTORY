import { SupplierService } from '@/api/services/supplier-service'
import { Button } from '@/components/custom/button'
import { DataTable } from '@/components/data-table/data-table'
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions'
import { useToast } from '@/components/ui/use-toast'
import { BaseTemplate } from '@/template/Base'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { columns, toolbar } from './data-table/config'
import { orderSchema } from './data-table/schema'

export default function Orders() {
  const navigation = useNavigate()
  const [data, setData] = useState([])
  const { toast } = useToast()

  useEffect(() => {
    (async () => {
      try {
        const response = await SupplierService.findAll()
        setData(response)
      } catch (error) {
        toast({
          title: 'Não foi possível conectar com o servidor',
          description: 'Tente novamente mais tarde',
        })
      }
    })()
  }, [])

  const newColumns = [
    ...columns,
    {
      id: 'actions',
      cell: ({ row }: any) => (<DataTableRowActions row={row} schema={orderSchema} options={[
        {
          type: 'item',
          value: 'edit',
          label: 'Edit',
          onClick: (row) => { navigation("/admin/orders/" + row.id) }
        },
        {
          type: 'item',
          value: 'delete',
          label: 'Delete',
          className: '!text-red-500 hover:text-red-500',
          onClick: async (row) => {
            try {
              await SupplierService.delete(row.id)
              location.reload()
            } catch (error: any) {
              toast({
                title: 'Error deleting supplier',
                description: error.message,
              })
            }
          }
        },
      ]} />),
    },
  ]

  return (
    <BaseTemplate>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div className='flex w-full justify-between'>
          <h2 className='text-2xl font-bold tracking-tight'>Pedidos</h2>
          <Button onClick={() => navigation("/admin/orders/add")}>Novo pedido</Button>
        </div>
      </div>
      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <DataTable data={data} columns={newColumns} toolbar={toolbar} />
      </div>
    </BaseTemplate>
  )
}
