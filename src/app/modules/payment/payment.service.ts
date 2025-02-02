import { Request, Response } from 'express';
import config from '../../config';
import { TPayment } from './payment.interface';
import AppError from '../../errors/AppError';
import { Payment } from './payment.model';
import { Order } from '../order/order.model';
import mongoose from 'mongoose';

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
  const { email, transactionId, amount, orderId } = payload;

  if (!email || !transactionId || !amount) {
    throw new AppError(400, 'Invalid payment data');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newPayment = {
      email,
      transactionId,
      amount,
      status: 'Completed',
    };

    const result = await Payment.create([newPayment], { session });
    if (!result) {
      throw new AppError(400, 'Failed to payment process');
    }

    await Order.findByIdAndUpdate(
      orderId,
      { paid: true, transactionId: transactionId },
      { new: true, session },
    );

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const getPaymentsByEmailFromDB = async (query: Record<string, unknown>) => {
  const filter = { email: query.email };

  const result = await Payment.find(filter);
  if (!result) {
    throw new AppError(404, 'Payment history not found');
  }

  return result;
};

export const PaymentServices = {
  createPaymentIntent,
  processPayment,
  getPaymentsByEmailFromDB,
};
