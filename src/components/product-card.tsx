import { useCart } from "@/hooks/use-cart"
import { cn } from "@/lib/utils"
import { Minus, Plus } from "lucide-react"
import { HTMLAttributes, useState } from "react"
import { Button } from "./custom/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

export interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  price: string
  imgUrl: string
  description?: string
}

enum Operation {
  INCREASE,
  DECREASE
}

export const ProductCard = ({ title, price, imgUrl, description, id, ...props }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart()

  const handleOperation = (operation: Operation) => {
    if (operation == Operation.INCREASE) {
      let temp = quantity
      setQuantity(temp += 1)
    }

    if (operation == Operation.DECREASE && quantity > 1) {
      let temp = quantity
      setQuantity(temp -= 1)
    }
  }

  return (
    <Card className={cn("w-[380px]", props.className)} {...props}>
      <CardHeader className="grid gap-4 p-2">
        <div className="flex items-center space-x-4 rounded-md border">
          <img src={imgUrl} alt={title} className="object-cover" />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 p-4">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        <CardTitle className="text-blue-500">R$ {price}</CardTitle>
      </CardContent>

      <CardFooter className="p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between w-full">
          <Button variant="secondary" className="text-blue-500">
            <Minus onClick={() => handleOperation(Operation.DECREASE)} />
          </Button>
          <h3>{quantity}</h3>
          <Button variant="secondary" className="text-blue-500">
            <Plus onClick={() => handleOperation(Operation.INCREASE)} />
          </Button>
        </div>
        <Button className="w-full" onClick={() => addToCart({ id: Number(id), price: Number(price), name: title }, quantity)}>
          Adicionar ao carrinho
        </Button>
      </CardFooter>
    </Card>
  )
}