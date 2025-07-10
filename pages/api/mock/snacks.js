import products from "@/models/products";

/**
 * @swagger
 * /api/mock/snacks:
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
 *                    description: Título ou nome do lanche.
 *                    example: "Pão de Queijo"
 *                  content:
 *                    type: string
 *                    description: Descrição do lanche.
 *                    example: "Porção com 5 unidades de pão de queijo."
 *                  amount:
 *                    type: number
 *                    format: float
 *                    description: Preço do lanche.
 *                    example: 7.0
 *                  image:
 *                    type: string
 *                    format: url
 *                    description: URL da imagem do lanche.
 *                    example: "http://localhost:3000/snacks/pao de queijo.png"
 */
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
