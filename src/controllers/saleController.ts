import { Request, Response } from "express";
import sequelize from "../config/database";
import Product from "../models/Product";
import ProductSale from "../models/ProductSale";
import Sale, { SaleInstance } from "../models/Sale";
import Stock from "../models/Stock";

export const createSale = async (req: Request, res: Response) => {
    const { detail, total, customerId, statusId, products } = req.body;

    const transaction = await sequelize.transaction();

    try {
        const sale: SaleInstance = await Sale.create(
            { detail, total, customerId, statusId },
            { transaction }
        );

        for (const product of products) {
            const { productId, unitPrice, quantity } = product;

            await ProductSale.create(
                {
                    unitPrice: unitPrice,
                    quantity: quantity,
                    productId: productId,
                    saleId: sale.id,
                },
                { transaction }
            );

            const stock = await Stock.findOne({
                where: { productId },
                transaction,
            });

            if (!stock || stock.quantity < quantity) {
                await transaction.rollback();
                res.status(400).json({ message: "Insufficient stock" });

                return;
            }

            await stock.update(
                { quantity: stock.quantity - quantity },
                { transaction }
            );
        }

        await transaction.commit();
        res.status(201).send(sale);
    } catch (error) {
        await transaction.rollback();
        res.status(400).send(error);
    }
};

export const getSale = async (req: Request, res: Response) => {
    try {
        const sale = await Sale.findByPk(req.params.id);
        if (!sale) {
            res.status(404).send();
        }
        res.send(sale);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getSaleDTO = async (req: Request, res: Response) => {
    try {
        const getProductSale = await ProductSale.findOne({
            where: { saleId: req.params.id },
            include: [
                { model: Sale, as: "sale" },
                { model: Product, as: "product" },
            ],
        });
        if (!getProductSale) {
            res.status(404).send();
        }
        res.send(getProductSale);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getAllSales = async (req: Request, res: Response) => {
    try {
        const sales = await Sale.findAll();
        res.send(sales);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getAllSalesDTO = async (req: Request, res: Response) => {
    try {
        const productSales = await ProductSale.findAll({
            include: [
                { model: Sale, as: "sale" },
                { model: Product, as: "product" },
            ],
        });

        res.send(productSales);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateSale = async (req: Request, res: Response) => {
    try {
        const [updated] = await Sale.update(req.body, {
            where: { id: req.params.id },
        });
        if (!updated) {
            res.status(404).send();
        }
        const updatedSale = await Sale.findByPk(req.params.id);
        res.send(updatedSale);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteSale = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const deleteProductSale = await ProductSale.destroy({
            where: { saleId: id },
        });

        const deleteSale = await Sale.destroy({ where: { id } });
        if (!deleteSale) {
            res.status(404).send("Sale not found");
        }
        res.send({ message: "Sale deleted" });
    } catch (error) {
        res.status(500).send(error);
    }
};
