import {
  Button,
  Card,
  FormControl,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Product, ProductWithoutId } from "../types/Product";
import { useState } from "react";

type NewProductModalProps = {
  openState: boolean;
  handleClose: () => void;
  onSubmit: (product: ProductWithoutId) => void;
};

export default function NewProductModal({
  openState,
  handleClose,
  onSubmit,
}: NewProductModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Modal
      open={openState}
      onClose={handleClose}
      className="flex justify-center items-center bg-black bg-opacity-70"
    >
      <Card className="p-5">
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ name, price, description });
          }}
        >
          <Typography variant="h4">Create New Product</Typography>
          <TextField
            required
            label="name"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            label="price"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            required
            label="description"
            type="textbox"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </Card>
    </Modal>
  );
}
