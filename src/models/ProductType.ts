import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const ProductType = sequelize.define("ProductType", {
  UniqueID: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default ProductType;
