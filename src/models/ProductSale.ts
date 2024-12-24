import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Product from "./Product";
import Sale from "./Sale";

const ProductSale = sequelize.define("ProductSale", {
  UniqueID: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  precioUnitario: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  producto_id: {
    type: DataTypes.UUID,
    references: {
      model: Product,
      key: "UniqueID",
    },
  },
  venta_id: {
    type: DataTypes.UUID,
    references: {
      model: Sale,
      key: "UniqueID",
    },
  },
});

export default ProductSale;
