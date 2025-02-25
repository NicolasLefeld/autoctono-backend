import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Product from "./Product";
import Sale from "./Sale";

class ProductSale extends Model {
  public id!: number;
  public unitPrice!: number;
  public percentageDiscount!: number;
  public quantity!: number;
  public productId!: number;
  public saleId!: number;

  public static associate() {
    ProductSale.belongsTo(Product, {
      foreignKey: "productId",
      as: "product",
    });
    ProductSale.belongsTo(Sale, {
      foreignKey: "saleId",
      as: "sale",
    });
  }
}

ProductSale.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    percentageDiscount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    saleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ProductSale",
  }
);

export default ProductSale;
