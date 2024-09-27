import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}` as string);

interface CheckoutFormProps {
  amount: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setProcessing(true);

    if (!stripe || !elements) {
      setError('Stripe.js has not loaded yet. Please try again later.');
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError('Card Element not found');
      setProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error('Error creating payment method:', error);
      setError(error.message || 'An unknown error occurred.');
      setProcessing(false);
    } else {
      console.log('Payment method created successfully:', paymentMethod);
      try {
        const response = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: amount,
              payment_method_id: paymentMethod.id,
            }),
          
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Payment intent result:', result);
        
        if (result.requiresAction) {
          const { error } = await stripe.handleCardAction(result.clientSecret);
          if (error) {
            setError(error.message || 'Payment failed');
          } else {
            setError(null);
            console.log('Payment successful');
          }
        } else if (result.success) {
          setError(null);
          console.log('Payment successful');
        } else {
          setError(result.error || 'Payment failed');
        }
      } catch (error) {
        console.error('Error processing payment:', error);
        setError('An error occurred while processing your payment. Please try again.');
      }
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className='StripeElement'>
      <CardElement />
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      <button type="submit" disabled={!stripe || processing} style={{ marginTop: '10px' }} className='btn btn-primary btn-wide'>
        {processing ? 'Processing...' : `Pay $${amount / 100}`}
      </button>
    </form>
  );
};

export const StripePaymentComponent: React.FC<CheckoutFormProps> = ({ amount }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm amount={amount} />
  </Elements>
);