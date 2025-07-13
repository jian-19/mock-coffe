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

  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(200).end(); 
    return; 
  }

  if (req.method === 'GET') {
    try {
      const { id } = req.query;

      if (id) {

        const product = await products.getProductById(id); 
        if (!product) {
          return res.status(404).json({ message: 'Snack não encontrado.' });
        }

        const productWithFormattedImage = {
          ...product,
          image: `${httpOrHttps}://${baseUrl}${product.image}`,
        };
        return res.status(200).json(productWithFormattedImage);

      } else {
        const snacks = await products.getAllProductsByCategory(3); 

        res.status(200).json(
          snacks.map((product) => {
            return {
              ...product,
              image: `${httpOrHttps}://${baseUrl}${product.image}`
            };
          })
        );
      }
    } catch (error) {
      console.error('Erro ao buscar snacks:', error);
      res.status(500).json({ message: 'Erro interno do servidor ao buscar os snacks.' });
    }

  } else if (req.method === 'POST') {
    try {
      const newProductData = req.body;

      const requiredFields = ['title', 'content', 'amount', 'image'];
      const missingFields = requiredFields.filter(field => !newProductData[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `Dados do snack incompletos: ${missingFields.join(', ')} são obrigatórios.`
        });
      }

      const productToCreate = {
        ...newProductData,
        category: 3,
      };

      const createdProduct = await products.createProduct(productToCreate); 

      const productWithFormattedImage = {
        ...createdProduct,
        image: `${httpOrHttps}://${baseUrl}${createdProduct.image}`,
      };

      res.status(201).json(productWithFormattedImage);

    } catch (error) {
      console.error('Erro ao criar snack:', error);
      res.status(500).json({ message: 'Erro interno do servidor ao criar o snack.' });
    }

  } else if (req.method === 'PUT') {
    try {
      const { id } = req.query;
      const updateData = req.body; 

      if (!id) {
        return res.status(400).json({ message: 'ID do snack é obrigatório para atualização.' });
      }

      const updatedProduct = await products.updateProduct(id, updateData); 

      if (!updatedProduct) {
        return res.status(404).json({ message: 'Snack não encontrado para atualização.' });
      }

      const productWithFormattedImage = {
        ...updatedProduct,
        image: `${httpOrHttps}://${baseUrl}${updatedProduct.image}`,
      };

      res.status(200).json(productWithFormattedImage); 

    } catch (error) {
      console.error('Erro ao atualizar snack:', error);
      res.status(500).json({ message: 'Erro interno do servidor ao atualizar o snack.' });
    }

  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query; 

      if (!id) {
        return res.status(400).json({ message: 'ID do snack é obrigatório para exclusão.' });
      }

      const deletedProduct = await products.deleteProduct(id);

      if (!deletedProduct) {
        return res.status(404).json({ message: 'Snack não encontrado para exclusão.' });
      }

      res.status(200).json({ message: 'Snack excluído com sucesso.', id: deletedProduct.id }); 

    } catch (error) {
      console.error('Erro ao excluir snack:', error);
      res.status(500).json({ message: 'Erro interno do servidor ao excluir o snack.' });
    }


  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']); 
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}