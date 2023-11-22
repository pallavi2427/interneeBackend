"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db_sequlize_1 = require("./models/db.sequlize");
const multer_1 = require("./utils/multer");
require("dotenv").config();
const PORT = 8080;
class App {
    constructor() {
        this.app = express();
        this.config();
        db_sequlize_1.default
            .sync()
            .then(() => {
            console.log("Database synced successfully.");
            this.startServer();
        })
            .catch((error) => {
            console.error("Error syncing database:", error);
        });
    }
    config() {
        this.app.use(cors({
            optionsSuccessStatus: 200,
        }));
        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(multer_1.uploadFile);
    }
    startServer() {
        this.app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=server.js.map