import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Product from "./Product";
import Sale from "./Sale";

interface ProductSaleAttributes {
  id: number;
  unitPrice: number;
  quantity: number;
  productId: number;
  saleId: number;
}

interface ProductSaleCreationAttributes
  extends Optional<ProductSaleAttributes, "id"> {}

export interface ProductSaleInstance
  extends Model<ProductSaleAttributes, ProductSaleCreationAttributes>,
    ProductSaleAttributes {}

class ProductSale extends Model<
  ProductSaleAttributes,
  ProductSaleCreationAttributes
> {
  public id!: number;
  public unitPrice!: number;
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
