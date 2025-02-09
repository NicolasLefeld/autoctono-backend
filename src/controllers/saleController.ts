import { Request, Response } from "express";
import Sale from "../models/Sale";
import ProductSale from "../models/ProductSale";
import Stock, { StockInstance } from "../models/Stock";
import sequelize from "../config/database";
import { SaleInstance } from "../models/Sale";

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

            const stock: StockInstance | null = await Stock.findOne({
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

export const getAllSales = async (req: Request, res: Response) => {
    try {
        const sales = await Sale.findAll();
        res.send(sales);
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
        const deleted = await Sale.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            res.status(404).send();
        }
        res.send({ message: "Sale deleted" });
    } catch (error) {
        res.status(500).send(error);
    }
};
