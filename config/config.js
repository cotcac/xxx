require('dotenv').config();// you need this for sequlize cli
module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./data/development.sqlite3"
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:"
  },
  production: {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT
  }
};