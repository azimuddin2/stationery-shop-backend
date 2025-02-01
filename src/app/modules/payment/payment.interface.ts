import { Date } from 'mongoose';

export type TStatus = 'pending' | 'completed' | 'failed';

export type TPayment = {
  email: string;
  transactionId: string;
  amount: number;
  date: Date;
  status: TStatus;
};
