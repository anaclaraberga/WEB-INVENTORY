import { CustomerService } from '@/api/services/customer-service'
import { OrderService } from '@/api/services/order-service'
import { Button } from '@/components/custom/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { BaseTemplate } from '@/template/Base'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { OrderFormValues } from '../orders/form-schema'
import { clientFormSchema, ClientFormValues, defaultValues } from './form-schema'

export default function AddClientPage() {
  const { id } = useParams()
  const [formValues, setFormValues] = useState(defaultValues)
  const [history, setHistory] = useState([])

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: formValues,
    values: formValues,
    mode: 'onChange',
  })

  async function onSubmit(data: ClientFormValues) {
    try {
      if (formValues.id) {
        await CustomerService.update(data.id as number, data)
      } else {
        await CustomerService.create(data)
      }

      toast({
        title: 'Client created successfully',
      })
    } catch (error: any) {
      toast({
        title: 'Error creating supplier',
        description: error.message,
      })
    }
  }

  useEffect(() => {
    (async () => {
      if (id) {
        const response = await CustomerService.findById(id)
        const orders = await OrderService.findByCustomerId(id)
        setFormValues({ ...response })
        setHistory(orders)
      }
    })()
  }, [])

  return (
    <BaseTemplate>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div className='flex w-full justify-between'>
          <h2 className='text-2xl font-bold tracking-tight'>Novo cliente</h2>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='document'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Documento</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='contact'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contato</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Informações para contato do cliente
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Endereço do cliente
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Salvar</Button>
        </form>
      </Form>
      {history.length > 0 && (
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div className='flex w-full justify-between'>
            <h2 className='text-2xl font-bold tracking-tight'>Histórico de pedido</h2>
          </div>
          <div className='flex flex-col'>
            {history.map((item: OrderFormValues, i: number) => {
              return (
              <div key={i}>
                <div><h3>{item.date.toString()}</h3></div>
                <div><h3>{item.status}</h3></div>
              </div>)
            })}
          </div>
        </div>
      )}
    </BaseTemplate>
  )
}
