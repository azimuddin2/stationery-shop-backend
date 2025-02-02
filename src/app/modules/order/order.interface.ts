import mongoose from 'mongoose';

export type TOrder = {
  email: string;
  items: {
    product: mongoose.Schema.Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
  }[];
  totalPrice: number;
  status: 'Pending' | 'Shipping' | 'Delivered';
  paid: boolean;
  transactionId?: string;
};
