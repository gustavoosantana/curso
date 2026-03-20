import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();
  try {
    const result = await client.query(queryObject);
    return result; // O valor é retornado aqui
  } catch (error) {
    console.error(error);
    throw error; // É CRUCIAL relançar o erro para quem chamou a função saber que falhou
  } finally {
    await client.end(); // A conexão fecha DEPOIS do return ou do catch
  }
}

export default {
  query: query,
};
