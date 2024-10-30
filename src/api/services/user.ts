import apiClient from '../client/api'

export const UserService = {
  findAll: () => apiClient.get('/user'),
  findById: (id) => apiClient.get(`/user/${id}`),
  create: (data) => apiClient.post('/user', JSON.stringify(data)),
  update: (id, data) => apiClient.post(`/user/${id}`, JSON.stringify(data)),
  delete: (id) => apiClient.delete(`/user/${id}`),
}
