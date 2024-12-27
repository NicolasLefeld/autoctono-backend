import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Sale from "./Sale";

class Customer extends Model {
  public id!: number;
  public companyName!: string;
  public firstName!: string | null;
  public lastName!: string | null;
  public email!: string;

  public static associate() {
    Customer.hasMany(Sale, {
      foreignKey: "customerId",
      as: "sales",
    });
  }
}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Customer",
  }
);

export default Customer;
