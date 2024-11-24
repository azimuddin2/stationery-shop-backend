import mongoose, { Document } from 'mongoose'

export interface Order extends Document {
  email: string
  product: mongoose.Types.ObjectId
  quantity: number
  totalPrice: number
}
