import { OrderFormValues } from '@/pages/admin/orders/form-schema'

export type OrderStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED'

export interface OrderResponseDTO {
  id: string | number | null
  dateTimeAtCreation: string
  customerId: string
  status: string
  products?: []
}

export const OrderMapper = {
  toDomain: (response: OrderResponseDTO): OrderFormValues => {
    return {
      id: response.id as any,
      status: response.status,
      clientId: response.customerId.id,
      products: response.products || [],
      date: response.dateTimeAtCreation,
    }
  },
  toRequest: (domain: OrderFormValues): OrderResponseDTO => {
    return {
      id: domain.id ?? null,
      dateTimeAtCreation: domain.date.toString(),
      customerId: domain.clientId,
      status: domain.status,
      items: domain.products
    }
  },
}
