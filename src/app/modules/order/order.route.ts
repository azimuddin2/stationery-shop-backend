import express from 'express';
import { OrderControllers } from './order.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidations } from './order.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-order',
  auth('user', 'admin'),
  validateRequest(OrderValidations.createOrderValidationSchema),
  OrderControllers.createOrder,
);

router.get('/', auth('admin'), OrderControllers.getAllOrders);

router.get('/my-orders', auth('user'), OrderControllers.getOrdersByEmail);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(OrderValidations.updateOrderValidationSchema),
  OrderControllers.updateOrder,
);

router.delete('/:id', auth('admin', 'user'), OrderControllers.deleteOrder);

export const OrderRoutes = router;
