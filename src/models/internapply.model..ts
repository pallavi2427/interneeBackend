import { Model, DataTypes } from "sequelize";
import sequelize from "./db.sequlize";

export class InternApplyModel extends Model {
  internship_id: bigint;
  student_id: bigint;
  isApplied: any;
}
 
// 1: The model schema.
InternApplyModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    internship_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "internship_id",
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
    modelName: "internapply",
  }
);
