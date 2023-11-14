import { Model, DataTypes } from "sequelize";
import sequelize from "./db.sequlize";
import { StudentModel } from "./student.model";

export class CoursestdModel extends Model {
  course_id: bigint;
  student_id: bigint;
  isApplied: any;
}

// 1: The model schema.
CoursestdModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    course_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "course_id",
      references:{
        model: "course",
        key: 'id'
      }
    },
    student_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "student_id",
      references:{
        model: "students",
        key: 'id'
      }
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
    modelName: "coursestd",
  }
);
// CoursestdModel.hasMany(StudentModel, { foreignKey: "id", as: "courseDetail" });
