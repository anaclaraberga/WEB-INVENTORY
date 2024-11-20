import { OrderService } from "@/api/services/order-service";
import { BaseTemplate } from "@/template/Base";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const UserOrderDetails = () => {
  const { id } = useParams()

  useEffect(() => {
    (async () => {
      if (id) {
        const response = await OrderService.findById(id)
        setFormValues({ ...response })
      }
    })()
  }, [])

  return (
    <BaseTemplate>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div className='flex w-full justify-between'>
          <h2 className='text-2xl font-bold tracking-tight'>Detalhes do pedido</h2>
        </div>
      </div>
    </BaseTemplate>)
}