import { UserService } from '@/api/services/user-service'
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
import { toast } from '@/components/ui/use-toast'
import { BaseTemplate } from '@/template/Base'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { UserFormValues, defaultValues, userFormSchema } from './form-schema'

export default function AddUserPage() {
  const { id } = useParams()
  const [formValues, setFormValues] = useState<UserFormValues>(defaultValues)

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: formValues,
    values: formValues,
    mode: 'onChange',
  })

  async function onSubmit(data: UserFormValues) {
    try {
      if (formValues.id) {
        await UserService.update(data.id, data)
      } else {
        await UserService.create(data)
      }

      toast({
        title: 'User created successfully',
      })
    } catch (error: any) {
      toast({
        title: 'Error creating user',
        description: error.message,
      })
    }
  }

  useEffect(() => {
    (async () => {
      if (id) {
        const response = await UserService.findById(id)
        setFormValues({ ...response })
      }
    })()
  }, [])

  return (
    <BaseTemplate>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div className='flex w-full justify-between'>
          <h2 className='text-2xl font-bold tracking-tight'>Novo usuário</h2>
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
                  <Input placeholder='Richard Ball' {...field} />
                </FormControl>
                <FormDescription>
                  Nome completo da pessoa
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='nowutecih@toj.gg' {...field} />
                </FormControl>
                <FormDescription>
                  Email do usuário
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input placeholder='' {...field} type='password' />
                </FormControl>
                <FormDescription>
                  Senha de acesso
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirm'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme sua senha</FormLabel>
                <FormControl>
                  <Input {...field} type='password' />
                </FormControl>
                <FormDescription>
                  Confirmação de senha
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Tipo de usuário' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="DEFAULT">Padrão</SelectItem>
                    <SelectItem value="ADMIN">Administrador</SelectItem>
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
