import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Inventory extends Model {}

Inventory.init(
  {
    UniqueID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitMeasure_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Inventory",
  }
);

export default Inventory;
