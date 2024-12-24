import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Customer from "./Customer";
import SaleStatus from "./SaleStatus";

const Sale = sequelize.define("Sale", {
  UniqueID: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  detalle: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  cliente_id: {
    type: DataTypes.UUID,
    references: {
      model: Customer,
      key: "UniqueID",
    },
  },
  estado_id: {
    type: DataTypes.UUID,
    references: {
      model: SaleStatus,
      key: "UniqueID",
    },
  },
});

export default Sale;
