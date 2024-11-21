export interface TransactionResponseDTO {
  id: string | number | null
  orderId: any
  productId: any
  value: number
  type: string
  dateTimeAtCreation: string
}

export interface TransactionModel {
  id: string | number | null
  orderId: number
  productId: number
  value: number
  type: string
  dateTimeAtCreation: string
}

export const TransactionMapper = {
  toDomain: (response: TransactionResponseDTO): TransactionModel => {
    return {
      id: response.id as any,
      orderId: response.orderId?.id || 0,
      productId: response.productId?.id,
      value: response.value,
      type: response.type,
      dateTimeAtCreation: response.dateTimeAtCreation,
    }
  },
  toRequest: (domain: TransactionModel): TransactionResponseDTO => {
    return {
      id: null,
      orderId: 0,
      productId: 0,
      value: 0,
      type: '',
      dateTimeAtCreation: '',
    }
  },
}
