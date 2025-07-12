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
 *  post:
 *    summary: Envia uma lista de cafés quentes.
 *    description: Este endpoint envia uma lista de todos os cafés quentes disponíveis, incluindo seus detalhes.
 *    responses:
 *      200:
 *        description: Lista de cafés quentes enviada com sucesso.
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
 *  put:
 *    summary: edita uma lista de cafés quentes.
 *    description: Este endpoint edita uma lista de todos os cafés quentes disponíveis, incluindo seus detalhes.
 *    responses:
 *      200:
 *        description: Lista de cafés quentes editada com sucesso.
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
 *  delete:
 *    summary: deleta uma lista de cafés quentes.
 *    description: Este endpoint deleta uma lista de todos os cafés quentes disponíveis, incluindo seus detalhes.
 *    responses:
 *      200:
 *        description: Lista de cafés quentes deletada com sucesso.
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
 *
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
