const { Pool } = require("pg");

const pool = new Pool({
  host: "postgres",
  port: 5432,
  user: "career_user",
  password: "career_password",
  database: "careertrack_db",
});

module.exports = pool;
