import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Customer from "./Customer";
import SaleStatus from "./SaleStatus";
import { SaleStatusEnum } from "./SaleStatus";

interface SaleAttributes {
  id: number;
  customerId: number;
  statusId: number;
  detail: string;
  total: number;
}

interface SaleCreationAttributes extends Optional<SaleAttributes, "id"> {}

export interface SaleInstance
  extends Model<SaleAttributes, SaleCreationAttributes>,
    SaleAttributes {}

class Sale extends Model<SaleAttributes, SaleCreationAttributes> {
  public id!: number;
  public detail!: string;
  public total!: number;
  public customerId!: number;
  public statusId!: number;

  public static associate() {
    Sale.belongsTo(Customer, {
      foreignKey: "customerId",
      as: "customer",
    });
    Sale.belongsTo(SaleStatus, {
      foreignKey: "statusId",
      as: "status",
    });
  }
}

Sale.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Sale",
  }
);

export default Sale;
