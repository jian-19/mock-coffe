import database from "@/infra/database";

async function getAllProductsByCategory(categoryId) {
  try {
    console.log('models/products.js: Chamando database.query para categoryId:', categoryId);

    const productsArray = await database.query(
      "SELECT p.id, p.title, p.content, p.amount, p.image, p.category_id FROM products p WHERE p.category_id = $1;",
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

async function updateProduct(productId, productData) {
  const { title, content, amount, image, category } = productData;

  if (!productId) {
    throw new Error("ID do produto não fornecido para atualização.");
  }

  if (!title && !content && !amount && !image && !category) {
    throw new Error("Nenhum dado de produto fornecido para atualização.");
  }

  const fieldsToUpdate = [];
  const queryParams = [productId];
  let paramIndex = 2;

  if (title !== undefined) {
    fieldsToUpdate.push(`title = $${paramIndex++}`);
    queryParams.push(title);
  }
  if (content !== undefined) {
    fieldsToUpdate.push(`content = $${paramIndex++}`);
    queryParams.push(content);
  }
  if (amount !== undefined) {
    fieldsToUpdate.push(`amount = $${paramIndex++}`);
    queryParams.push(amount);
  }
  if (image !== undefined) {
    fieldsToUpdate.push(`image = $${paramIndex++}`);
    queryParams.push(image);
  }
  if (category !== undefined) {
    fieldsToUpdate.push(`category_id = $${paramIndex++}`);
    queryParams.push(category);
  }

  if (fieldsToUpdate.length === 0) {
    throw new Error("Nenhum campo válido para atualização foi fornecido.");
  }

  try {
    const updatedRows = await database.query(
      `
      UPDATE products
      SET ${fieldsToUpdate.join(', ')}
      WHERE id = $1
      RETURNING id, title, content, amount, image, category_id;
      `,
      queryParams
    );

    if (updatedRows.length === 0) {
      return null; 
    }
    return updatedRows[0];
  } catch (error) {
    console.error("Erro ao atualizar produto no banco de dados:", error);
    throw new Error("Não foi possível atualizar o produto devido a um erro no banco de dados.");
  }
}

async function deleteProduct(productId) {
  if (!productId) {
    throw new Error("ID do produto não fornecido para exclusão.");
  }

  try {
    const deletedRows = await database.query(
      "DELETE FROM products WHERE id = $1 RETURNING id;",
      [productId]
    );

    if (deletedRows.length === 0) {
      return null; 
    }
    return deletedRows[0]; 
  } catch (error) {
    console.error("Erro ao excluir produto do banco de dados:", error);
    throw new Error("Não foi possível excluir o produto devido a um erro no banco de dados.");
  }
}

async function getProductById(productId) {
  try {
    console.log('models/products.js: Chamando database.query para productId:', productId);

    const productArray = await database.query(
      "SELECT p.id, p.title, p.content, p.amount, p.image, p.category_id FROM products p WHERE p.id = $1;",
      [productId]
    );

    return productArray[0] || null; 
  } catch (error) {
    console.error("models/products.js: Erro DENTRO de getProductById:", error);
    throw new Error("Não foi possível buscar o produto devido a um erro no banco de dados.");
  }
}

export default {
  getAllProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
};