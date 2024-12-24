import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import ProductType from "./ProductType";

const Product = sequelize.define("Product", {
  UniqueID: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  detalle: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  tipoProducto_id: {
    type: DataTypes.UUID,
    references: {
      model: ProductType,
      key: "UniqueID",
    },
  },
});

export default Product;
