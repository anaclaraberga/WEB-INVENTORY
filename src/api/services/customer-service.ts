import { ClientFormValues } from '@/pages/admin/clients/form-schema'
import apiClient from '../client/api'
import { CustomerMapper, CustomerResponseDTO } from '../mappers/customer-mapper'

export const CustomerService = {
  findAll: async () => {
    const response = await apiClient.get('/customer')
    return response.data.map((element: CustomerResponseDTO) => {
      return CustomerMapper.toDomain(element)
    })
  },
  findById: async (id: string | number) => {
    const response = await apiClient.get(`/customer/${id}`)
    return CustomerMapper.toDomain(response.data)
  },
  create: async (data: ClientFormValues) => {
    const body = CustomerMapper.toRequest(data)
    const response = await apiClient.post('/customer', JSON.stringify(body))
    return CustomerMapper.toDomain(response.data)
  },
  update: async (id: string | number, data: ClientFormValues) => {
    const body = CustomerMapper.toRequest(data)
    const response = await apiClient.post(
      `/customer/${id}`,
      JSON.stringify(body)
    )
    return CustomerMapper.toDomain(response.data)
  },
  delete: async (id: string | number) => {
    const response = await apiClient.delete(`/customer/${id}`)
    return response.data
  },
}
