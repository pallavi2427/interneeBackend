require("dotenv").config();

const dbConfig = {
  host: process.env.HOST,
  password: process.env.PASSWORD,
  dialect: process.env.DIALECT,
  database: process.env.DB,
  username: process.env.USER,
  port: process.env.PORT,
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default dbConfig;
