import { model, Schema } from 'mongoose';
import { TPayment } from './payment.interface';
import { Status } from './payment.constant';

const paymentSchema = new Schema<TPayment>(
  {
    email: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: Status,
      },
      default: 'pending',
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export const Payment = model<TPayment>('Payment', paymentSchema);
