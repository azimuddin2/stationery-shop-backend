import mongoose from "mongoose";
import { Product } from "./product.interface";
import { ProductModel } from "./product.model";
import createError from "http-errors";

const createProduct = async (product: Product) => {
    try {
        const filter = { name: product.name };
        const productExists = await ProductModel.exists(filter);
        if (productExists) {
            throw createError(
                409,
                `${product.name} already exists.`
            )
        }

        const result = await ProductModel.create(product);
        if (!result) {
            throw createError(
                401,
                'Product was not created successfully'
            )
        }

        return result;
    } catch (error) {
        throw error;
    }
};

const getAllProducts = async (search: string): Promise<Product[]> => {
    try {
        const searchRegExp: RegExp = new RegExp(`.*${search}.*`, 'i');

        const filter: Record<string, unknown> = {
            $or: [
                { name: { $regex: searchRegExp } },
                { brand: { $regex: searchRegExp } },
                { category: { $regex: searchRegExp } },
            ],
        };

        const result: Product[] = await ProductModel.find(filter).populate('category');
        if (!result || result.length === 0) {
            throw createError(
                404,
                'No product found'
            );
        }

        return result;
    } catch (error: unknown) {
        throw error;
    }
};

const getSingleProduct = async (id: string): Promise<Product | null> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw createError(
                400,
                `Invalid product ID format: ${id}`
            );
        }

        const product = await ProductModel.findById(id);

        if (!product) {
            throw createError(
                404,
                `Product ID ${id} does not exist.`
            )
        }

        return product;
    } catch (error: unknown) {
        throw error;
    }
};

export const ProductServices = {
    createProduct,
    getAllProducts,
    getSingleProduct,
}