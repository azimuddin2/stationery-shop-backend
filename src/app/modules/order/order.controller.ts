import { Request, Response } from 'express'
import { OrderServices } from './order.service'
import { OrderModel } from './order.model'

const handleCreateOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body
    const result = await OrderServices.createOrder(orderData)

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    })
  } catch (error) {
    const err = error as Error

    res.status(500).json({
      success: false,
      message: err.message || 'Product creation failed',
      error: err.name,
      stack: err.stack,
    })
  }
}

const handleCalculateRevenue = async (req: Request, res: Response) => {
  try {
    const revenueResult = await OrderModel.aggregate([
      {
        $project: { totalRevenue: { $multiply: ['$quantity', '$totalPrice'] } },
      },
      { $group: { _id: null, totalRevenue: { $sum: '$totalRevenue' } } },
    ])

    const totalRevenue =
      revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0

    res.status(200).json({
      success: true,
      status: true,
      message: 'Revenue calculated successfully',
      data: { totalRevenue: totalRevenue },
    })
  } catch (error: unknown) {
    const err = error as Error

    res.status(500).json({
      success: false,
      message: err.message || 'An error occurred while calculating revenue',
      error: err.name,
      stack: err.stack,
    })
  }
}

export const OrderControllers = {
  handleCreateOrder,
  handleCalculateRevenue,
}
