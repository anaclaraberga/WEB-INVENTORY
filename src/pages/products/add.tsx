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
import { useForm } from 'react-hook-form'
import { defaultValues, productFormSchema, ProductFormValues } from './form-schema'

const fornecedores = [
  {
    label: "Fornecedor 1",
    value: "1"
  },
  {
    label: "Fornecedor 2",
    value: "2"
  }
]

export default function AddProductPage() {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  function onSubmit(data: ProductFormValues) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  const fileRef = form.register("image");

  return (
    <BaseTemplate>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div className='flex w-full justify-between'>
          <h2 className='text-2xl font-bold tracking-tight'>Novo produto</h2>
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
                    className='shadcn'
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
                <FormLabel>Fornecedores</FormLabel>
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
                    {fornecedores.map((e, key) => (
                      <SelectItem value={e.value} key={key}>{e.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Save</Button>
        </form>
      </Form>
    </BaseTemplate>
  )
}
