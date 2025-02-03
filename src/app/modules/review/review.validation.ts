import { z } from 'zod';

const createReviewValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    location: z.string({
      required_error: 'Location is required',
    }),
    rating: z.number({
      required_error: 'Rating is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    image: z.string().optional(),
  }),
});

export const ReviewValidations = {
  createReviewValidationSchema,
};
