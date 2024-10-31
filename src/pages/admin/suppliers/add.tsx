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
import { toast } from '@/components/ui/use-toast'
import { BaseTemplate } from '@/template/Base'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { defaultValues, supplierFormSchema, SupplierFormValues } from './form-schema'

export default function AddSupplierPage() {
  const { id } = useParams()
  const [formValues, setFormValues] = useState(defaultValues)

  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierFormSchema),
    defaultValues: formValues,
    mode: 'onChange',
  })

  async function onSubmit(data: SupplierFormValues) {
    try {
      const response = await SupplierService.create(data)
      toast({
        title: 'Supplier created successfully',
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
        const response = await SupplierService.findById(id)
        setFormValues({ ...response })
        form.formState.defaultValues = formValues
      }
    })()
  }, [id])

  return (
    <BaseTemplate>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div className='flex w-full justify-between'>
          <h2 className='text-2xl font-bold tracking-tight'>Novo fornecedor</h2>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(async (e) => await onSubmit(e))} className='space-y-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder='shadcn' {...field} defaultValue={field.value} value={field.value} />
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
                  <Input
                    placeholder='+55 (45) 98765-4321'
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
