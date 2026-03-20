import database from "../../../../infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const databaseVersion = await database.query("SELECT version();");
  const databaseValue = databaseVersion.rows[0].version;

  const databaseMaxConnections = await database.query("SHOW max_connections;");
  const databaseMaxConnectionsValue =
    databaseMaxConnections.rows[0].max_connections;

  // const databaseName = process.env.POSTGRES_DB;

  // const databaseOpenedConnections = await database.query({
  //   text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
  //   values: [databaseName],
  // });

  const databaseOpenedConnections = await database.query(
    "SELECT count(*)::int FROM pg_stat_activity WHERE datname = current_database();",
  );

  const databaseOpenedConnectionsValue =
    databaseOpenedConnections.rows[0].count;

  response.status(200).json({
    update_at: updateAt,
    dependecies: {
      database: {
        version: databaseValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        openned_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
