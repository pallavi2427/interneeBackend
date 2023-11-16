"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_sequlize_1 = __importDefault(require("./models/db.sequlize"));
const routes = __importStar(require("./router/index"));
const multer_1 = require("./utils/multer");
require("dotenv").config();
const PORT = 8080;
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        routes.initRoutes(this.app);
        // Sync the Sequelize models with the database
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
        this.app.use((0, cors_1.default)({
            optionsSuccessStatus: 200,
        }));
        this.app.use(express_1.default.json());
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
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