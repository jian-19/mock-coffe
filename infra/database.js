import { Client } from "pg";

async function getNewClient() {
  const pgClient = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    ssl: process.env.NODE_ENV === "production",
  });

  pgClient.connect();
  return pgClient;
}

async function query(query, params = []) {
  let client;

  try {
    client = await getNewClient();
    const result = await client.query(query, params);
    return result.rows.length > 1 ? result.rows : result.rows[0];
  } finally {
    await client.end();
  }
}

const database = {
  getNewClient,
  query,
};

export default database;
