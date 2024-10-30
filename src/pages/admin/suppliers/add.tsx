import { SupplierService } from '@/api/services/supplier-service'
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
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { BaseTemplate } from '@/template/Base'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { defaultValues, supplierFormSchema, SupplierFormValues } from './form-schema'

export default function AddSupplierPage() {
  const { id } = useParams()
  let formValues

  useEffect(() => {
    if (id) {
      SupplierService
        .findById(id)
        .then(response => {
          formValues = { ...defaultValues, ...response }
        })
        .catch(error => console.log(error))
    } else {
      formValues = defaultValues
    }
  }, [id])

  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierFormSchema),
    defaultValues: formValues,
    mode: 'onChange',
  })

  function onSubmit(data: SupplierFormValues) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <BaseTemplate>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div className='flex w-full justify-between'>
          <h2 className='text-2xl font-bold tracking-tight'>Novo fornecedor</h2>
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
                  <Input placeholder='shadcn' {...field} />
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
                  <Textarea
                    placeholder='+55 (45) 98765-4321'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Informações para contato do fornecedor
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
                    className='shadcn'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Endereço do fornecedor
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Salvar</Button>
        </form>
      </Form>
    </BaseTemplate>
  )
}
