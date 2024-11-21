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
import { useNavigate, useParams } from 'react-router-dom'
import { supplierFormSchema, SupplierFormValues } from './form-schema'

export default function AddSupplierPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState<SupplierFormValues>({
    id: null,
    name: '',
    contact: '',
    cnpj: '',
    address: '',
  })

  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierFormSchema),
    defaultValues: formValues,
    values: formValues,
    mode: 'onChange',
  })

  async function onSubmit(data: SupplierFormValues) {
    try {
      if (formValues.id) {
        await SupplierService.update(data.id!, data)
      } else {
        await SupplierService.create(data)
      }

      toast({
        title: 'Supplier created successfully',
      })
      navigate('/admin/suppliers')
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
      }
    })()
  }, [])

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
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Theodore Franklin' />
                  </FormControl>
                  <FormDescription>
                    Nome completo do fornecedor
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )
            }}
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
            name='cnpj'
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNPJ</FormLabel>
                <FormControl>
                  <Input
                    placeholder='00.623.904/0001-73'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  CNPJ do fornecedor
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
