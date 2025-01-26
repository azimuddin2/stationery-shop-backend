import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';
import { ProductCategory } from './product.constant';

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      minlength: [3, 'The length of product name can be minimum 3 characters'],
      maxlength: [
        80,
        'The length of product name can be maximum 80 characters ',
      ],
      validate: {
        validator: function (value: string) {
          const name = value.charAt(0).toUpperCase() + value.slice(1);
          return name === value;
        },
        message: '{VALUE} is not in capitalize format',
      },
    },
    brand: {
      type: String,
      required: [true, 'Product brand name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0.01, 'Price must be a positive number'],
      validate: {
        validator: (v: number) => v > 0,
        message: (props: { value: number }) =>
          `${props.value} is not a valid price`,
      },
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ProductCategory,
        message: '{VALUE} is not valid',
      },
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Product = model<TProduct>('Product', productSchema);
