export enum ProductCategory {
  Writing = 'Writing',
  OfficeSupplies = 'Office Supplies',
  ArtSupplies = 'Art Supplies',
  Educational = 'Educational',
  Technology = 'Technology',
}

export interface Product {
  name: string
  brand: string
  price: number
  category: ProductCategory
  description: string
  quantity: number
  inStock: boolean
}
