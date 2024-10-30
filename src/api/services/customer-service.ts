import { ClientFormValues } from '@/pages/admin/clients/form-schema'
import apiClient from '../client/api'
import { CustomerMapper } from '../mappers/customer-mapper'

export const CustomerService = {
  findAll: async () => {
    const response = await apiClient.get('/supplier')
    return CustomerMapper.toDomain(response.data)
  },
  findById: async (id: string | number) => {
    const response = await apiClient.get(`/supplier/${id}`)
    return CustomerMapper.toDomain(response.data)
  },
  create: async (data: ClientFormValues) => {
    const body = CustomerMapper.toRequest(data)
    const response = await apiClient.post('/supplier', JSON.stringify(body))
    return CustomerMapper.toDomain(response.data)
  },
  update: async (id: string | number, data: ClientFormValues) => {
    const body = CustomerMapper.toRequest(data)
    const response = await apiClient.post(
      `/supplier/${id}`,
      JSON.stringify(body)
    )
    return CustomerMapper.toDomain(response.data)
  },
  delete: async (id: string | number) => {
    const response = await apiClient.delete(`/supplier/${id}`)
    return response.data
  },
}
