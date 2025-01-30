import { z } from 'zod';

const createOrderValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    items: z
      .array(
        z.object({
          product: z.string().min(24, 'Invalid product ID'),
          name: z.string().min(1, 'Product name is required'),
          price: z.number().positive('Price must be greater than 0'),
          quantity: z.number().int().positive('Quantity must be at least 1'),
        }),
      )
      .min(1, 'At least one product must be in the order'),
    totalPrice: z.number().positive('Total price must be greater than 0'),
    status: z.enum(['Pending', 'Shipping', 'Delivered']).optional(),
  }),
});

const updateOrderValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email format' }).optional(),
    items: z
      .array(
        z.object({
          product: z.string().min(24, 'Invalid product ID').optional(),
          name: z.string().min(1, 'Product name is required').optional(),
          price: z.number().positive('Price must be greater than 0').optional(),
          quantity: z
            .number()
            .int()
            .positive('Quantity must be at least 1')
            .optional(),
        }),
      )
      .min(1, 'At least one product must be in the order')
      .optional(),
    totalPrice: z
      .number()
      .positive('Total price must be greater than 0')
      .optional(),
    status: z.enum(['Pending', 'Shipping', 'Delivered']).optional(),
  }),
});

export const OrderValidations = {
  createOrderValidationSchema,
  updateOrderValidationSchema,
};
