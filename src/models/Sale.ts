import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Customer from "./Customer";
import SaleStatus from "./SaleStatus";
import ProductSale from "./ProductSale";

interface SaleAttributes {
  id: number;
  customerId: number;
  statusId: number;
  detail: string;
  total: number;
  iva: IVAValues;
}
enum IVAValues {
  TENPOINTFIVE = "10.5",
  TWENTYONE = "21",
}
interface SaleCreationAttributes extends Optional<SaleAttributes, "id"> {}

export interface SaleInstance
  extends Model<SaleAttributes, SaleCreationAttributes>,
    SaleAttributes {}

class Sale extends Model<SaleAttributes, SaleCreationAttributes> {
  public id!: number;
  public detail!: string;
  public total!: number;
  public customerId!: number;
  public statusId!: number;
  public iva!: IVAValues;

  public static associate() {
    Sale.belongsTo(Customer, {
      foreignKey: "customerId",
      as: "customer",
    });
    Sale.belongsTo(SaleStatus, {
      foreignKey: "statusId",
      as: "status",
    });
    Sale.hasMany(ProductSale, {
      foreignKey: "saleId",
      as: "productSales",
    });
  }
}

Sale.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    iva: {
      type: DataTypes.ENUM,
      values: Object.values(IVAValues),
    },
  },
  {
    sequelize,
    modelName: "Sale",
  }
);

export default Sale;
