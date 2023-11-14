import { Model, DataTypes } from "sequelize";
import sequelize from "./db.sequlize";
import { StudentModel } from "./student.model";

export class JobApplyModel extends Model {
  job_id: bigint;
  student_id: bigint;
  isApplied: any;
}

// 1: The model schema.
JobApplyModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    job_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "job_id",
    },
    student_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "student_id",
    },
    isApplied: {
      type: DataTypes.BOOLEAN,
      defaultValue: "0",
    },
  },
  {
    sequelize,
    paranoid: true,
    freezeTableName: true,
    modelName: "jobapply",
  }
);
