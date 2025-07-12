import products from "@/models/products";
/**
 * @swagger
 * /api/mock/cold_drinks:
 *  get:
 *    summary: Retorna uma lista de bebidas geladas.
 *    description: Este endpoint busca e retorna uma lista de todos as bebidas geladas disponíveis, incluindo seus detalhes.
 *    responses:
 *      200:
 *        description: Lista de bebidas geladas obtida com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  title:
 *                    type: string
 *                    description: Título ou nome da bebida gelada.
 *                    example: "Chá Gelado"
 *                  content:
 *                    type: string
 *                    description: Descrição da bebida gelada.
 *                    example: "Chá preto gelado com limão."
 *                  amount:
 *                    type: number
 *                    format: float
 *                    description: Preço da bebida gelada.
 *                    example: 6.5
 *                  image:
 *                    type: string
 *                    format: url
 *                    description: URL da imagem da bebida gelada.
 *                    example: "http://localhost:3000/cold_coffees/cha gelado.png"
 */
export default async function handler(req, res) {
  const coldDrinks = await products.getAllProductsByCategory(2);

  res.status(200).json(
    coldDrinks.map((product) => {
      const httpOrHttps =
        process.env.NODE_ENV === "production" ? "https" : "http";
      const baseUrl = req.headers.host;

      return {
        ...product,
        image: `${httpOrHttps}://${baseUrl}${product.image}`,
      };
    })
  );
}
