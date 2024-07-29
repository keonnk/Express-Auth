import { Button, Card } from "@mui/material";

export type ProductProps = {
  _id: String;
  name: String;
  price: String;
  description: String;
  onDelete: () => void;
};

export default function Product({
  _id,
  name,
  price,
  description,
  onDelete,
}: ProductProps) {
  return (
    <Card className="flex flex-col min-h-32 justify-between gap-5 p-5">
      <div>
        <div className="text-2xl">{name}</div>
        <div className="text-xl">${price}</div>
        <div className="max-w-52">{description}</div>
      </div>
      <Button onClick={onDelete} color="error">
        Delete
      </Button>
    </Card>
  );
}
