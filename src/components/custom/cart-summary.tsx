import { OrderService } from "@/api/services/order-service"
import { useAuth } from "@/hooks/use-auth"
import { useCart } from "@/hooks/use-cart"
import { NumberUtils } from "@/utils/NumberUtils"
import { useNavigate } from "react-router-dom"
import { toast } from "../ui/use-toast"
import { Button } from "./button"

export const CartSummary = () => {
  const navigation = useNavigate()
  const { user } = useAuth()
  const { totalItems, totalValue, cart, clear } = useCart()

  const finishOrder = async () => {
    try {
      await OrderService.create({
        date: new Date(),
        products: cart.map((item) => ({ id: item.id.toString(), quantity: item.quantity })),
        clientId: user!.id!.toString(),
        status: ''
      })

      toast({
        title: 'Pedido realizado com sucesso',
        description: 'Acesse o painel de pedidos para efetuar o pagamento',
      })

      clear()
      navigation("/user/")
    } catch (error) {
      toast({
        title: 'Não foi possível conectar com o servidor',
        description: 'Tente novamente mais tarde',
      })
    }
  }

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

        <Button onClick={finishOrder}>
          Finalizar pedido
        </Button>
      </div>
    </div>
  )
}