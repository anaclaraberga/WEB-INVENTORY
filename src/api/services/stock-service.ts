import apiClient from '../client/api'
import {
  TransactionMapper,
  TransactionModel,
  TransactionResponseDTO,
} from '../mappers/transaction-mapper'

export const StockService = {
  findAll: async () => {
    const response = await apiClient.get('/product/stock')
    return response.data
  },
  findById: async (id: string | number) => {
    const response = await apiClient.get(`/transaction/${id}`)
    return TransactionMapper.toDomain(response.data)
  },
}
