import { Date } from 'mongoose';

export type TStatus = 'Pending' | 'Completed' | 'Failed';

export type TPayment = {
  email: string;
  transactionId: string;
  amount: number;
  date: Date;
  status: TStatus;
  orderId?: string;
};
