"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternApplyModel = void 0;
const sequelize_1 = require("sequelize");
const db_sequlize_1 = require("./db.sequlize");
class InternApplyModel extends sequelize_1.Model {
}
exports.InternApplyModel = InternApplyModel;
InternApplyModel.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "id",
    },
    internship_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        field: "internship_id",
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
    modelName: "internapply",
});
//# sourceMappingURL=internapply.model..js.map