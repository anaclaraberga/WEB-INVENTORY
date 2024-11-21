import { ProductFormValues } from '@/pages/admin/products/form-schema'

export type OrderStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED'

export interface ProductResponseDTO {
  id: string | number | null
  name: string
  description: string
  price: number
  quantity: number
  image: string
  supplierId: number | string
}

export const ProductMapper = {
  toDomain: (response: ProductResponseDTO): ProductFormValues => {
    return {
      id: response.id,
      name: response.name,
      description: response.description,
      price: response.price,
      quantity: response.quantity,
      image: response.image,
      fornecedorId: response.supplierId as string,
    }
  },
  toRequest: (domain: ProductFormValues): ProductResponseDTO => {
    return {
      id: domain.id,
      name: domain.name,
      description: domain.description,
      price: domain.price,
      quantity: domain.quantity,
      image: domain.image,
      supplierId: domain.fornecedorId,
    }
  },
}
