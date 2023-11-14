import { Model, DataTypes } from "sequelize";
import sequelize from "./db.sequlize";

export class ContactUsModel extends Model {
  id: bigint;
  first_name?: string;
  last_name?: string;
  email?: string;
  contact_number?: string;
  comment?: string;
}
ContactUsModel.init(
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
    comment: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: "comment",
    },
  },
  {
    sequelize,
    paranoid: false,
    freezeTableName: true,
    modelName: "contactus",
  }
);
