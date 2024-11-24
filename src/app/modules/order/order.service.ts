import { ProductModel } from "../product/product.model";
import { Order } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrder = async (order: Order) => {
    try {
        const { email, product: productId, quantity } = order;

        if (!email || !productId || !quantity || quantity <= 0) {
            throw new Error("All fields are required.");
        }

        const productData = await ProductModel.findById(productId);
        if (!productData) {
            throw new Error("Product not found.");
        }

        // Check if sufficient stock is available
        if (productData.quantity < quantity) {
            throw new Error("Insufficient stock available.");
        }

        // Reduce inventory and update inStock status
        productData.quantity -= quantity;
        if (productData.quantity === 0) {
            productData.inStock = false;
        }
        await productData.save();

        // Create a new order
        const newOrder = new OrderModel(order);
        await newOrder.save();

        return newOrder;
    } catch (error: unknown) {
        throw error;
    }
};


export const OrderServices = {
    createOrder,
}