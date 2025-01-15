import database from "infra/database.js";

export default async function status(req, res) {
    const updatedAt = new Date().toISOString();
    process.env.API_KEY = 12345;

    const databaseVersionResult = await database.query("SHOW server_version;");
    const databaseVersionValue = databaseVersionResult.rows[0].server_version;

    const databaseMaxConnectionsResult = await database.query(
        "SHOW max_connections;",
    );
    const databaseMaxConnectionsValue =
        databaseMaxConnectionsResult.rows[0].max_connections;

    const databaseName = process.env.POSTGRES_DB;

    const databaseOpenedConnectionsResult = await database.query({
        text: "SELECT count(*)::int from pg_stat_activity WHERE datname = $1;",
        values: [databaseName],
    });
    const databaseOpenedConnectionsValue =
        databaseOpenedConnectionsResult.rows[0].count;

    return res.status(200).json({
        updated_at: updatedAt,
        dependencies: {
            database: {
                postgres_version: databaseVersionValue,
                max_connections: parseInt(databaseMaxConnectionsValue),
                opened_connections: databaseOpenedConnectionsValue,
            },
        },
    });
}

// Return: Postgres version, maximum number of connections, connections being used
// const result = await database.query("SELECT 1 + 1 as sum;");
