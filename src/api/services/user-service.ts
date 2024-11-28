import { UserFormValues } from '@/pages/admin/users/form-schema'
import apiClient from '../client/api'
import { UserMapper, UserResponseDTO } from '../mappers/user-mapper'

export const UserService = {
  findAll: async () => {
    const response = await apiClient.get('/user')
    return response.data.map((element: UserResponseDTO) => {
      return UserMapper.toDomain(element)
    })
  },
  findById: async (id: string | number) => {
    const response = await apiClient.get(`/user/${id}`)
    return UserMapper.toDomain(response.data)
  },
  create: async (data: UserFormValues) => {
    const body = UserMapper.toRequest(data)
    const response = await apiClient.post('/user', JSON.stringify(body))
    return UserMapper.toDomain(response.data)
  },
  update: async (id: string | number, data: UserFormValues) => {
    const body = UserMapper.toRequest(data)
    const response = await apiClient.put(`/user/${id}`, JSON.stringify(body))
    return UserMapper.toDomain(response.data)
  },
  delete: async (id: string | number) => {
    const response = await apiClient.delete(`/user/${id}`)
    return response.data
  },
}
