import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import ProductType from "./ProductType";

class Product extends Model {
    public id!: number;
    public detail!: string;
    public name!: string;
    public price!: number;
    public productTypeId!: number;

    public static associate() {
        Product.belongsTo(ProductType, {
            as: "productType",
            foreignKey: "productTypeId",
        });
    }
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
        cost: {
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
        timestamps: true,
    }
);

export default Product;
