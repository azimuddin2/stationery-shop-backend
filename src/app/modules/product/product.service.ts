import { TProduct } from './product.interface';

const createProductIntoDB = async (payload: TProduct) => {};

const getAllProductsFromDB = async (query: string) => {};

const getSingleProductFromDB = async (id: string) => {};

const updateProductIntoDB = async (
  id: string,
  payload: Partial<TProduct>,
) => {};

const deleteProductFromDB = async (id: string) => {};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
