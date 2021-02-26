require('dotenv').config();

// console.log('DB_HOST      > ', process.env.DB_HOST);
// console.log('DB_USERNAME  > ', process.env.DB_USERNAME);
// console.log('DB_DATABASE  > ', process.env.DB_DATABASE);
// console.log('DB_PASSWORD  > ', process.env.DB_PASSWORD);

export const DB_URL: string = `mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?charset=UTF8`

export const configDB = {
  dialectOptions: {
    charset: "utf8",
    dateStrings: true,
    typeCast: function (field, next) { // for reading from database
      if (field.type === 'DATETIME') {
        return field.string()
      }
      return next()
    },
  },
  define: {
    underscored: true,
    timestamps: false,
  },
  logging: console.log,
  pool: {
    max: 1000,
    min: 0,
    idle: 200000,
    acquire: 1000000,
  }
}
