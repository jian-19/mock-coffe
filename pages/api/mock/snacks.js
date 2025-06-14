import products from "@/models/products";

export default async function handler(req, res) {
  const snacks = await products.getAllProductsByCategory(3);

  res.status(200).json(snacks);
}
