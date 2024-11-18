import { OrderFormValues } from '@/pages/admin/orders/form-schema'
import apiClient from '../client/api'
import { OrderMapper, OrderResponseDTO } from '../mappers/order-mapper'

export const OrderService = {
  findAll: async () => {
    const response = await apiClient.get('/order')
    return response.data.map((element: OrderResponseDTO) => {
      return OrderMapper.toDomain(element)
    })
  },
  findById: async (id: string | number) => {
    const response = await apiClient.get(`/order/${id}`)
    return OrderMapper.toDomain(response.data)
  },
  findByCustomerId: async (id: string | number) => {
    const response = await apiClient.get(`/order/customer/${id}`)
    return response.data.map((element: OrderResponseDTO) => {
      return OrderMapper.toDomain(element)
    })
  },
  create: async (data: OrderFormValues) => {
    const body = OrderMapper.toRequest(data)
    const response = await apiClient.post('/order', JSON.stringify(body))
    return OrderMapper.toDomain(response.data)
  },
  update: async (id: string | number, data: OrderFormValues) => {
    const body = OrderMapper.toRequest(data)
    const response = await apiClient.post(`/order/${id}`, JSON.stringify(body))
    return OrderMapper.toDomain(response.data)
  },
  delete: async (id: string | number) => {
    const response = await apiClient.delete(`/order/${id}`)
    return response.data
  },
}
