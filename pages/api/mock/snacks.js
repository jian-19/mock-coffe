/**
 * @swagger
 * /api/mock/snacks:
 *  get:
 *    tags:
 *      - Lanches
 *    summary: Retorna uma lista de lanches.
 *    description: Este endpoint busca e retorna uma lista de todos os lanches disponíveis, incluindo seus detalhes.
 *    parameters:
 *      - in: query
 *        name: id
 *        schema:
 *          type: string
 *        description: O ID do lanche a ser retornado (filtro opcional).
 *        required: false
 *    responses:
 *      200:
 *        description: Lista de lanches obtida com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    format: int64
 *                    description: ID único do lanche.
 *                    readOnly: true
 *                    example: 123
 *                  title:
 *                    type: string
 *                    example: "Café Expresso"
 *                  content:
 *                    type: string
 *                    example: "Café curto, forte e aromático."
 *                  amount:
 *                    type: number
 *                    format: float
 *                    example: 5.0
 *                  image:
 *                    type: string
 *                    format: url
 *                    example: "http://localhost:3000/hot_coffees/cafe%20expresso.png"
 *
 *  post:
 *    tags:
 *      - Lanches
 *    summary: Cadastra um novo lanche.
 *    description: Este endpoint permite adicionar um novo lanche ao sistema.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - title
 *              - content
 *              - amount
 *              - image
 *            properties:
 *              title:
 *                type: string
 *                example: "Pão de Queijo"
 *              content:
 *                type: string
 *                example: "Pão de queijo mineiro, crocante por fora e macio por dentro."
 *              amount:
 *                type: number
 *                format: float
 *                example: 3.5
 *              image:
 *                type: string
 *                format: url
 *                example: "http://localhost:3000/snacks/pao_de_queijo.png"
 *    responses:
 *      201:
 *        description: Lanche cadastrado com sucesso.
 *      400:
 *        description: Requisição inválida.
 *
 *  put:
 *    tags:
 *      - Lanches
 *    summary: Atualiza um lanche existente.
 *    description: Este endpoint atualiza os dados de um lanche com base no ID fornecido.
 *    parameters:
 *      - in: query
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID do lanche a ser atualizado.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                example: "Coxinha"
 *              content:
 *                type: string
 *                example: "Coxinha de frango com catupiry."
 *              amount:
 *                type: number
 *                format: float
 *                example: 6.0
 *              image:
 *                type: string
 *                format: url
 *                example: "http://localhost:3000/snacks/coxinha.png"
 *    responses:
 *      200:
 *        description: Lanche atualizado com sucesso.
 *      404:
 *        description: Lanche não encontrado.
 *      400:
 *        description: Requisição inválida.
 *
 *  delete:
 *    tags:
 *      - Lanches
 *    summary: Remove um lanche pelo ID.
 *    description: Este endpoint remove um lanche específico com base no ID fornecido.
 *    parameters:
 *      - in: query
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID do lanche a ser removido.
 *    responses:
 *      200:
 *        description: Lanche removido com sucesso.
 *      404:
 *        description: Lanche não encontrado.
 */
let mockSnacks = [ 
  { id: "1", title: "Pão de Queijo", content: "Tradicional pão de queijo quentinho", amount: 6.00, image: "/snacks/pao_de_queijo.png", category_id: 3 },
  { id: "2", title: "Coxinha de Frango", content: "Massa crocante com recheio de frango cremoso", amount: 8.50, image: "/snacks/coxinha.png", category_id: 3 },
  { id: "3", title: "Bolo de Cenoura", content: "Fatia generosa de bolo de cenoura com cobertura", amount: 12.00, image: "/snacks/bolo_cenoura.png", category_id: 3 },
  { id: "4", title: "Brigadeiro", content: "Doce tradicional de chocolate", amount: 3.50, image: "/snacks/brigadeiro.png", category_id: 3 },
];
let nextId = 5;

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
        const product = mockSnacks.find(p => p.id === id);
        if (!product) {
          return res.status(404).json({ message: 'Snack não encontrado.' });
        }

        const productWithFormattedImage = {
          ...product,
          image: product.image ? `${httpOrHttps}://${baseUrl}${product.image}` : null,
        };
        return res.status(200).json(productWithFormattedImage);

      } else {
        res.status(200).json(
          mockSnacks.map((product) => {
            return {
              ...product,
              image: product.image ? `${httpOrHttps}://${baseUrl}${product.image}` : null,
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

      const requiredFields = ['title', 'amount'];
      const missingFields = requiredFields.filter(field => newProductData[field] === undefined || newProductData[field] === null);

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `Dados do snack incompletos: ${missingFields.join(', ')} são obrigatórios.`
        });
      }

      const createdProduct = {
        id: String(nextId++), 
        title: newProductData.title,
        content: newProductData.content || '',
        amount: parseFloat(newProductData.amount),
        image: newProductData.image || '',
        category_id: 3, 
      };

      mockSnacks.push(createdProduct); 

      const productWithFormattedImage = {
        ...createdProduct,
        image: createdProduct.image ? `${httpOrHttps}://${baseUrl}${createdProduct.image}` : null,
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

      let snackIndex = mockSnacks.findIndex(p => p.id === id);

      if (snackIndex === -1) {
        return res.status(404).json({ message: 'Snack não encontrado para atualização.' });
      }

      mockSnacks[snackIndex] = { 
        ...mockSnacks[snackIndex],
        ...updateData,
        amount: parseFloat(updateData.amount || mockSnacks[snackIndex].amount),
        category_id: updateData.category_id || mockSnacks[snackIndex].category_id,
      };

      const updatedProduct = mockSnacks[snackIndex];

      const productWithFormattedImage = {
        ...updatedProduct,
        image: updatedProduct.image ? `${httpOrHttps}://${baseUrl}${updatedProduct.image}` : null,
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

      const initialLength = mockSnacks.length;
      mockSnacks = mockSnacks.filter(p => p.id !== id);

      if (mockSnacks.length === initialLength) {
        return res.status(404).json({ message: 'Snack não encontrado para exclusão.' });
      }

      res.status(200).json({ message: 'Snack excluído com sucesso.', id: id });

    } catch (error) {
      console.error('Erro ao excluir snack:', error);
      res.status(500).json({ message: 'Erro interno do servidor ao excluir o snack.' });
    }


  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}