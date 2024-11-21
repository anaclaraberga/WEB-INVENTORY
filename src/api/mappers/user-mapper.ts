import { UserFormValues } from '@/pages/admin/users/form-schema'

export interface UserResponseDTO {
  id: string | number | null
  name: string
  email: string
  password: string
  type: string
}

export const UserMapper = {
  toDomain: (response: UserResponseDTO): UserFormValues => {
    return {
      id: response.id as number,
      name: response.name,
      email: response.email,
      password: response.password,
      type: response.type,
      confirm: '',
    }
  },
  toRequest: (domain: UserFormValues): UserResponseDTO => {
    return {
      id: domain.id as number,
      name: domain.name,
      email: domain.email,
      password: domain.password,
      type: domain.type,
    }
  },
}
