import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/', ProductControllers.handleCreateProduct);
router.get('/', ProductControllers.handleGetAllProducts);
router.get('/:productId', ProductControllers.handleGetSingleProduct);

export const ProductRoutes = router;