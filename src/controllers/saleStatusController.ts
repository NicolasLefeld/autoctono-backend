import { Request, Response } from "express";
import SaleStatus from "../models/SaleStatus";

export const createSaleStatus = async (req: Request, res: Response) => {
  try {
    const saleStatus = await SaleStatus.create(req.body);
    res.status(201).send(saleStatus);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getSaleStatus = async (req: Request, res: Response) => {
  try {
    const saleStatus = await SaleStatus.findByPk(req.params.id);
    if (!saleStatus) {
      res.status(404).send();
    }
    res.send(saleStatus);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAllSaleStatuses = async (req: Request, res: Response) => {
  try {
    const saleStatuses = await SaleStatus.findAll();
    res.send(saleStatuses);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateSaleStatus = async (req: Request, res: Response) => {
  try {
    const [updated] = await SaleStatus.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      res.status(404).send();
    }
    const updatedSaleStatus = await SaleStatus.findByPk(req.params.id);
    res.send(updatedSaleStatus);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteSaleStatus = async (req: Request, res: Response) => {
  try {
    const deleted = await SaleStatus.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      res.status(404).send();
    }
    res.send({ message: "Sale status deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
};
