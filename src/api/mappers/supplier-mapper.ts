import { SupplierFormValues } from '@/pages/admin/suppliers/form-schema'

export interface SupplierResponseDTO {
  id: string | number | null
  companyName: string
  contact: string
  address: string
}

export const SupplierMapper = {
  toDomain: (response: SupplierResponseDTO): SupplierFormValues => {
    return {
      id: response.id as any,
      name: response.companyName,
      contact: response.contact,
      address: response.address,
      cnpj: response.companyName,
    }
  },
  toRequest: (domain: SupplierFormValues): SupplierResponseDTO => {
    return {
      id: domain.id ?? null,
      companyName: domain.name,
      contact: domain.contact,
      address: domain.address ?? '',
    }
  },
}
