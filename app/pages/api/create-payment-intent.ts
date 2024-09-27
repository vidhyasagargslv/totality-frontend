import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { 
  apiVersion: '2024-06-20',
  typescript: true,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { amount, payment_method_id } = req.body;

    console.log('Creating payment intent...');
    console.log('Amount:', amount);
    console.log('Payment Method ID:', payment_method_id);

    if (!amount || !payment_method_id) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'aud', // Australian Dollars
      payment_method: payment_method_id,
      confirmation_method: 'manual',
      confirm: true,
    });

    console.log('Payment Intent created:', paymentIntent);

    if (paymentIntent.status === 'requires_action') {
      return res.json({
        requiresAction: true,
        clientSecret: paymentIntent.client_secret,
      });
    } else if (paymentIntent.status === 'succeeded') {
      return res.json({ success: true });
    } else {
      return res.status(400).json({ error: 'Invalid PaymentIntent status' });
    }
  } catch (err: any) {
    console.error('Error creating payment intent:', err);
    return res.status(500).json({ error: err.message });
  }
}