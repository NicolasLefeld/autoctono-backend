import { Request, Response } from "express";
import Sale from "../models/Sale";

export const getAllSales = async (req: Request, res: Response) => {
  const sales = await Sale.findAll();
  res.json(sales);
};

export const getSaleById = async (req: Request, res: Response) => {
  const sale = await Sale.findByPk(req.params.id);
  if (sale) {
    res.json(sale);
  } else {
    res.status(404).send("Sale not found");
  }
};

export const createSale = async (req: Request, res: Response) => {
  const newSale = await Sale.create(req.body);
  res.status(201).json(newSale);
};

export const updateSale = async (req: Request, res: Response) => {
  const sale = await Sale.findByPk(req.params.id);
  if (sale) {
    await sale.update(req.body);
    res.json(sale);
  } else {
    res.status(404).send("Sale not found");
  }
};

export const deleteSale = async (req: Request, res: Response) => {
  const sale = await Sale.findByPk(req.params.id);
  if (sale) {
    await sale.destroy();
    res.status(204).send();
  } else {
    res.status(404).send("Sale not found");
  }
};
