import { CartSummary } from '@/components/custom/cart-summary'
import { ProductCard, ProductCardAction } from '@/components/product-card'
import { useCart } from '@/hooks/use-cart'
import { BaseTemplate } from '@/template/Base'

export default function UserCart() {
  const { removeFromCart, totalItems, updateQuantity, totalValue, cart } = useCart()


  return (
    <BaseTemplate>
      <div className='mb-2 flex items-start justify-between flex-col space-y-2 gap-5'>
        <div className='flex w-full justify-between'>
          <h1 className='text-3xl font-bold tracking-tight'>Carrinho</h1>
        </div>
        <div className='w-full flex justify-between items-start'>
          <div className='w-full grid grid-cols-4 gap-4 items-start justify-start'>
            {cart.length == 0 && (
              <h2 className='text-2xl text-gray-500'>Seu carrinho está vazio</h2>
            )}
            {cart.map((e, i: number) => {
              return (
                <ProductCard
                  key={i}
                  id={e.id.toString()}
                  imgUrl='https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg'
                  price={e.price.toString()}
                  title={e.name}
                  description='Hello world'
                  quantity={e.quantity}
                  actions={[
                    ProductCardAction.REMOVE_FROM_CART
                  ]}
                />)
            })}
          </div>
          <CartSummary />
        </div>
      </div>
    </BaseTemplate>
  )
}
