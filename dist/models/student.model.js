"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const sequelize_1 = require("sequelize");
const db_sequlize_1 = __importDefault(require("./db.sequlize"));
class StudentModel extends sequelize_1.Model {
}
exports.StudentModel = StudentModel;
// 1: The model schema.
StudentModel.init({
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
    password: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        field: "password",
    },
    contact_number: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
        field: "contact_number",
    },
    current_city: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        field: "current_city",
    },
    gender: {
        type: sequelize_1.DataTypes.ENUM,
        allowNull: true,
        values: ["male", "female", "other"],
        field: "gender",
    },
    language: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
        field: "language",
    },
    type: {
        type: sequelize_1.DataTypes.ENUM,
        values: ["college_student", "Fresher", "school_student"],
        allowNull: true,
        field: "type",
    },
    course: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        field: "course",
    },
    college_name: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
        field: "college_name",
    },
    stream: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        field: "stream",
    },
    start_year: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        field: "start_year",
    },
    end_year: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        field: "end_year",
    },
    area_of_interest: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        field: "area_of_interest",
    },
    currently_looking_for: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        field: "currently_looking_for",
    },
    work_mode: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        field: "work_mode",
    },
    attach_resume: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        field: "attach_resume",
    },
    verification_token: sequelize_1.DataTypes.STRING,
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: "0",
    },
    password_token: sequelize_1.DataTypes.STRING,
    password_token_expiration_date: sequelize_1.DataTypes.DATE,
}, {
    sequelize: db_sequlize_1.default,
    freezeTableName: true,
    modelName: "students",
});
// StudentModel.hasMany(CoursesModel, {
//   foreignKey: "course_id",
//   as: "courseDetail",
// });
//# sourceMappingURL=student.model.js.map