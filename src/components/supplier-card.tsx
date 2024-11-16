import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"

export interface SupplierCardProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  description: string
}

export const SupplierCard = ({ name, description, ...props }: SupplierCardProps) => {

  return (
    <Card className={cn(props.className)} {...props}>
      <CardHeader className="grid gap-4 p-4">
        <CardTitle>{name}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
    </Card>
  )
}