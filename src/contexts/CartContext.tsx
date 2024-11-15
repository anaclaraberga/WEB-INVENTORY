import { useAuth } from "@/hooks/use-auth";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { UserType } from "./AuthContext";

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  totalValue: number;
  totalItems: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export interface CardProviderProps {
  children: ReactNode
}

export const CartProvider = ({ children }: CardProviderProps) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem(`cart_${user?.id}`);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [user]);

  useEffect(() => {
    if (user?.type === UserType.CUSTOMER) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  const existsItem = (product: Product) => {
    return cart.find((item) => item.id === product.id);
  }

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = existsItem(product);

      if (existingItem) {
        console.log("EXISTS");
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        console.log("NOT EXISTS");
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const totalValue = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const totalItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  useEffect(() => {
    console.log("Cart updated:", cart);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        totalValue,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
