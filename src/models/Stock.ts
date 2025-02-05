import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Product from "./Product";

class Stock extends Model {
    public id!: number;
    public quantity!: number;
    public productId!: number;

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
            validate: {
                min: 0,
                max: 100000, // 100000gr = 100kg
            },
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
