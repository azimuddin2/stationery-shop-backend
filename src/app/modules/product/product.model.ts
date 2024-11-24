import { Schema, model, connect } from 'mongoose'
import { Product, ProductCategory } from './product.interface'

const productSchema = new Schema<Product>(
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
          const name = value.charAt(0).toUpperCase() + value.slice(1)
          return name === value
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
      enum: Object.values(ProductCategory),
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
    },
    inStock: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true },
)

export const ProductModel = model<Product>('Product', productSchema)
