"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampusModel = void 0;
const sequelize_1 = require("sequelize");
const db_sequlize_1 = require("./db.sequlize");
class CampusModel extends sequelize_1.Model {
}
exports.CampusModel = CampusModel;
CampusModel.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "id",
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
    email: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
        field: "email",
        unique: true,
    },
    contact_number: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
        field: "contact_number",
    },
    designation: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        field: "designation",
    },
    inquiry_for: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        field: "inquiry_for",
    },
    message: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
        field: "message",
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        field: "date",
    },
}, {
    sequelize: db_sequlize_1.default,
    paranoid: false,
    freezeTableName: true,
    modelName: "campus",
});
//# sourceMappingURL=campus.model.js.map