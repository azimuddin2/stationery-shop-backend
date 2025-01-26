import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { productSearchableFields } from './product.constant';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (payload: TProduct) => {
  const filter = { name: payload.name };

  const isProductExists = await Product.findOne(filter);
  if (isProductExists) {
    throw new AppError(409, 'Product is already exist');
  }

  const result = await Product.create(payload);
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productsQuery = new QueryBuilder(Product.find(), query)
    .search(productSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await productsQuery.countTotal();
  const result = await productsQuery.modelQuery;

  return { meta, result };
};

const getSingleProductFromDB = async (id: string) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new AppError(404, 'This product not found');
  }

  return product;
};

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  const isProductExists = await Product.findById(id);

  if (!isProductExists) {
    throw new AppError(404, 'This product not found');
  }

  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteProductFromDB = async (id: string) => {
  const isProductExists = await Product.findById(id);

  if (!isProductExists) {
    throw new AppError(404, 'This product not found');
  }

  const result = await Product.findByIdAndDelete(id);

  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
