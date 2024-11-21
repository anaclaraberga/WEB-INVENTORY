import { User } from '@/contexts/AuthContext'
import { UserFormValues } from '@/pages/admin/users/form-schema'
import apiClient from '../client/api'
import { UserMapper } from '../mappers/user-mapper'

export const AuthService = {
  signUp: async (data: UserFormValues) => {
    const body = UserMapper.toRequest(data)
    const response = await apiClient.post('/auth/signup', JSON.stringify(body))
    return UserMapper.toDomain(response.data)
  },
  signIn: async (data: User) => {
    const response = await apiClient.post(
      '/auth/signin',
      JSON.stringify({
        email: data.email,
        password: data.password,
      })
    )
    return UserMapper.toDomain(response.data)
  },
}
