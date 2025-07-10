import products from "@/models/products";
/**
 * @swagger
 * /api/mock/hot_drinks:
 *  get:
 *    summary: Retorna uma lista de cafés quentes.
 *    description: Este endpoint busca e retorna uma lista de todos os cafés quentes disponíveis, incluindo seus detalhes.
 *    responses:
 *      200:
 *        description: Lista de cafés quentes obtida com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  title:
 *                    type: string
 *                    description: Título ou nome do café.
 *                    example: "Café Expresso"
 *                  content:
 *                    type: string
 *                    description: Descrição do café.
 *                    example: "Café curto, forte e aromático."
 *                  amount:
 *                    type: number
 *                    format: float
 *                    description: Preço do café.
 *                    example: 5.0
 *                  image:
 *                    type: string
 *                    format: url
 *                    description: URL da imagem do café.
 *                    example: "http://localhost:3000/hot_coffees/cafe%20expresso.png"
 */
export default async function handler(req, res) {
  const hotDrinks = await products.getAllProductsByCategory(1);

  res.status(200).json(
    hotDrinks.map((product) => {
      const httpOrHttps = process.env.NODE_ENV === "production" ? "https" : "http"
      const baseUrl = req.headers.host
        
      return {
        ...product, 
        image: `${httpOrHttps}://${baseUrl}${product.image}`
      }
    })
  );
}