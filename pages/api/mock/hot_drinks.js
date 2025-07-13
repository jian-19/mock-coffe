/**
 * @swagger
 * /api/mock/hot_drinks:
 *  get:
 *    tags:
 *      - Bebidas Quentes
 *    summary: Retorna uma lista de cafés quentes.
 *    description: Este endpoint busca e retorna uma lista de todos os cafés quentes disponíveis, incluindo seus detalhes.
 *    parameters:
 *      - in: query
 *        name: id
 *        schema:
 *          type: string
 *        description: O ID do café a ser retornado (filtro opcional).
 *        required: false
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
 *                    type: integer
 *                    format: int64
 *                    description: ID único do café. Gerado automaticamente pelo sistema.
 *                    readOnly: true
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
 *  post:
 *    tags:
 *      - Bebidas Quentes
 *    summary: Cadastra um novo café quente.
 *    description: Este endpoint permite adicionar um novo café quente ao sistema.
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
 *                example: "Capuccino"
 *              content:
 *                type: string
 *                example: "Café com leite vaporizado e espuma cremosa."
 *              amount:
 *                type: number
 *                format: float
 *                example: 6.5
 *              image:
 *                type: string
 *                format: url
 *                example: "http://localhost:3000/hot_coffees/capuccino.png"
 *    responses:
 *      201:
 *        description: Café quente cadastrado com sucesso.
 *      400:
 *        description: Requisição inválida. Campos obrigatórios ausentes ou mal formatados.
 *
 *  put:
 *    tags:
 *      - Bebidas Quentes
 *    summary: Atualiza um café quente existente.
 *    description: Este endpoint atualiza os dados de um café quente com base no ID fornecido.
 *    parameters:
 *      - in: query
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID do café a ser atualizado.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                example: "Café com Leite"
 *              content:
 *                type: string
 *                example: "Café com leite vaporizado."
 *              amount:
 *                type: number
 *                format: float
 *                example: 6.0
 *              image:
 *                type: string
 *                format: url
 *                example: "http://localhost:3000/hot_coffees/cafe%20com%20leite.png"
 *    responses:
 *      200:
 *        description: Café quente atualizado com sucesso.
 *      404:
 *        description: Café não encontrado.
 *      400:
 *        description: Requisição inválida.
 *
 *  delete:
 *    tags:
 *      - Bebidas Quentes
 *    summary: Remove um café quente pelo ID.
 *    description: Este endpoint remove um café quente específico com base no ID fornecido.
 *    parameters:
 *      - in: query
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID do café a ser removido.
 *    responses:
 *      200:
 *        description: Café quente removido com sucesso.
 *      404:
 *        description: Café não encontrado.
 */
let mockHotDrinks = [ 
  { id: "1", title: "Café Expresso", content: "Café forte e concentrado", amount: 8.00, image: "", category_id: 4 },
  { id: "2", title: "Chá de Hortelã", content: "Chá calmante e aromático", amount: 7.50, image: "", category_id: 4 },
  { id: "3", title: "Chocolate Quente", content: "Bebida cremosa de chocolate", amount: 10.00, image: "", category_id: 4 },
];
let nextId = 4; 

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const { id } = req.query;
      if (id) {
        const item = mockHotDrinks.find(i => i.id === id); 
        if (item) {
          return res.status(200).json(item);
        } else {
          return res.status(404).json({ message: 'Bebida quente não encontrada' }); 
        }
      }
      return res.status(200).json(mockHotDrinks); 

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
          category_id: category_id || 4,
        };
        mockHotDrinks.push(newItem);

        return res.status(201).json(newItem);

      } catch (error) {
        console.error('Erro ao adicionar bebida quente:', error);
        return res.status(500).json({ message: 'Erro interno do servidor ao adicionar bebida quente.', error: error.message }); // Mensagem atualizada
      }

    case 'PUT':
      try {
        const { id } = req.query;
        const { title, content, amount, image, category_id } = req.body;

        let itemIndex = mockHotDrinks.findIndex(i => i.id === id); 

        if (itemIndex === -1) {
          return res.status(404).json({ message: 'Bebida quente não encontrada para atualização.' });         
        }
        mockHotDrinks[itemIndex] = { 
          ...mockHotDrinks[itemIndex],
          title: title || mockHotDrinks[itemIndex].title,
          content: content || mockHotDrinks[itemIndex].content,
          amount: parseFloat(amount) || mockHotDrinks[itemIndex].amount,
          image: image || mockHotDrinks[itemIndex].image,
          category_id: category_id || mockHotDrinks[itemIndex].category_id,
        };

        return res.status(200).json(mockHotDrinks[itemIndex]); 

      } catch (error) {
        console.error('Erro ao atualizar bebida quente:', error); 
        return res.status(500).json({ message: 'Erro interno do servidor ao atualizar bebida quente.', error: error.message }); // Mensagem atualizada
      }

    case 'DELETE':
      try {
        const { id } = req.query;
        const initialLength = mockHotDrinks.length; 
        mockHotDrinks = mockHotDrinks.filter(i => i.id !== id); 

        if (mockHotDrinks.length === initialLength) {
          return res.status(404).json({ message: 'Bebida quente não encontrada para exclusão.' });
        }

        return res.status(200).json({ message: 'Bebida quente excluída com sucesso.' }); 

      } catch (error) {
        console.error('Erro ao excluir bebida quente:', error); 
        return res.status(500).json({ message: 'Erro interno do servidor ao excluir bebida quente.', error: error.message }); // Mensagem atualizada
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}