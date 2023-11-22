"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const dbConfig = {
    host: process.env.HOST,
    password: process.env.PASSWORD,
    dialect: process.env.DIALECT,
    database: process.env.DB,
    username: process.env.USER,
    port: process.env.DB_PORT,
    logging: console.log,
    pool: {
        max: 5,
        acquire: 60000,
        idle: 10000,
    },
};
exports.default = dbConfig;
//# sourceMappingURL=db.config.js.map