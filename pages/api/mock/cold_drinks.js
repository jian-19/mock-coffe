/**
 * @swagger
 * /api/mock/cold_drinks:
 *  get:
 *    tags:
 *      - Bebidas Geladas
 *    summary: Retorna uma lista de bebidas geladas.
 *    description: Este endpoint busca e retorna uma lista de todas as bebidas geladas disponíveis, incluindo seus detalhes.
 *    parameters:
 *      - in: query
 *        name: id
 *        schema:
 *          type: string
 *        description: O ID da bebida gelada a ser retornada (filtro opcional).
 *        required: false
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
 *                  id:
 *                    type: integer
 *                    format: int64
 *                    description: ID único da bebida. Gerado automaticamente pelo sistema.
 *                    readOnly: true
 *                    example: 123
 *                  title:
 *                    type: string
 *                    description: Título ou nome da bebida.
 *                    example: "Suco de Laranja"
 *                  content:
 *                    type: string
 *                    description: Descrição da bebida.
 *                    example: "Suco natural de laranja gelado."
 *                  amount:
 *                    type: number
 *                    format: float
 *                    description: Preço da bebida.
 *                    example: 6.5
 *                  image:
 *                    type: string
 *                    format: url
 *                    description: URL da imagem da bebida.
 *                    example: "http://localhost:3000/cold_coffees/suco%20de%20laranja.png"
 *
 *  post:
 *    tags:
 *      - Bebidas Geladas
 *    summary: Cadastra uma nova bebida gelada.
 *    description: Este endpoint permite adicionar uma nova bebida gelada ao sistema.
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
 *                example: "Chá Gelado"
 *              content:
 *                type: string
 *                example: "Chá preto com limão e gelo."
 *              amount:
 *                type: number
 *                format: float
 *                example: 5.5
 *              image:
 *                type: string
 *                format: url
 *                example: "http://localhost:3000/cold_coffees/cha%20gelado.png"
 *    responses:
 *      201:
 *        description: Bebida gelada cadastrada com sucesso.
 *      400:
 *        description: Requisição inválida. Verifique os campos obrigatórios.
 *
 *  put:
 *    tags:
 *      - Bebidas Geladas
 *    summary: Atualiza uma bebida gelada existente.
 *    description: Este endpoint atualiza os dados de uma bebida gelada com base no ID fornecido.
 *    parameters:
 *      - in: query
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID da bebida gelada a ser atualizada.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                example: "Água com Gás"
 *              content:
 *                type: string
 *                example: "Água mineral gaseificada gelada."
 *              amount:
 *                type: number
 *                format: float
 *                example: 4.0
 *              image:
 *                type: string
 *                format: url
 *                example: "http://localhost:3000/cold_coffees/agua%20com%20gas.png"
 *    responses:
 *      200:
 *        description: Bebida gelada atualizada com sucesso.
 *      404:
 *        description: Bebida não encontrada.
 *      400:
 *        description: Requisição inválida.
 *
 *  delete:
 *    tags:
 *      - Bebidas Geladas
 *    summary: Remove uma bebida gelada pelo ID.
 *    description: Este endpoint remove uma bebida gelada específica com base no ID fornecido.
 *    parameters:
 *      - in: query
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID da bebida gelada a ser removida.
 *    responses:
 *      200:
 *        description: Bebida gelada removida com sucesso.
 *      404:
 *        description: Bebida não encontrada.
 */
let mockColdDrinks = [
  { id: "1", title: "Água com Gás", content: "Água refrescante com gás", amount: 5.00, image: "", category_id: 5 },
  { id: "2", title: "Refrigerante de Limão", content: "Refrigerante cítrico", amount: 7.00, image: "", category_id: 5 },
];
let nextId = 3; 
export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const { id } = req.query;
      if (id) {
        const item = mockColdDrinks.find(i => i.id === id);
        if (item) {
          return res.status(200).json(item);
        } else {
          return res.status(404).json({ message: 'Bebida gelada não encontrada' });
        }
      }
      return res.status(200).json(mockColdDrinks);

    case 'POST':
      try {
        const { title, content, amount, image, category_id } = req.body;

        if (!title || !amount) {
          return res.status(400).json({ message: 'Título e Preço são obrigatórios.' });
        }

        const newItem = {
          id: String(nextId++),
          title,
          content: content || '',
          amount: parseFloat(amount),
          image: image || '',
          category_id: category_id || 5, // Categoria padrão para bebidas geladas
        };
        mockColdDrinks.push(newItem);

        return res.status(201).json(newItem);

      } catch (error) {
        console.error('Erro ao adicionar bebida gelada:', error);
        return res.status(500).json({ message: 'Erro interno do servidor ao adicionar bebida gelada.', error: error.message });
      }

    case 'PUT':
      try {
        const { id } = req.query;
        const { title, content, amount, image, category_id } = req.body;

        let itemIndex = mockColdDrinks.findIndex(i => i.id === id);

        if (itemIndex === -1) {
          return res.status(404).json({ message: 'Bebida gelada não encontrada para atualização.' });
        }

        mockColdDrinks[itemIndex] = {
          ...mockColdDrinks[itemIndex],
          title: title || mockColdDrinks[itemIndex].title,
          content: content || mockColdDrinks[itemIndex].content,
          amount: parseFloat(amount) || mockColdDrinks[itemIndex].amount,
          image: image || mockColdDrinks[itemIndex].image,
          category_id: category_id || mockColdDrinks[itemIndex].category_id,
        };

        return res.status(200).json(mockColdDrinks[itemIndex]);

      } catch (error) {
        console.error('Erro ao atualizar bebida gelada:', error);
        return res.status(500).json({ message: 'Erro interno do servidor ao atualizar bebida gelada.', error: error.message });
      }

    case 'DELETE':
      try {
        const { id } = req.query;
        const initialLength = mockColdDrinks.length;
        mockColdDrinks = mockColdDrinks.filter(i => i.id !== id);

        if (mockColdDrinks.length === initialLength) {
          return res.status(404).json({ message: 'Bebida gelada não encontrada para exclusão.' });
        }

        return res.status(200).json({ message: 'Bebida gelada excluída com sucesso.' });

      } catch (error) {
        console.error('Erro ao excluir bebida gelada:', error);
        return res.status(500).json({ message: 'Erro interno do servidor ao excluir bebida gelada.', error: error.message });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}