import products from "@/models/products";

export default async function handler(req, res) {
  const coldDrinks = await products.getAllProductsByCategory(2);

  res.status(200).json(coldDrinks);
}
