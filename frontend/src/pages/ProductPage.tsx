import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Product from "../components/Product";
import { Product as ProductType, ProductWithoutId } from "../types/Product";
import NewProductModal from "../components/NewProductModal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type ProductPageProps = {};

export default function ProductPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  let navigate = useNavigate();

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:4000/product", {
        credentials: "include",
      });
      setProducts(await res.json());

      if (res.status !== 200) {
        toast.error("Failed to fetch products");
      }
    };
    fetchProducts();
  }, [products]);

  const deleteProduct = async (_id: String) => {
    const res = await fetch(`http://localhost:4000/product/${_id}`, {
      credentials: "include",
      method: "DELETE",
    });

    if (res.status === 200) {
      setProducts(products.filter((product) => product._id != _id));
    }
  };

  const submitNewProduct = async (product: ProductWithoutId) => {
    const res = await fetch(`http://localhost:4000/product`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        name: product.name,
        price: product.price,
        description: product.description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      const newProduct = await res.json();
      setProducts([...products, newProduct]);
    }

    handleClose();
  };

  const logout = async () => {
    const res = await fetch(`http://localhost:4000/logout`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      navigate("/");
    } else {
      toast.error("Logout was unsuccessful");
    }
  };

  return (
    <div className="flex flex-col justify-center pt-[10%] mx-[20%] items-center gap-5">
      <div className="flex gap-5">
        <Button variant="contained" onClick={handleOpen}>
          Add Product
        </Button>
        <Button onClick={logout}>Logout</Button>
      </div>
      <div className="flex flex-wrap justify-center gap-5">
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
      </div>
      <NewProductModal
        openState={modalOpen}
        onSubmit={submitNewProduct}
        handleClose={handleClose}
      />
    </div>
  );
}
