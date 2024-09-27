// app/contexts/CartContext.tsx
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  uniqueid: string;
  title: string;
  price: number;
  quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (uniqueid: string) => void;
    incrementQuantity: (uniqueid: string) => void;
    decrementQuantity: (uniqueid: string) => void;
    total: number;
  }

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.uniqueid === newItem.uniqueid);
      if (existingItem) {
        // Item already exists, update its quantity
        return prevCart.map(item =>
          item.uniqueid === newItem.uniqueid
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Item doesn't exist, add it to the cart
        return [...prevCart, { ...newItem, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (uniqueid: string) => {
    setCart(prevCart => prevCart.filter(item => item.uniqueid !== uniqueid));
  };

  const incrementQuantity = (uniqueid: string) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.uniqueid === uniqueid ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (uniqueid: string) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.uniqueid === uniqueid && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};