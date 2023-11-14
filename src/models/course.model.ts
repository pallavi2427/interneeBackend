import { Model, DataTypes } from "sequelize";
import sequelize from "./db.sequlize";
import { StudentModel } from "./student.model";

export class CoursesModel extends Model {
  course_id: bigint;
  title?: string;
  location?: string;
  duration?: string;
  course_mode?: string;
}

// 1: The model schema.
CoursesModel.init(
  {
    course_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: "course_id",
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: "title",
      unique: true,
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
    course_mode: {
      type: DataTypes.ENUM,
      allowNull: true,
      values: ["online", "offline"],
      field: "course_mode",
    },
  },
  {
    sequelize,
    paranoid: true,
    freezeTableName: true,
    modelName: "course",
  }
);
