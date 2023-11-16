"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql2");
const db_config_1 = require("../config/db.config");
require("dotenv").config();
const connection = mysql.createConnection({
    host: db_config_1.default.host,
    user: db_config_1.default.username,
    password: db_config_1.default.password,
    database: db_config_1.default.database,
});
connection.connect((error) => {
    if (error)
        throw error;
    console.log("Successfully connected to the database.");
});
module.exports = connection;
//# sourceMappingURL=db.js.map