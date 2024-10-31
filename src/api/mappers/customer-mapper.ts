import { ClientFormValues } from '@/pages/admin/clients/form-schema'

export interface CustomerResponseDTO {
  id: string | number | null
  name: string
  email: string
  phone: string
  nationalRegistry: string
  zipCode: string
}

export const CustomerMapper = {
  toDomain: (response: CustomerResponseDTO): ClientFormValues => {
    return {
      id: response.id as number,
      name: response.name,
      document: response.nationalRegistry,
      contact: response.email,
      address: response.zipCode,
    }
  },
  toRequest: (domain: ClientFormValues): CustomerResponseDTO => {
    return {
      id: domain.id as number,
      name: domain.name,
      nationalRegistry: domain.document,
      email: domain.contact,
      phone: domain.contact,
      zipCode: domain.contact,
    }
  },
}
