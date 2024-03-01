require('dotenv').config();
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME_DEVELOPMENT, DB_NAME_TEST, DB_NAME_PRODUCTION } = process.env;

module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME_DEVELOPMENT,
    "host": DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME_TEST,
    "host": DB_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME_PRODUCTION,
    "host": DB_HOST,
    "dialect": "mysql"
  }
}
