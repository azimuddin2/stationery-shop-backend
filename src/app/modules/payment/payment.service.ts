import { Request, Response } from 'express';
import config from '../../config';
import { TPayment } from './payment.interface';
import AppError from '../../errors/AppError';
import { Payment } from './payment.model';

const stripe = require('stripe')(config.payment_secret_key);

const createPaymentIntent = async (req: Request, res: Response) => {
  const { price } = req.body;
  const amount = price * 100;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    payment_method_types: ['card'],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

const processPayment = async (payload: TPayment) => {
  const { email, transactionId, amount } = payload;

  if (!email || !transactionId || !amount) {
    throw new AppError(400, 'Invalid payment data');
  }

  const newPayment = new Payment({
    email,
    transactionId,
    amount,
    status: 'completed',
  });
  await newPayment.save();

  return newPayment;
};

const getPaymentsByEmailFromDB = async (query: Record<string, unknown>) => {
  const filter = { email: query.email };

  const isEmailExists = await Payment.findOne(filter);
  if (!isEmailExists) {
    throw new AppError(404, 'Payment history not found');
  }

  const result = await Payment.find(filter);
  return result;
};

export const PaymentServices = {
  createPaymentIntent,
  processPayment,
  getPaymentsByEmailFromDB,
};
