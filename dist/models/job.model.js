"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModel = void 0;
const sequelize_1 = require("sequelize");
const db_sequlize_1 = __importDefault(require("./db.sequlize"));
class JobModel extends sequelize_1.Model {
}
exports.JobModel = JobModel;
// 1: The model schema.
JobModel.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "id",
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
    experience: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
        field: "experience",
    },
    salary: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
        field: "salary",
    },
    jobdesc: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
        field: "jobdesc",
    },
    postBy: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
        field: "postBy",
    },
}, {
    sequelize: db_sequlize_1.default,
    paranoid: false,
    freezeTableName: true,
    modelName: "job",
});
//# sourceMappingURL=job.model.js.map