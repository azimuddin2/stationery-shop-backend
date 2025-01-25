import { z } from 'zod';
import { ProductCategory } from './product.constant';

const createProductValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Product name is required',
        }),
        brand: z.string({
            required_error: 'Brand is required',
        }),
        price: z.number({
            required_error: 'Price is required',
        }),
        category: z.enum([...ProductCategory] as [string, ...string[]]),
        description: z.string({
            required_error: 'Description is required',
        }),
        image: z.string({
            required_error: 'Image URL is required',
        }),
        quantity: z.number({
            required_error: 'Quantity is required',
        }),
        inStock: z.boolean().default(true),
    }),
});

const updateProductValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Product name is required',
        }).optional(),
        brand: z.string({
            required_error: 'Brand is required',
        }).optional(),
        price: z.number({
            required_error: 'Price is required',
        }).optional(),
        category: z.enum([...ProductCategory] as [string, ...string[]]).optional(),
        description: z.string({
            required_error: 'Description is required',
        }).optional(),
        image: z.string({
            required_error: 'Image URL is required',
        }).optional(),
        quantity: z.number({
            required_error: 'Quantity is required',
        }).optional(),
        inStock: z.boolean().default(true),
    }),
});

export const ProductValidations = [
    createProductValidationSchema,
    updateProductValidationSchema,
];