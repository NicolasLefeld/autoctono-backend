import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class SaleStatus extends Model {
  public id!: number;
  public name!: string;
  public code!: string;
  public description!: string | null;
}

SaleStatus.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "SaleStatus",
  }
);

export enum SaleStatusEnum {
  PENDING = "pending",
  IN_PROCESS = "in_process",
  COMPLETED = "completed",
}

export default SaleStatus;
