import { Request, Response } from "express";
import SaleStatus from "../models/SaleStatus";

export const createSaleStatus = async (req: Request, res: Response) => {
    try {
        const createSaleStatus = await SaleStatus.create(req.body);
        res.status(201).send(createSaleStatus);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getSaleStatus = async (req: Request, res: Response) => {
    try {
        const getSaleStatus = await SaleStatus.findByPk(req.params.id);

        if (!getSaleStatus) {
            res.status(404).send();
            return;
        }

        res.status(200).send(getSaleStatus);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getAllSaleStatus = async (req: Request, res: Response) => {
    try {
        const getAllSaleStatus = await SaleStatus.findAll();
        res.status(200).send(getAllSaleStatus);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateSaleStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(404).send("Sale Status not found");
        }
        const [updated] = await SaleStatus.update(req.body, {
            where: { id },
        });
        if (!updated) {
            res.status(404).send();
        }
        const updatedSaleStatus = await SaleStatus.findByPk(id);
        res.status(200).send(updatedSaleStatus);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteSaleStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(404).send("Sale Status not found");
        }

        const deleted = await SaleStatus.destroy({
            where: { id },
        });
        if (!deleted) {
            res.status(404).send();
        }
        res.status(204).send({ message: "Sale Status deleted" });
    } catch (error) {
        res.status(500).send(error);
    }
};
