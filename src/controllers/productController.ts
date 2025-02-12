import { Request, Response } from "express";
import Product from "../models/Product";
import ProductType from "../models/ProductType";
import Stock from "../models/Stock";
import ProductSale from "../models/ProductSale";

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, price, productTypeId } = req.body;

        if (!name || !price || !productTypeId) {
            res.status(400).send({
                message: "Name, price and productTypeId are required",
            });
        }

        const product = await Product.create(req.body);

        const getNewProduct = await Product.findByPk(product.id, {
            include: [{ model: ProductType, as: "productType" }],
        });
        res.status(201).send(getNewProduct);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findOne({
            where: { id: req.params.id },
            include: [{ model: ProductType, as: "productType" }],
        });
        if (!product) {
            res.status(404).send();
        }
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            include: [{ model: ProductType, as: "productType" }],
        });
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateProductPrices = async (req: Request, res: Response) => {
    try {
        const { amountToIncrease, productsId } = req.body;

        for (const productId of productsId) {
            const productFound = await Product.findByPk(productId);

            if (!productFound) {
                res.status(404).send();
                return;
            }

            await productFound.update({
                price:
                    productFound.price + productFound.price * amountToIncrease,
            });
        }

        res.status(200).send();
    } catch (error) {
        res.status(400).send(error);
    }
};
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (!id) {
            res.status(400).send({ message: "Product id is required" });
        }

        const [updated] = await Product.update(req.body, {
            where: { id },
        });
        if (!updated) {
            res.status(404).send("Product not found");
        }
        const updatedProduct = await Product.findByPk(id, {
            include: { model: ProductType, as: "productType" },
        });
        res.send(updatedProduct);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).send({ message: "Product id is required" });
        }

        const deleteStock = await Stock.destroy({ where: { productId: id } });

        const deleteProductSale = await ProductSale.destroy({
            where: { productId: id },
        });

        const deleteProduct = await Product.destroy({
            where: { id },
        });
        if (!deleteProduct) {
            res.status(404).send("Product not found");
        }
        res.send({ message: "Product deleted" });
    } catch (error) {
        res.status(500).send(error);
    }
};
