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
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { BaseTemplate } from '@/template/Base'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectValue } from '@radix-ui/react-select'
import { Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { defaultValues, orderFormSchema, OrderFormValues } from './form-schema'

const clients = [
  {
    id: 15,
    name: "Sophie Barker"
  },
  {
    id: 20,
    name: "Jennie Santiago"
  }
]

export default function AddOrderPage() {
  const { id } = useParams()
  const [formValues, setFormValues] = useState(defaultValues)
  const [products, setProducts] = useState<any>([
    { value: 'produto1', label: 'Produto 1' },
    { value: 'produto2', label: 'Produto 2' },
  ]);

  const addProduct = () => {
    setProducts([...products, { id: '', quantity: 1 }]);
  };

  const removeProduct = (index: number) => {
    setProducts(products.filter((_: any, i: number) => i !== index));
  };

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: formValues,
    values: formValues,
    mode: 'onChange',
  })

  const onSubmit = (data: any) => {
    console.log("DATA", data)
    try {
      // await SupplierService.create(data)


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
        // const response = await SupplierService.findById(id)
        // setFormValues({ ...response })
      }
    })()
  }, [])

  return (
    <BaseTemplate>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div className='flex w-full justify-between'>
          <h2 className='text-2xl font-bold tracking-tight'>Novo pedido</h2>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='clientId'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Clientes' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clients.map((e, key) => (
                          <SelectItem value={e.id.toString()} key={key}>{e.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <div className="mb-4">
            <h3 className="text-lg font-bold">Produtos</h3>
            {products.map((product, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <FormField
                  control={form.control}
                  name={`products.${index}.id`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Produto</FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          onValueChange={(value) => form.setValue(`products.${index}.id`, value)}
                          defaultValue={product.id}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o produto" />
                          </SelectTrigger>
                          <SelectContent>
                            {products.map((e, key) => (
                              <SelectItem value={e.value} key={e.value}>{e.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>Escolha o produto</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`products.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          min="1"
                          {...field}
                          defaultValue={product.quantity}
                          onChange={(e) => form.setValue(`products.${index}.quantity`, Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="button" variant="ghost" onClick={() => removeProduct(index)}>
                  <Trash width={18} className='text-red-500' />
                </Button>
              </div>
            ))}
            <Button type="button" onClick={addProduct}>
              Adicionar Produto
            </Button>
          </div>
          <Button type='submit' onClick={() => console.log(formValues)}>Salvar</Button>
        </form>
      </Form>
    </BaseTemplate>
  )
}
