import database from "@/infra/database";

async function getAllProductsByCategory(categoryId) {
  try {
    console.log('models/products.js: Chamando database.query para categoryId:', categoryId);

    const productsArray = await database.query(
      "SELECT p.title, p.content, p.amount, p.image FROM products p WHERE p.category_id = $1;",
      [categoryId]
    );
    
    console.log('models/products.js: Resposta de database.query (já é o array de produtos):', productsArray);

    return productsArray; 
  } catch (error) {
    console.error("models/products.js: Erro DENTRO de getAllProductsByCategory:", error);
    return []; 
  }
}

async function createProduct(productData) {
  const { title, content, amount, image, category } = productData;

  if (!title || !content || !amount || !image || !category) {
    throw new Error("Dados do produto incompletos para inserção no banco de dados.");
  }

  try {
    const createdRows = await database.query( 
      `
      INSERT INTO products (title, content, amount, image, category_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, title, content, amount, image, category_id;
      `,
      [title, content, amount, image, category]
    );

    return createdRows[0]; 
  } catch (error) {
    console.error("Erro ao inserir produto no banco de dados:", error);
    throw new Error("Não foi possível criar o produto devido a um erro no banco de dados.");
  }
}

export default {
  getAllProductsByCategory,
  createProduct,
};