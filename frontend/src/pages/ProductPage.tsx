import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Product from "../components/Product";
import { Product as ProductType} from "../types/Product";

type ProductPageProps = {};

export default function ProductPage() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:4000/product");
      setProducts(await res.json());
    };
    fetchProducts();
  }, []);

  const deleteProduct = async (_id: String) => {
    const res = await fetch(`http://localhost:4000/product/${_id}`, {
      method: 'DELETE'
    })

    if (res.status === 200) {
      setProducts(products.filter(product => product._id != _id))
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] gap-5">
      <Button>Add Product</Button>
      {products
        ? /*@ts-ignore*/
          products.map((product) => {
            return (
              <Product
                _id={product._id}
                name={product.name}
                price={product.price}
                description={product.description}
                onDelete={() => deleteProduct(product._id)}
              />
            );
          })
        : ""}
      <Button>Logout</Button>
    </div>
  );
}
