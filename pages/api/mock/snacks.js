import products from "@/models/products";

export default async function handler(req, res) {
  const snacks = await products.getAllProductsByCategory(3);

  res.status(200).json(
    snacks.map((product) => {
      const httpOrHttps = process.env.NODE_ENV === "production" ? "https" : "http"
      const baseUrl = req.headers.host
        
      return {
        ...product, 
        image: `${httpOrHttps}://${baseUrl}${product.image}`
      }
    })
  );
}
