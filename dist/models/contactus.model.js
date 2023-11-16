"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsModel = void 0;
const sequelize_1 = require("sequelize");
const db_sequlize_1 = require("./db.sequlize");
class ContactUsModel extends sequelize_1.Model {
}
exports.ContactUsModel = ContactUsModel;
ContactUsModel.init({
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
    comment: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
        field: "comment",
    },
}, {
    sequelize: db_sequlize_1.default,
    paranoid: false,
    freezeTableName: true,
    modelName: "contactus",
});
//# sourceMappingURL=contactus.model.js.map