import express from 'express';
import { OrderControllers } from './order.controller';

const router = express.Router();

router.post('/', OrderControllers.handleCreateOrder);
router.get('/revenue', OrderControllers.handleCalculateRevenue);

export const OrderRoutes = router;
