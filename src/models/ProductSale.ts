import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Product from "./Product";
import Sale from "./Sale";

const ProductSale = sequelize.define("ProductSale", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  unitPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: "id",
    },
  },
  saleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Sale,
      key: "id",
    },
  },
});

export default ProductSale;
