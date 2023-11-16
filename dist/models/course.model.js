"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesModel = void 0;
const sequelize_1 = require("sequelize");
const db_sequlize_1 = require("./db.sequlize");
class CoursesModel extends sequelize_1.Model {
}
exports.CoursesModel = CoursesModel;
CoursesModel.init({
    course_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "course_id",
    },
    title: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
        field: "title",
        unique: true,
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
    course_mode: {
        type: sequelize_1.DataTypes.ENUM,
        allowNull: true,
        values: ["online", "offline"],
        field: "course_mode",
    },
}, {
    sequelize: db_sequlize_1.default,
    paranoid: true,
    freezeTableName: true,
    modelName: "course",
});
//# sourceMappingURL=course.model.js.map