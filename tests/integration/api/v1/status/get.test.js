// test.only will skip all other tests on this file, and only run the current test
test("GET to /api/v1/status should return 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status")
    expect(response.status).toBe(200)

    const responseBody = await response.json();

    expect(responseBody.updated_at).toBeDefined();
    expect(responseBody.dependencies.database.postgres_version).toBeDefined();
    expect(responseBody.dependencies.database.opened_connections).toBeDefined();
    expect(responseBody.dependencies.database.max_connections).toBeDefined();

    expect(responseBody).toHaveProperty("dependencies");
    expect(responseBody.dependencies).toHaveProperty("database");
    expect(responseBody.dependencies.database).toHaveProperty("max_connections");
    expect(responseBody.dependencies.database).toHaveProperty("opened_connections");
    expect(responseBody.dependencies.database).toHaveProperty("postgres_version");

    expect(responseBody.dependencies.database.postgres_version).toEqual("16.0");
    expect(responseBody.dependencies.database.max_connections).toEqual(100);
    expect(responseBody.dependencies.database.opened_connections).toEqual(1);

    const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
    expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
});

// test.only("GET to /api/v1/status should return 200", async () => {
//     // await fetch("http://localhost:3000/api/v1/status?databaseName=local_db")
//     // await fetch("http://localhost:3000/api/v1/status?databaseName=")
//     // await fetch("http://localhost:3000/api/v1/status?databaseName=';")
//     // await fetch("http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(4);")
//     await fetch("http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(4); --") // -- will make everything after that be recognized as a comment (in a query)
// });