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
  FormMessage
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
import { ProductService } from '@/api/services/product-service'

export default function AddOrderPage() {
  const { id } = useParams()
  const [formValues, setFormValues] = useState(defaultValues)
  const [products, setProducts] = useState<any>([]);
  const [clients, setClients] = useState([])
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: formValues,
    values: formValues,
    mode: 'onChange',
  })

  const addProduct = () => {
    const product = { id: '', quantity: 1 };
    setFormValues({ ...form.getValues(), products: [...form.getValues().products, product] })
  };

  const removeProduct = (index: number) => {
    setFormValues({ ...formValues, products: formValues.products.filter((_: any, i: number) => i !== index) });
  };

  const onSubmit = async (data: any) => {
    if (data.products.length == 0) {
      alert("É necessário possuir ao menos um produto")
      return
    }

    try {
      await OrderService.create(data)

      toast({
        title: 'Order created successfully',
      })
    } catch (error: any) {
      toast({
        title: 'Error creating order',
        description: error.message,
      })
    }
  }

  useEffect(() => {
    (async () => {
      const apiProducts = await ProductService.findAll()
      setProducts(apiProducts)

      const apiClients = await CustomerService.findAll()
      setClients(apiClients)

      if (id) {
        const response = await OrderService.findById(id)
        setFormValues({ ...response })
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
        <form onSubmit={form.handleSubmit(async (e) => await onSubmit(e))} className='space-y-8'>
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
            {formValues.products.map((product, index: number) => (
              <div key={index} className="flex gap-2 mb-2">
                <FormField
                  control={form.control}
                  name={`products.${index}.productId`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Produto</FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o produto"/>
                          </SelectTrigger>
                          <SelectContent>
                            {products.map((e: any) => (
                              <SelectItem value={e.id} key={e.name}>{e.name}</SelectItem>
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
                <div className='h-full flex flex-col justify-between space-y-4'>
                  <FormLabel>Ações</FormLabel>
                  <Button type="button" variant="ghost" onClick={() => removeProduct(index)}>
                    <Trash width={18} className='text-red-500' />
                  </Button>
                </div>
              </div>
            ))}
            <Button type="button" variant="secondary" onClick={addProduct}>
              Adicionar Produto
            </Button>
          </div>

          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Status do pedido' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Pendente</SelectItem>
                    <SelectItem value="INACTIVE">Concluído</SelectItem>
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
