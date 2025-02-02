import { z } from 'zod';
import { Status } from './payment.constant';

const paymentValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    transactionId: z
      .string()
      .min(5, { message: 'Transaction ID must be at least 5 characters long' }),
    amount: z
      .number()
      .positive({ message: 'Amount must be greater than zero' }),
    status: z.enum([...Status] as [string, ...string[]]).default('Pending'),
    date: z.date().optional(),
  }),
});

export const PaymentValidation = {
  paymentValidationSchema,
};
