import catchAsync from '../../utils/catchAsync';
import { OrderServices } from './order.service';
import sendResponse from '../../utils/sendResponse';

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.createOrderIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Order placed successfully!',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOrdersFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Orders retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getOrdersByEmail = catchAsync(async (req, res) => {
  const result = await OrderServices.getOrdersByEmailFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrderServices.updateOrderIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Orders updated successfully',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrderServices.deleteOrderFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Orders deleted successfully',
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getOrdersByEmail,
  updateOrder,
  deleteOrder,
};
