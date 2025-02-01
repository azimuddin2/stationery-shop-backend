import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PaymentServices } from './payment.service';

const handleCreatePaymentIntent = catchAsync(async (req, res) => {
  PaymentServices.createPaymentIntent(req, res);
});

const handleProcessPayment = catchAsync(async (req, res) => {
  const result = await PaymentServices.processPayment(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Payment successful',
    data: result,
  });
});

const getPaymentsByEmail = catchAsync(async (req, res) => {
  const result = await PaymentServices.getPaymentsByEmailFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payment history retrieved successfully',
    data: result,
  });
});

export const PaymentControllers = {
  handleCreatePaymentIntent,
  handleProcessPayment,
  getPaymentsByEmail,
};
