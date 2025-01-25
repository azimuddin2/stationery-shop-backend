import mongoose, { model, Schema } from 'mongoose';
import { Order } from './order.interface';

const orderSchema = new Schema<Order>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      validate: {
        validator: (email: string) => {
          const emailRegex = /^\S+@\S+\.\S+$/;
          return emailRegex.test(email);
        },
        message: 'Invalid email format.',
      },
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1.'],
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, 'Total price must be a positive number.'],
    },
  },
  { timestamps: true },
);

export const OrderModel = model<Order>('Order', orderSchema);
