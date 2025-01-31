import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (payload: TOrder) => {
  const { email, items } = payload;

  if (!items || items.length === 0) {
    throw new AppError(404, 'Cart is empty!');
  }

  let totalPrice = 0;
  const orderItems = [];

  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product) {
      throw new AppError(404, `Product not found`);
    }

    // Check stock availability
    const inStock = product.quantity > 0;

    if (!inStock || product.quantity < item.quantity) {
      throw new AppError(404, `Not enough stock for ${product.name}`);
    }

    orderItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      inStock,
    });

    totalPrice += product.price * item.quantity;

    // Reduce stock
    product.quantity -= item.quantity;
    await product.save();
  }

  // Create order in DB
  const newOrder = new Order({
    email,
    items: orderItems,
    totalPrice,
    status: 'Pending',
  });

  const result = await newOrder.save();
  return result;
};

const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  const ordersQuery = new QueryBuilder(Order.find(), query)
    // .search()
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await ordersQuery.countTotal();
  const result = await ordersQuery.modelQuery;

  return { meta, result };
};

const getOrdersByEmailFromDB = async (query: Record<string, unknown>) => {
  const filter = { email: query.email };

  const isEmailExists = await Order.findOne(filter);
  if (!isEmailExists) {
    throw new AppError(404, 'Order not found');
  }

  const result = await Order.find(filter);
  return result;
};

const updateOrderIntoDB = async (id: string, payload: Partial<TOrder>) => {
  const isOrderExists = await Order.findById(id);

  if (!isOrderExists) {
    throw new AppError(404, 'This order not found');
  }

  const result = await Order.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteOrderFromDB = async (id: string) => {
  const isOrderExists = await Product.findById(id);

  if (!isOrderExists) {
    throw new AppError(404, 'This order not found');
  }

  const result = await Order.findByIdAndDelete(id);

  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getOrdersByEmailFromDB,
  updateOrderIntoDB,
  deleteOrderFromDB,
};
