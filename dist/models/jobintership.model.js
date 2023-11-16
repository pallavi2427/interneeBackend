"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobinternshipModel = void 0;
const sequelize_1 = require("sequelize");
const db_sequlize_1 = require("./db.sequlize");
class JobinternshipModel extends sequelize_1.Model {
}
exports.JobinternshipModel = JobinternshipModel;
JobinternshipModel.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "id",
    },
    student_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        field: "student_id",
    },
    job_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true,
        field: "job_id",
    },
    internship_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true,
        field: "internship_id",
    },
    type: {
        type: sequelize_1.DataTypes.ENUM,
        values: ["internship,job"],
        allowNull: false,
        field: "type",
    },
    isApplied: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: "0",
    },
}, {
    sequelize: db_sequlize_1.default,
    paranoid: false,
    freezeTableName: true,
    modelName: "jobinternship",
});
//# sourceMappingURL=jobintership.model.js.map