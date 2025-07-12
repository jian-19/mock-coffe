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
  const httpOrHttps = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = req.headers.host;

  if (req.method === 'GET') {
    const snacks = await products.getAllProductsByCategory(3); // Categoria 3 para snacks

    res.status(200).json(
      snacks.map((product) => {
        return {
          ...product, 
          image: `${httpOrHttps}://${baseUrl}${product.image}`
        };
      })
    );
  } else if (req.method === 'POST') {
    try {
      const newProductData = req.body;

      // Validação básica dos dados recebidos
      const requiredFields = ['title', 'content', 'amount', 'image'];
      const missingFields = requiredFields.filter(field => !newProductData[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({ 
          message: `Dados do produto incompletos: ${missingFields.join(', ')} são obrigatórios.` 
        });
      }

      // Adiciona a categoria fixa para snacks (assumindo 3 é o ID da categoria)
      const productToCreate = {
        ...newProductData,
        category: 3, 
      };

      const createdProduct = await products.createProduct(productToCreate);

      // Formata a URL da imagem para o retorno
      const productWithFormattedImage = {
        ...createdProduct,
        image: `${httpOrHttps}://${baseUrl}${createdProduct.image}`,
      };

      res.status(201).json(productWithFormattedImage);

    } catch (error) {
      console.error('Erro ao criar snack:', error);
      res.status(500).json({ message: 'Erro interno do servidor ao criar o snack.' });
    }
  } else {
    // Se o método não for GET nem POST, retorna 405 Method Not Allowed
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}