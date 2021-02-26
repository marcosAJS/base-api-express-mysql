require('dotenv').config();

console.log('DB_HOST      > ', process.env.DB_HOST);
console.log('DB_USERNAME  > ', process.env.DB_USERNAME);
console.log('DB_DATABASE  > ', process.env.DB_DATABASE);
console.log('DB_PASSWORD  > ', process.env.DB_PASSWORD);

module.exports = {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  logging: console.log,
  define: {
    timestamps: true,
    underscored: false,
    underscoredAll: false,
  },
  dialectOptions: {
    dateStrings: true,
    typeCast: true
  },
};