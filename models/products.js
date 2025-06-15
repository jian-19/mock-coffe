import database from "@/infra/database";

async function getAllProductsByCategory(categoryId) {
  const response = await database.query(
    "SELECT p.title, p.content, p.amount, p.image FROM products p WHERE p.category_id = $1;",
    [categoryId]
  );
  
  return response
}

export default {
  getAllProductsByCategory,
};
