import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import ProductType from "./ProductType";

const Product = sequelize.define("Product", {
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
});

Product.belongsTo(ProductType, {
    as: "productType",
    foreignKey: "productTypeId",
});

export default Product;
