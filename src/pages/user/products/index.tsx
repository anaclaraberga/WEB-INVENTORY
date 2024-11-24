import { ProductResponseDTO } from '@/api/mappers/product-mapper'
import { ProductService } from '@/api/services/product-service'
import { ProductCard, ProductCardAction } from '@/components/product-card'
import { BaseTemplate } from '@/template/Base'
import { useEffect, useState } from 'react'

export default function UserProducts() {
  const [data, setData] = useState([])

  useEffect(() => {
    (async () => {
      const apiProducts = await ProductService.findAll()
      setData(apiProducts)
    })()
  }, [])


  return (
    <BaseTemplate>
      <div className='mb-2 flex items-start justify-between flex-col space-y-2 gap-5'>
        <div className='flex w-full justify-between'>
          <h1 className='text-3xl font-bold tracking-tight'>Produtos</h1>
        </div>
        <div className='grid grid-cols-4 gap-4 items-start justify-start'>
          {data.length > 0 && data.map((e: ProductResponseDTO, i: number) => {
            return (
              <ProductCard
                key={i}
                id={e.id as string}
                imgUrl={"http://localhost:8080/" + e.image}
                price={e.price}
                title={e.name}
                description={e.description}
                actions={[ProductCardAction.ADD_TO_CART]}
              />)
          })}
        </div>
      </div>
    </BaseTemplate>
  )
}
