import { Client } from "pg";

async function query(queryObject) {
  let client; // 1. Declare here so it's available everywhere in the function

  try {
    client = await getNewClient(); // 2. Assign the value
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (client) {
      // 3. Now 'client' is recognized here!
      await client.end();
    }
  }
}
async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: true,
  });

  await client.connect();
  return client;
}

export default {
  query,
  getNewClient,
};
