import { ProductService } from '@/api/services/product-service'
import { ProductCard, ProductCardAction } from '@/components/product-card'
import { BaseTemplate } from '@/template/Base'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const data: any = [1, 2, 3, 4, 5, 6]

export default function UserProducts() {
  const navigation = useNavigate()
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
          {data.length > 0 && data.map((e, i: number) => {
            return (
              <ProductCard
                key={i}
                id={e}
                imgUrl='https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg'
                price='29.90'
                title='Produto'
                description='Hello world'
                actions={[ProductCardAction.ADD_TO_CART]}
              />)
          })}
        </div>
      </div>
    </BaseTemplate>
  )
}
