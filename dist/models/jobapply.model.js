"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobApplyModel = void 0;
const sequelize_1 = require("sequelize");
const db_sequlize_1 = __importDefault(require("./db.sequlize"));
class JobApplyModel extends sequelize_1.Model {
}
exports.JobApplyModel = JobApplyModel;
// 1: The model schema.
JobApplyModel.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "id",
    },
    job_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        field: "job_id",
    },
    student_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        field: "student_id",
    },
    isApplied: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: "0",
    },
}, {
    sequelize: db_sequlize_1.default,
    paranoid: true,
    freezeTableName: true,
    modelName: "jobapply",
});
//# sourceMappingURL=jobapply.model.js.map