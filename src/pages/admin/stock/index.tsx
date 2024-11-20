import { TransactionService } from '@/api/services/transaction-service'
import { DataTable } from '@/components/data-table/data-table'
import { useToast } from '@/components/ui/use-toast'
import { BaseTemplate } from '@/template/Base'
import { useEffect, useState } from 'react'
import { columns, toolbar } from './data-table/config'

export default function Transactions() {
  const [data, setData] = useState([])
  const { toast } = useToast()

  useEffect(() => {
    (async () => {
      try {
        const response = await TransactionService.findAll()
        setData(response)
      } catch (error) {
        toast({
          title: 'Não foi possível conectar com o servidor',
          description: 'Tente novamente mais tarde',
        })
      }
    })()
  }, [])

  return (
    <BaseTemplate>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div className='flex w-full justify-between'>
          <h2 className='text-2xl font-bold tracking-tight'>Transações</h2>
        </div>
      </div>
      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <DataTable data={data} columns={columns} toolbar={toolbar} />
      </div>
    </BaseTemplate>
  )
}
