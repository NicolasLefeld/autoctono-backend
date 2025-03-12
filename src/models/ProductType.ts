import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const ProductType = sequelize.define("ProductType", {
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
    unique: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  defaultSalePercentage: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

export default ProductType;
