import database from "@/infra/database";

export default async function handler(req, res) {
  try {
    const result = await database.query("SHOW server_version");
    res.status(200).json({ version: result.rows[0].server_version });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar a versão do servidor' });
  }
}
