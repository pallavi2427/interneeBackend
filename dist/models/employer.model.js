"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployerModel = void 0;
const sequelize_1 = require("sequelize");
const db_sequlize_1 = __importDefault(require("./db.sequlize"));
class EmployerModel extends sequelize_1.Model {
}
exports.EmployerModel = EmployerModel;
// 1: The model schema.
EmployerModel.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "id",
    },
    email: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
        field: "email",
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        field: "password",
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
        field: "first_name",
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
        field: "last_name",
    },
    contact_number: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
        field: "contact_number",
    },
    company_name: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
        field: "company_name",
    },
    industry: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
        field: "industry",
    },
    designation: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        field: "designation",
    },
    number_of_employees: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        field: "number_of_employees",
    },
    company_address: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        field: "company_address",
    },
    verification_token: sequelize_1.DataTypes.STRING,
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: "0",
    },
    // is_verified: DataTypes.DATE,
    password_token: sequelize_1.DataTypes.STRING,
    password_token_expiration_date: sequelize_1.DataTypes.DATE,
}, {
    sequelize: db_sequlize_1.default,
    paranoid: true,
    freezeTableName: true,
    modelName: "employer",
});
//# sourceMappingURL=employer.model.js.map