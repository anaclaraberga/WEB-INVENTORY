import { ProductService } from '@/api/services/product-service'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { BaseTemplate } from '@/template/Base'
import { NumberUtils } from '@/utils/NumberUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { SupplierFormValues } from '../suppliers/form-schema'
import { defaultValues, productFormSchema, ProductFormValues } from './form-schema'

export default function AddProductPage() {
  const { id } = useParams()
  const [suppliers, setSuppliers] = useState([])
  const [formValues, setFormValues] = useState(defaultValues)
  const navigate = useNavigate()

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: formValues,
    values: formValues,
    mode: 'onChange',
  })

  async function onSubmit(data: ProductFormValues) {
    try {
      if (data.id) {
        await ProductService.update(data.id as number, data)
      } else {
        await ProductService.create(data);
      }

      toast({
        title: 'Produto criado com sucesso',
        description: ''
      })

      navigate("/admin/products")

    } catch (error: any) {
      toast({
        title: 'Ocorreu um erro',
        description: error.response.data.message
      })
    }
  }

  const fileRef = form.register("image");

  useEffect(() => {
    (async () => {
      try {
        if (id && typeof id == "number") {
          const product = await ProductService.findById(id)
          setFormValues(product)
        }

        const response = await SupplierService.findAll()
        setSuppliers(response)
      } catch (error) {
        toast({
          title: "Ocorreu um erro"
        })
      }

    })()
  }, [])

  return (
    <BaseTemplate>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div className='flex w-full justify-between'>
          <h2 className='text-2xl font-bold tracking-tight'>Novo produto</h2>
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
                  <Input placeholder='shadcn' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Notebook de altíssima qualidade'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  (Opcional) Descrição do produto
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input
                    className='shadcn'
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      form.setValue("price", Number(value))
                    }}
                    value={NumberUtils.formatToBRLCurrency(field.value)} />
                </FormControl>
                <FormDescription>
                  Preço unitário do produto
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='quantity'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    className='shadcn'
                    {...field}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '');
                      form.setValue("quantity", Number(value))
                    }
                    } />
                </FormControl>
                <FormDescription>
                  Quantidade em estoque do produto
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='image'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagem</FormLabel>
                <FormControl>
                  <Input
                    type='file'
                    accept='image/png,image/jpg'
                    multiple={false}
                    {...fileRef}
                  />
                </FormControl>
                <FormDescription>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='fornecedorId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fornecedor</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Fornecedores' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {suppliers.map((e: SupplierFormValues, key) => (
                      <SelectItem value={e.id!.toString()} key={key}>{e.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
