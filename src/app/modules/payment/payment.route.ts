import express from 'express';
import { PaymentControllers } from './payment.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PaymentValidation } from './payment.validation';

const router = express.Router();

router.post(
  '/create-payment-intent',
  auth('user'),
  PaymentControllers.handleCreatePaymentIntent,
);

router.post(
  '/process-payment',
  auth('user'),
  validateRequest(PaymentValidation.paymentValidationSchema),
  PaymentControllers.handleProcessPayment,
);

router.get('/', auth('user'), PaymentControllers.getPaymentsByEmail);

export const PaymentRoutes = router;
