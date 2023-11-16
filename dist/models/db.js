"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const db_config_1 = __importDefault(require("../config/db.config"));
// Hook up the HTTP logger.
require("dotenv").config();
// Create a connection to the database
const connection = mysql2_1.default.createConnection({
    host: db_config_1.default.host,
    user: db_config_1.default.username,
    password: db_config_1.default.password,
    database: db_config_1.default.database,
});
// open the MySQL connection
connection.connect((error) => {
    if (error)
        throw error;
    console.log("Successfully connected to the database.");
});
module.exports = connection;
//# sourceMappingURL=db.js.map