"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursestdModel = void 0;
const sequelize_1 = require("sequelize");
const db_sequlize_1 = require("./db.sequlize");
class CoursestdModel extends sequelize_1.Model {
}
exports.CoursestdModel = CoursestdModel;
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
//# sourceMappingURL=coursestd.model.js.map