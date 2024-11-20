import { SupplierService } from '@/api/services/supplier-service'
import { SupplierCard } from '@/components/supplier-card'
import { useToast } from '@/components/ui/use-toast'
import { BaseTemplate } from '@/template/Base'
import { useEffect, useState } from 'react'

export default function UserSupplier() {
  const [data, setData] = useState([1,2,3,4,5,6])
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

  return (
    <BaseTemplate>
      <div className='mb-2 flex items-start justify-between flex-col space-y-2 gap-5'>
        <div className='flex w-full justify-between'>
          <h1 className='text-3xl font-bold tracking-tight'>Fornecedores</h1>
        </div>
        <div className='w-full grid grid-cols-4 gap-4 items-start justify-start'>
          {data.map((e, i) => {
            return <SupplierCard key={i} name='Bill Estrada' description='Melvin Frazier' />
          })}
        </div>
      </div>
    </BaseTemplate>
  )
}
