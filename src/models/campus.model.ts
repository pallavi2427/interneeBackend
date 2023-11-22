import { Model, DataTypes } from "sequelize";
import sequelize from "./db.sequlize";

export class CampusModel extends Model {
  id: bigint;
  first_name?: string;
  last_name?: string;
  email?: string;
  contact_number?: string;
  designation?: string;
  inquiry_for?: string;
  message?: string;
  date?: Date;
}
CampusModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: "first_name",
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: "last_name",
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: "email",
      unique: true,
    },
    contact_number: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: "contact_number",
    },
    designation: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "designation",
    },
    inquiry_for: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "inquiry_for",
    },
    message: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "message",
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "date",
    },
  },
  {
    sequelize,
    paranoid: false,
    freezeTableName: true,
    modelName: "campus",
  }
);
