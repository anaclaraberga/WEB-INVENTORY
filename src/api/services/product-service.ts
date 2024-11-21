import { OrderFormValues } from '@/pages/admin/orders/form-schema'
import apiClient from '../client/api'
import { ProductMapper, ProductResponseDTO } from '../mappers/product-mapper'

export const ProductService = {
  findAll: async () => {
    const response = await apiClient.get('/product')
    return response.data.map((element: ProductResponseDTO) => {
      return ProductMapper.toDomain(element)
    })
  },
  findById: async (id: string | number) => {
    const response = await apiClient.get(`/product/${id}`)
    return ProductMapper.toDomain(response.data)
  },
  create: async (data: OrderFormValues) => {
    const formData = new FormData();

    const body = ProductMapper.toRequest(data);

    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        if (key == "image") {
          formData.append(key, body[key][0]);
          continue;  
        }

        formData.append(key, body[key]);
      }
    }

    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    const response = await apiClient.post('/product', formData, { headers });
    return ProductMapper.toDomain(response.data);
  },
  update: async (id: string | number, data: OrderFormValues) => {
    const body = ProductMapper.toRequest(data)
    const response = await apiClient.post(
      `/product/${id}`,
      JSON.stringify(body)
    )
    return ProductMapper.toDomain(response.data)
  },
  delete: async (id: string | number) => {
    const response = await apiClient.delete(`/product/${id}`)
    return response.data
  },
}
