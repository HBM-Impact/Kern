export type ProductDimensions = {
  depth: number;
  height: number;
  width: number;
};

export type ProductReview = {
  comment: string;
  date: string;
  rating: number;
  reviewerEmail: string;
  reviewerName: string;
};

export type ProductMeta = {
  barcode: string;
  createdAt: string;
  qrCode: string;
  updatedAt: string;
};

export type Product = {
  availabilityStatus: string;
  brand: string;
  category: string;
  description: string;
  dimensions: ProductDimensions;
  discountPercentage: number;
  id: number;
  images: string[];
  meta: ProductMeta;
  minimumOrderQuantity: number;
  price: number;
  rating: number;
  returnPolicy: string;
  reviews: ProductReview[];
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: string[];
  thumbnail: string;
  title: string;
  warrantyInformation: string;
  weight: number;
};

export type ProductResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type Category = {
  slug: string;
  name: string;
  url: string;
};

export type CategoryResponse = Category[];
