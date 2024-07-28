type ProductProps = {
  id: String;
  name: String;
  price: String;
  description: String;
};

export default function Product({
  id,
  name,
  price,
  description,
}: ProductProps) {
  return (
    <div className="border border-black flex flex-col">
      <div className="text-xl">{name}</div>
      <div>${price}</div>
      <div>{description}</div>
    </div>
  );
}
