import { Request, Response, NextFunction } from "express";
import Stock from "../models/Stock";
import Product from "../models/Product";

export const createStock = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { productId, unitOfMeasurement, quantity } = req.body;
        if (!productId) {
            res.status(400).send("Product id is required");
            return;
        }
        if (quantity == null) {
            res.status(400).send("Quantity is required");
            return;
        }
        if (!unitOfMeasurement) {
            res.status(400).send("Unit of measurement is required");
            return;
        }

        let stock = await Stock.findOne({
            where: { productId, unitOfMeasurement },
        });

        if (stock) {
            stock.quantity = stock.quantity + quantity;
            await stock.save();
        } else {
            stock = await Stock.create(req.body);
        }

        const getCreatedStock = await Stock.findOne({
            where: { id: stock.id },
            include: [{ model: Product, as: "product" }],
        });
        res.status(201).send(getCreatedStock);
    } catch (error) {
        next(error);
    }
};

export const getStock = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).send("Stock id is required");
        }

        const stock = await Stock.findOne({
            where: { id },
            include: [{ model: Product, as: "product" }],
        });

        if (!stock) {
            res.status(404).send();
        }
        res.send(stock);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getAllStocks = async (req: Request, res: Response) => {
    try {
        const stocks = await Stock.findAll({
            include: [{ model: Product, as: "product" }],
        });
        res.send(stocks);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateStock = async (req: Request, res: Response) => {
    try {
        const [updated] = await Stock.update(req.body, {
            where: { id: req.params.id },
        });
        if (!updated) {
            res.status(404).send();
        }
        const updatedStock = await Stock.findByPk(req.params.id, {
            include: [{ model: Product, as: "product" }],
        });
        res.send(updatedStock);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteStock = async (req: Request, res: Response) => {
    try {
        const deleted = await Stock.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            res.status(404).send();
        }
        res.send({ message: "Stock deleted" });
    } catch (error) {
        res.status(500).send(error);
    }
};
