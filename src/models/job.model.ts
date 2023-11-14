import { Model, DataTypes } from "sequelize";
import sequelize from "./db.sequlize";

export class JobModel extends Model {
  id: bigint;
  company_name?: string;
  title?: string;
  location?: string;
  experience?: string;
  salary?: string;
  jobdesc?: string;
}

// 1: The model schema.
JobModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
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
    experience: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: "experience",
    },
    salary: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: "salary",
    },
    jobdesc: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "jobdesc",
    },
    postBy: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: "postBy",
    },
  },
  {
    sequelize,
    paranoid: false,
    freezeTableName: true,
    modelName: "job",
  }
);
