import database from "@/infra/database";

export default async function handler(req, res) {
  const data = await database.query("SHOW server_version");

  res.status(200).json(data);
}
