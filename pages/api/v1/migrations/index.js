import migrationRunner from "node-pg-migrate";

export default async function migrations(request, response) {
  if (request.method === "GET") {
    console.log("Entrou no GET");
    const migrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    });
    return response.status(200).json(migrations);
  }

  if (request.method === "POST") {
    console.log("Entrou no POST");
    const migrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dryRun: false,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    });
    return response.status(200).json(migrations);
  }

  // const migrations = await migrationRunner({
  //   databaseUrl: process.env.DATABASE_URL,
  //   dryRun: true,
  //   dir: join("infra", "migrations"),
  //   direction: "up",
  //   verbose: true,
  //   migrationsTable: "pgmigrations",
  // });
  // response.status(200).json(migrations);
}
