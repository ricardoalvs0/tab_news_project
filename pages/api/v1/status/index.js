import database from '../../../../infra/database.js'

export default async function status(req, res) {
    const result = await database.query("SELECT 1 + 1 as sum;");
    console.log(result.rows);
    return res.status(200).json({key: "Teste de response"});
}
