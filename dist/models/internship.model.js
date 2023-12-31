"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternshipModel = void 0;
const sequelize_1 = require("sequelize");
const db_sequlize_1 = require("./db.sequlize");
class InternshipModel extends sequelize_1.Model {
}
exports.InternshipModel = InternshipModel;
InternshipModel.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "id",
    },
    emp_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true,
        field: "emp_id",
    },
    admin_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true,
        field: "admin_id",
    },
    company_name: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
        field: "company_name",
    },
    title: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
        field: "title",
    },
    location: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
        field: "location",
    },
    duration: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
        field: "duration",
    },
    stipend_mode: {
        type: sequelize_1.DataTypes.ENUM,
        allowNull: true,
        values: ["paid", "unpaid"],
        field: "stipend_mode",
    },
    amount: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        field: "amount",
    },
    postBy: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
        field: "postBy",
    },
}, {
    sequelize: db_sequlize_1.default,
    paranoid: true,
    freezeTableName: true,
    modelName: "internship",
});
//# sourceMappingURL=internship.model.js.map