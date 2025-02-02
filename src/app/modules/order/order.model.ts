import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Shipping', 'Delivered'],
      default: 'Pending',
    },
    paid: {
      type: Boolean,
      default: false,
    },
    transactionId: {
      type: String,
    },
  },
  { timestamps: true },
);

export const Order = model<TOrder>('Order', orderSchema);
