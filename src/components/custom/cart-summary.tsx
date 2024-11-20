import { useCart } from "@/hooks/use-cart"
import { NumberUtils } from "@/utils/NumberUtils"
import { Button } from "./button"

export const CartSummary = () => {
  const { totalItems, totalValue, cart } = useCart()

  return (
    <div className='w-full h-full max-w-[500px] bg-gray-50 border border-gray-100 p-4 rounded-md'>
      <h2 className='text-2xl font-normal mb-3'>Resumo</h2>
      <div className="flex flex-col h-full gap-5">
        <div>
          <span className="text-gray-600">Quantidade de items</span>
          <h3 className="text-2xl">{totalItems}</h3>
        </div>
        <div>
          <span className="text-gray-600">Subtotal</span>
          <h3 className="text-2xl">{NumberUtils.formatToBRLCurrency(totalValue)}</h3>
        </div>
        <div>
          <span className="text-gray-600">Total</span>
          <h3 className="text-2xl">{NumberUtils.formatToBRLCurrency(totalValue)}</h3>
        </div>

        <Button>
          Finalizar pedido
        </Button>
      </div>
    </div>
  )
}