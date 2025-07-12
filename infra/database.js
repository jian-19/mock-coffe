import { Client } from "pg";

async function getNewClient() {
  console.log('infra/database.js: Tentando criar novo cliente PG...');
  const pgClient = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  });

  try {
    console.log('infra/database.js: Conectando ao banco de dados...');
    await pgClient.connect(); 
    console.log('infra/database.js: Conexão bem-sucedida!');
    return pgClient;
  } catch (connectError) {
    console.error('infra/database.js: ERRO AO CONECTAR AO BANCO DE DADOS:', connectError.message, connectError.stack);

    if (pgClient) {
      await pgClient.end();
    }
    throw connectError;
  }
}

async function query(queryText, params = []) {
  let client = null; 
  try {
    client = await getNewClient(); 
    console.log('infra/database.js: Executando query:', queryText, 'com params:', params);
    const result = await client.query(queryText, params);
    console.log('infra/database.js: Resultado bruto da query:', result);
    
    if (result && result.rows) { 
        console.log('infra/database.js: Retornando result.rows.');
        return result.rows; 
    } else {
        console.error('infra/database.js: Resultado da query não tem propriedade .rows ou é nulo:', result);
        return [];
    }
    
  } catch (error) {
    console.error("infra/database.js: Erro na função query:", error.message, error.stack);
    throw error; 
  } finally {
    if (client) {
      console.log('infra/database.js: Fechando conexão do cliente.');
      await client.end();
    }
  }
}

const database = {
  getNewClient,
  query,
};

export default database;