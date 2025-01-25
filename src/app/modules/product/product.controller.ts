import catchAsync from '../../utils/catchAsync';

const createProduct = catchAsync(async (req, res) => {});

const getAllProducts = catchAsync(async (req, res) => {});

const getSingleProduct = catchAsync(async (req, res) => {});

const updateProduct = catchAsync(async (req, res) => {});

const deleteProduct = catchAsync(async (req, res) => {});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
