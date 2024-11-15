import { CartContext, CartContextType } from "@/contexts/CartContext";
import { useContext } from "react";

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }

  return context;
};