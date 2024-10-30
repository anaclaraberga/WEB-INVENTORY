import { SupplierFormValues } from '@/pages/admin/suppliers/form-schema'

export interface SupplierResponseDTO {
  id: string | number | null
  companyName: string
  cnpj: string
  category: string
}

export const SupplierMapper = {
  toDomain: (response: SupplierResponseDTO): SupplierFormValues => {
    return {
      id: response.id as number,
      name: response.companyName,
      contact: '',
      address: '',
    }
  },
  toRequest: (domain: SupplierFormValues): SupplierResponseDTO => {
    return {
      id: domain.id ?? null,
      companyName: domain.name,
      cnpj: '',
      category: '',
    }
  },
}
