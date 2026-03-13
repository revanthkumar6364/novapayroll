const { Client } = require('pg');
const client = new Client({
  connectionString: "postgresql://postgres:root@localhost:5432/novapayroll?schema=public",
});

async function main() {
  await client.connect();
  const res = await client.query('SELECT email FROM public."User" LIMIT 10');
  console.log(res.rows);
  await client.end();
}

main().catch(console.error);
