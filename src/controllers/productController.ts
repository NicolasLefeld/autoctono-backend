import { Request, Response } from "express";
import Product from "../models/Product";
import ProductType from "../models/ProductType";
import Stock from "../models/Stock";
import ProductSale from "../models/ProductSale";

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).send(product);
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

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const [updated] = await Product.update(req.body, {
            where: { id: req.params.id },
        });
        if (!updated) {
            res.status(404).send();
        }
        const updatedProduct = await Product.findByPk(req.params.id);
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
