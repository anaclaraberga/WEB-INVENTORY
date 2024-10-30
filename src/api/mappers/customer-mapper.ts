import { ClientFormValues } from '@/pages/admin/clients/form-schema'

export interface CustomerResponseDTO {
  id: string | number | null
  name: string
  contact: string
  document: string
  address: string
}

export const CustomerMapper = {
  toDomain: (response: CustomerResponseDTO): ClientFormValues => {
    return {
      id: response.id as number,
      name: response.name,
      document: response.name,
      contact: response.contact,
      address: response.contact,
    }
  },
  toRequest: (domain: ClientFormValues): CustomerResponseDTO => {
    return {
      id: domain.id as number,
      name: domain.name,
      document: domain.name,
      contact: domain.contact,
      address: domain.contact,
    }
  },
}
