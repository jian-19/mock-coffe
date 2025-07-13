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
 *                  id:
 *                    type: integer  # O ID geralmente é um número inteiro
 *                    format: int64  # Ou int32, dependendo do tamanho do seu ID no banco de dados
 *                    description: ID único do café. Gerado automaticamente pelo sistema.
 *                    readOnly: true # Indica que esse campo é gerado pelo servidor e não deve ser enviado pelo cliente
 *                    example: 123
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
 *                  id:
 *                    type: integer  # O ID geralmente é um número inteiro
 *                    format: int64  # Ou int32, dependendo do tamanho do seu ID no banco de dados
 *                    description: ID único do café. Gerado automaticamente pelo sistema.
 *                    readOnly: true # Indica que esse campo é gerado pelo servidor e não deve ser enviado pelo cliente
 *                    example: 123
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
 *                  id:
 *                    type: integer  # O ID geralmente é um número inteiro
 *                    format: int64  # Ou int32, dependendo do tamanho do seu ID no banco de dados
 *                    description: ID único do café. Gerado automaticamente pelo sistema.
 *                    readOnly: true # Indica que esse campo é gerado pelo servidor e não deve ser enviado pelo cliente
 *                    example: 123
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
 *                  id:
 *                    type: integer  # O ID geralmente é um número inteiro
 *                    format: int64  # Ou int32, dependendo do tamanho do seu ID no banco de dados
 *                    description: ID único do café. Gerado automaticamente pelo sistema.
 *                    readOnly: true # Indica que esse campo é gerado pelo servidor e não deve ser enviado pelo cliente
 *                    example: 123
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
          return res.status(404).json({ message: 'Bebida gelada não encontrada.' });
        }

        const productWithFormattedImage = {
          ...product,
          image: `${httpOrHttps}://${baseUrl}${product.image}`,
        };
        return res.status(200).json(productWithFormattedImage);

      } else {
        const coldDrinks = await products.getAllProductsByCategory(2); 

        res.status(200).json(
          coldDrinks.map((product) => {
            return {
              ...product,
              image: `${httpOrHttps}://${baseUrl}${product.image}`
            };
          })
        );
      }
    } catch (error) {
      console.error('Erro ao buscar bebidas geladas:', error);
      res.status(500).json({ message: 'Erro interno do servidor ao buscar as bebidas geladas.' });
    }

  } else if (req.method === 'POST') {
    try {
      const newProductData = req.body; 

      const requiredFields = ['title', 'content', 'amount', 'image'];
      const missingFields = requiredFields.filter(field => !newProductData[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `Dados da bebida gelada incompletos: ${missingFields.join(', ')} são obrigatórios.`
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
      console.error('Erro ao criar bebida gelada:', error);
      res.status(500).json({ message: 'Erro interno do servidor ao criar a bebida gelada.' });
    }

  } else if (req.method === 'PUT') {
    try {
      const { id } = req.query; 
      const updateData = req.body; 

      if (!id) {
        return res.status(400).json({ message: 'ID da bebida gelada é obrigatório para atualização.' });
      }

      const updatedProduct = await products.updateProduct(id, updateData); 

      if (!updatedProduct) {
        return res.status(404).json({ message: 'Bebida gelada não encontrada para atualização.' });
      }

      const productWithFormattedImage = {
        ...updatedProduct,
        image: `${httpOrHttps}://${baseUrl}${updatedProduct.image}`,
      };

      res.status(200).json(productWithFormattedImage); 

    } catch (error) {
      console.error('Erro ao atualizar bebida gelada:', error);
      res.status(500).json({ message: 'Erro interno do servidor ao atualizar a bebida gelada.' });
    }

  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query; 

      if (!id) {
        return res.status(400).json({ message: 'ID da bebida gelada é obrigatório para exclusão.' });
      }

      const deletedProduct = await products.deleteProduct(id); 

      if (!deletedProduct) {
        return res.status(404).json({ message: 'Bebida gelada não encontrada para exclusão.' });
      }

      res.status(200).json({ message: 'Bebida gelada excluída com sucesso.', id: deletedProduct.id }); 

    } catch (error) {
      console.error('Erro ao excluir bebida gelada:', error);
      res.status(500).json({ message: 'Erro interno do servidor ao excluir a bebida gelada.' });
    }


  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']); 
    res.status(405).end(`Method ${req.method} Not Allowed`); 
  }
}