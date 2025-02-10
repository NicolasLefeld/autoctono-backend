import { Request, Response } from "express";
import ProductSale from "../models/ProductSale";

export const createProductSale = async (req: Request, res: Response) => {
    try {
        const product = await ProductSale.create(req.body);
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getProductSale = async (req: Request, res: Response) => {
    try {
        const product = await ProductSale.findByPk(req.params.id);
        if (!product) {
            res.status(404).send();
        }
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getAllProductSale = async (req: Request, res: Response) => {
    try {
        const products = await ProductSale.findAll();
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateProductSale = async (req: Request, res: Response) => {
    try {
        const [updated] = await ProductSale.update(req.body, {
            where: { id: req.params.id },
        });
        if (!updated) {
            res.status(404).send();
        }
        const updatedProduct = await ProductSale.findByPk(req.params.id);
        res.send(updatedProduct);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteProductSale = async (req: Request, res: Response) => {
    try {
        const deleted = await ProductSale.destroy({
            where: { id: req.params.id },
        });
        if (!deleted) {
            res.status(404).send();
        }
        res.send({ message: "Product deleted" });
    } catch (error) {
        res.status(500).send(error);
    }
};
