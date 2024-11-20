export interface TransactionResponseDTO {
  id: string | number | null
  orderId: number
  productId: number
  value: number
  transactionType: string
  dateTimeAtCreation: string
}

export interface TransactionModel {}

export const TransactionMapper = {
  toDomain: (response: TransactionResponseDTO): TransactionModel => {
    return {
      id: response.id as any,
    }
  },
  toRequest: (domain: TransactionModel): TransactionResponseDTO => {
    return {
      id: null,
      orderId: 0,
      productId: 0,
      value: 0,
      transactionType: '',
      dateTimeAtCreation: '',
    }
  },
}
