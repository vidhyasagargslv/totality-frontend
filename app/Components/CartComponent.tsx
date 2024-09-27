// app/components/CartComponent.tsx
'use client'

import React from 'react';
import { useCart } from '../contexts/CartContext';
import { StripePaymentComponent } from './StripePaymentComponent';

export const CartComponent: React.FC = () => {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity, total } = useCart();

  return (
    <div className="w-full h-full bg-white p-4 overflow-y-auto">
      <h2 className="text-2xl font-bold font-sans mb-4 text-info" >My Cart</h2>
      {cart.map(item => (
        <div key={item.uniqueid} className="mb-4 p-2 border rounded">
          <h3 className="font-semibold text-black">{item.title}</h3>
          <div className="flex justify-between items-center mt-2">
            <div>
              <button onClick={() => decrementQuantity(item.uniqueid)} className="btn btn-sm">-</button>
              <span className="mx-2 text-primary">{item.quantity}</span>
              <button onClick={() => incrementQuantity(item.uniqueid)} className="btn btn-sm">+</button>
            </div>
            <span className='text-black'>₹{item.price * item.quantity}</span>
            <button onClick={() => removeFromCart(item.uniqueid)} className="btn btn-sm btn-error">Remove</button>
          </div>
        </div>
      ))}
      <div className="mt-4 text-xl font-bold text-accent">Total: ₹{total}</div>
      <StripePaymentComponent amount={total * 100} />
    </div>
  );
};