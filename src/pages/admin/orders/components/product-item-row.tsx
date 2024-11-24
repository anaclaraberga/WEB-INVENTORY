import { Button } from "@/components/custom/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { NumberUtils } from "@/utils/NumberUtils"
import { Trash } from "lucide-react"

export const ProductItemRow = ({ product, form, index, onRemoveItem, ...props }) => {
  return (
    <div {...props} className="flex items-center justify-between gap-2 mb-2 rounded-md border border-gray-200 px-8 py-2">
      <img src={`http://localhost:8080/${product.image}`} width={100} />
      <div>
        <h3 className="text-xl">{product.name}</h3>
        <span className="text-lg">{NumberUtils.formatToBRLCurrency(product.price)}</span>
      </div>
      <FormField
        control={form.control}
        name={`products.${index}.quantity`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Quantidade</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                min="1"
                {...field}
                defaultValue={product.quantity}
                onChange={(e) => form.setValue(`products.${index}.quantity`, Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className='h-full flex flex-col justify-between space-y-4'>
        <FormLabel>Ações</FormLabel>
        <Button type="button" variant="ghost" onClick={onRemoveItem}>
          <Trash width={18} className='text-red-500' />
        </Button>
      </div>
    </div>
  )
}