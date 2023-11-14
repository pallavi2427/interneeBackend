import { Model, DataTypes } from "sequelize";
import sequelize from "./db.sequlize";
import { CoursesModel } from "./course.model";

export class StudentModel extends Model {
  id: bigint;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  contact_number?: string;
  current_city?: string;
  gender?: string;
  language?: string;
  type?: string;
  course?: string;
  college_name?: string;
  stream?: string;
  start_year?: string;
  end_year?: string;
  area_of_interest?: string;
  currently_looking_for?: string;
  work_mode?: string;
  attach_resume?: string;
  password_token: number;
  password_token_expiration_date: Date;
  CoursesModel: any;
}

// 1: The model schema.
StudentModel.init(
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
    password: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "password",
    },
    contact_number: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: "contact_number",
    },
    current_city: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "current_city",
    },
    gender: {
      type: DataTypes.ENUM,
      allowNull: true,
      values: ["male", "female", "other"],
      field: "gender",
    },
    language: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: "language",
    },
    type: {
      type: DataTypes.ENUM,
      values: ["college_student", "Fresher", "school_student"],
      allowNull: true,
      field: "type",
    },
    course: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "course",
    },
    college_name: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: "college_name",
    },
    stream: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "stream",
    },
    start_year: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "start_year",
    },
    end_year: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "end_year",
    },
    area_of_interest: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "area_of_interest",
    },
    currently_looking_for: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "currently_looking_for",
    },
    work_mode: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "work_mode",
    },
    attach_resume: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "attach_resume",
    },
    verification_token: DataTypes.STRING,
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: "0",
    },
    password_token: DataTypes.STRING,
    password_token_expiration_date: DataTypes.DATE,
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: "students",
  }
);
// StudentModel.hasMany(CoursesModel, {
//   foreignKey: "course_id",
//   as: "courseDetail",
// });
