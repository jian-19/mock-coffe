import products from "@/models/products";

export default async function handler(req, res) {
  const hotDrinks = await products.getAllProductsByCategory(1);

  res.status(200).json(hotDrinks);
}