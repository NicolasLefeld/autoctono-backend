import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Customer from "./Customer";
import SaleStatus from "./SaleStatus";

const Sale = sequelize.define("Sale", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  detail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  customerId: {
    type: DataTypes.INTEGER,
    references: {
      model: Customer,
      key: "id",
    },
  },
  statusId: {
    type: DataTypes.INTEGER,
    references: {
      model: SaleStatus,
      key: "id",
    },
  },
});

export default Sale;
