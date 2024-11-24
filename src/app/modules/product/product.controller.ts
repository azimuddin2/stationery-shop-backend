import { Request, Response } from "express";
import { ProductServices } from "./product.service";

const handleCreateProduct = async (req: Request, res: Response) => {
    try {
        const { product: productData } = req.body;
        const result = await ProductServices.createProduct(productData);

        res.status(200).json({
            success: true,
            message: 'Product created successfully',
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Product creation failed',
            error: err,
            stack: err.stack,
        });
    }
};

const handleGetAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const search: string = (req.query.searchTerm as string) || "";
        const result = await ProductServices.getAllProducts(search);

        res.status(200).json({
            success: true,
            message: 'Products retrieved successfully',
            data: result,
        });
    } catch (error: unknown) {
        const err = error as Error;

        res.status(500).json({
            success: false,
            message: err.message || 'Failed to retrieve products.',
            error: err.name,
            stack: err.stack,
        });
    }
};

const handleGetSingleProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId } = req.params;
        const result = await ProductServices.getSingleProduct(productId);

        res.status(200).json({
            success: true,
            message: 'Products retrieved successfully',
            data: result,
        });
    } catch (error: unknown) {
        const err = error as Error;

        res.status(500).json({
            success: false,
            message: err.message || 'Failed to retrieve products.',
            error: err.name,
            stack: err.stack,
        });
    }
};

const handleUpdateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId } = req.params;
        const { product: productData } = req.body;

        const result = await ProductServices.updateProduct(productId, productData);

        res.status(200).json({
            success: true,
            message: 'Product was updated successfully',
            data: result,
        });
    } catch (error: unknown) {
        const err = error as Error;

        res.status(500).json({
            success: false,
            message: err.message || 'Product updated failed',
            error: err.name,
            stack: err.stack,
        });
    }
};

const handleDeleteProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        await ProductServices.deleteProduct(productId);

        res.status(200).json({
            success: true,
            message: 'Product was deleted successfully',
            data: {},
        });
    } catch (error: unknown) {
        const err = error as Error;

        res.status(500).json({
            success: false,
            message: err.message || 'Product deleted failed',
            error: err.name,
            stack: err.stack,
        });
    }
};

export const ProductControllers = {
    handleCreateProduct,
    handleGetAllProducts,
    handleGetSingleProduct,
    handleUpdateProduct,
    handleDeleteProduct,
};