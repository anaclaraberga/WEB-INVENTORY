import { ProductCard } from '@/components/product-card'
import { BaseTemplate } from '@/template/Base'
import { useNavigate } from 'react-router-dom'

const data: any = [1, 2, 3, 4, 5, 6]

export default function UserProducts() {
  const navigation = useNavigate()

  return (
    <BaseTemplate>
      <div className='mb-2 flex items-start justify-between flex-col space-y-2 gap-5'>
        <div className='flex w-full justify-between'>
          <h1 className='text-3xl font-bold tracking-tight'>Produtos</h1>
        </div>
        <div className='grid grid-cols-4 gap-4 items-start justify-start'>
          {data.map((e, i: number) => {
            return (
              <ProductCard
                key={i}
                id={e}
                imgUrl='https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg'
                price='29.90'
                title='Produto'
                description='Hello world'
              />)
          })}
        </div>
      </div>
    </BaseTemplate>
  )
}
