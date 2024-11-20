import apiClient from '../client/api'
import {
  TransactionMapper,
  TransactionResponseDTO,
} from '../mappers/transaction-mapper'

export const TransactionService = {
  findAll: async () => {
    const response = await apiClient.get('/transaction')
    return response.data.map((element: TransactionResponseDTO) => {
      return TransactionMapper.toDomain(element)
    })
  },
  findById: async (id: string | number) => {
    const response = await apiClient.get(`/transaction/${id}`)
    return TransactionMapper.toDomain(response.data)
  },
}
