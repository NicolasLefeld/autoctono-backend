import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Product from "./Product";

enum UnitOfMeasurement {
  GRAMS = "grams",
  UNIT = "unit",
}

class Stock extends Model {
  public id!: number;
  public quantity!: number;
  public productId!: number;
  public unitOfMeasurement!: UnitOfMeasurement;

  public static associate() {
    Stock.belongsTo(Product, {
      as: "product",
      foreignKey: "productId",
    });
  }
}

Stock.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitOfMeasurement: {
      type: DataTypes.ENUM,
      values: Object.values(UnitOfMeasurement),
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Stock",
    timestamps: true,
  }
);

export default Stock;
