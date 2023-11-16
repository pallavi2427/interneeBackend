"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModel = void 0;
const sequelize_1 = require("sequelize");
const db_sequlize_1 = require("./db.sequlize");
class BlogModel extends sequelize_1.Model {
}
exports.BlogModel = BlogModel;
BlogModel.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "id",
    },
    title: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
        field: "title",
    },
    content: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
        field: "content",
    },
    image: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        field: "image",
    },
}, {
    sequelize: db_sequlize_1.default,
    paranoid: true,
    freezeTableName: true,
    modelName: "blog",
});
//# sourceMappingURL=blog.model.js.map