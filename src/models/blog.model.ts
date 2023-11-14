import { Model, DataTypes } from "sequelize";
import sequelize from "./db.sequlize";

export class BlogModel extends Model {
  id: bigint;
  title?: string;
  content?: string;
  image?: string;
}

// 1: The model schema.
BlogModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },

    title: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: "title",
    },
    content: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: "content",
    },
    image: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "image",
    },
  },
  {
    sequelize,
    paranoid: true,
    freezeTableName: true,
    modelName: "blog",
  }
);
