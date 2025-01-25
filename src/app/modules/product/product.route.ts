import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/', ProductControllers.handleCreateProduct);
router.get('/', ProductControllers.handleGetAllProducts);
router.get('/:productId', ProductControllers.handleGetSingleProduct);
router.put('/:productId', ProductControllers.handleUpdateProduct);
router.delete('/:productId', ProductControllers.handleDeleteProduct);

export const ProductRoutes = router;
