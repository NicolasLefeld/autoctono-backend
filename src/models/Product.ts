import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import ProductType from "./ProductType";

interface ProductAttributes {
  id: number;
  detail?: string;
  name: string;
  price: number;
  productTypeId?: number;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {}

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public detail?: string;
  public name!: string;
  public price!: number;
  public productTypeId?: number;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    productTypeId: {
      type: DataTypes.INTEGER,
      references: {
        model: ProductType,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Product",
  }
);

export default Product;
