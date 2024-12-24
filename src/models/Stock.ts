import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Product from "./Product";

const Stock = sequelize.define("Stock", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 100000, // 100000gr = 100kg
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: "id",
    },
  },
});

export default Stock;
