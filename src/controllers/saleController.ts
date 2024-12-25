import { Request, Response } from "express";
import Sale from "../models/Sale";

export const createSale = async (req: Request, res: Response) => {
  try {
    const sale = await Sale.create(req.body);
    res.status(201).send(sale);
  } catch (error) {
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
