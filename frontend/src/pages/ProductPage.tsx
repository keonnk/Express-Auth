import { Button } from "@mui/material";
import { useEffect } from "react";

type ProductPageProps = {};

export default function ProductPage() {
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:4000/product");
      console.log(response.body);
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex gap-5">
      <Button>Logout</Button>
      <Button>Add Product</Button>
    </div>
  );
}
