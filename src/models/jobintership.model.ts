import { Model, DataTypes } from "sequelize";
import sequelize from "./db.sequlize";

export class JobinternshipModel extends Model {
  student_id?: bigint;
  job_id?: bigint;
  internship_id?: bigint;
  type?: string;
  isApplied: any;
}

// 1: The model schema.
JobinternshipModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    student_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "student_id",
    },
    job_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "job_id",
    },
    internship_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "internship_id",
    },
    type: {
      type: DataTypes.ENUM,
      values: ["internship,job"],
      allowNull: false,
      field: "type",
    },
    isApplied: {
      type: DataTypes.BOOLEAN,
      defaultValue: "0",
    },
  },
  {
    sequelize,
    paranoid: false,
    freezeTableName: true,
    modelName: "jobinternship",
  }
);
