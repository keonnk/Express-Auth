export type Product = {
  _id: String;
  name: String;
  price: String;
  description: String;
};

export type ProductWithoutId = Omit<Product, "_id">;
