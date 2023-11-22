import { Model, DataTypes } from "sequelize";
import sequelize from "./db.sequlize";

export class InternshipModel extends Model {
  id: bigint;
  company_name?: string;
  title?: string;
  location?: string;
  duration?: string;
  stipend_mode?: string;
}

// 1: The model schema.
InternshipModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    emp_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "emp_id",
    },
    admin_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "admin_id",
    },

    company_name: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: "company_name",
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: "title",
    },
    location: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: "location",
    },
    duration: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: "duration",
    },
    stipend_mode: {
      type: DataTypes.ENUM,
      allowNull: true,
      values: ["paid", "unpaid"],
      field: "stipend_mode",
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "amount",
    },
    postBy: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: "postBy",
    },
  },
  {
    sequelize,
    paranoid: true,
    freezeTableName: true,
    modelName: "internship",
  }
);
