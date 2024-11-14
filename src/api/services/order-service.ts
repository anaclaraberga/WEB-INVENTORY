import { SupplierFormValues } from '@/pages/admin/suppliers/form-schema'
import apiClient from '../client/api'
import { SupplierMapper, SupplierResponseDTO } from '../mappers/supplier-mapper'

export const OrderService = {
  findAll: async () => {
    const response = await apiClient.get('/supplier')
    return response.data.map((element: SupplierResponseDTO) => {
      return SupplierMapper.toDomain(element)
    })
  },
  findById: async (id: string | number) => {
    const response = await apiClient.get(`/supplier/${id}`)
    return SupplierMapper.toDomain(response.data)
  },
  create: async (data: SupplierFormValues) => {
    const body = SupplierMapper.toRequest(data)
    const response = await apiClient.post('/supplier', JSON.stringify(body))
    return SupplierMapper.toDomain(response.data)
  },
  update: async (id: string | number, data: SupplierFormValues) => {
    const body = SupplierMapper.toRequest(data)
    const response = await apiClient.post(
      `/supplier/${id}`,
      JSON.stringify(body)
    )
    return SupplierMapper.toDomain(response.data)
  },
  delete: async (id: string | number) => {
    const response = await apiClient.delete(`/supplier/${id}`)
    return response.data
  },
}
