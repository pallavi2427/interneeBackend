"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursestdModel = void 0;
const sequelize_1 = require("sequelize");
const db_sequlize_1 = __importDefault(require("./db.sequlize"));
class CoursestdModel extends sequelize_1.Model {
}
exports.CoursestdModel = CoursestdModel;
// 1: The model schema.
CoursestdModel.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "id",
    },
    course_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        field: "course_id",
        references: {
            model: "course",
            key: 'id'
        }
    },
    student_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        field: "student_id",
        references: {
            model: "students",
            key: 'id'
        }
    },
    isApplied: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: "0",
    },
}, {
    sequelize: db_sequlize_1.default,
    paranoid: true,
    freezeTableName: true,
    modelName: "coursestd",
});
// CoursestdModel.hasMany(StudentModel, { foreignKey: "id", as: "courseDetail" });
//# sourceMappingURL=coursestd.model.js.map