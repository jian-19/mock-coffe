import database from "@/infra/database";

async function getAllProductsByCategory(categoryId) {
  return await database.query(
    "SELECT p.title, p.content, p.amount, p.image FROM products p WHERE p.categoryid = $1;",
    [categoryId]
  );
}

export default {
  getAllProductsByCategory,
};
