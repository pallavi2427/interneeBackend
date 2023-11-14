import { Model, DataTypes } from "sequelize";
import sequelize from "./db.sequlize";

export class EmployerModel extends Model {
  id: bigint;
  email?: string;
  password?: string;
  first_name: string;
  last_name?: string;
  contact_number?: string;
  company_name?: string;
  industry?: string;
  designation?: string;
  number_of_employees?: string;
  company_address?: string;
  password_token: number;
  password_token_expiration_date: Date;
  verification_token: any;
  isVerified: boolean;
}

// 1: The model schema.
EmployerModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
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
    contact_number: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: "contact_number",
    },
    company_name: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: "company_name",
    },
    industry: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: "industry",
    },
    designation: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "designation",
    },
    number_of_employees: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "number_of_employees",
    },

    company_address: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "company_address",
    },

    verification_token: DataTypes.STRING,
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: "0",
    },
    // is_verified: DataTypes.DATE,
    password_token: DataTypes.STRING,
    password_token_expiration_date: DataTypes.DATE,
  },
  {
    sequelize,
    paranoid: true,
    freezeTableName: true,
    modelName: "employer",
  }
);
