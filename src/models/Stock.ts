import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Product from "./Product";

const Stock = sequelize.define("Stock", {
  UniqueID: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 25000,
    },
  },
  producto_id: {
    type: DataTypes.UUID,
    references: {
      model: Product,
      key: "UniqueID",
    },
  },
});

export default Stock;
