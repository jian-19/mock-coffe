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
