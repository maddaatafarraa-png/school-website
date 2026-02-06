const { Client } = require("pg");

const connectionString =
  process.env.DATABASE_URL ||
  "postgres://username:password@localhost:5432/school_db";

const client = new Client({ connectionString });

client.connect();

module.exports = client;