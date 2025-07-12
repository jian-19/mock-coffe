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

  const httpOrHttps = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = req.headers.host;

  if (req.method === "GET") {
  
    const coldDrinks = await products.getAllProductsByCategory(2);
    res.status(200).json(
      coldDrinks.map((product) => {
        return {
          ...product,
          image: `${httpOrHttps}://${baseUrl}${product.image}`,
        };
      })
    );
  } else if (req.method === "POST") {

    try {
      const newProductData = req.body;

  
      const requiredFields = ["title", "content", "amount", "image"];
      const missingFields = requiredFields.filter(
        (field) => !newProductData[field]
      );

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `Dados do produto incompletos: ${missingFields.join(
            ", "
          )} são obrigatórios.`,
        });
      }


      const productToCreate = {
        ...newProductData,
        category: 2,
      };


      const createdProduct = await products.createProduct(productToCreate);


      const productWithFormattedImage = {
        ...createdProduct,
        image: `${httpOrHttps}://${baseUrl}${createdProduct.image}`,
      };

      res.status(201).json(productWithFormattedImage);
    } catch (error) {
      console.error("Erro ao criar bebida gelada:", error);
      res
        .status(500)
        .json({
          message: "Erro interno do servidor ao criar a bebida gelada.",
        });
    }
  } else {

    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
