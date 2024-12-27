import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Product from "./Product";

interface StockAttributes {
  id: number;
  quantity: number;
  productId: number;
}

interface StockCreationAttributes extends Optional<StockAttributes, "id"> {}

export interface StockInstance
  extends Model<StockAttributes, StockCreationAttributes>,
    StockAttributes {}

const Stock = sequelize.define<StockInstance>("Stock", {
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
