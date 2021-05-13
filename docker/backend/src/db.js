const fs = require("fs");
const knex = require("knex");

const readFileSync = filename => fs.readFileSync(filename).toString("utf8");

const database = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DATABASE_HOST || "localhost",
    port: process.env.DATABASE_PORT || 3306,
    user: process.env.DATABASE_USER || "root",
    password: "db_password",
    database: process.env.DATABASE_DB || "blog_db"
  }
})

module.exports = database;
