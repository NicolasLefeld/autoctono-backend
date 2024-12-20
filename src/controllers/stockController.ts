import { Request, Response } from "express";
import Stock from "../models/Stock";

export const getAllStock = async (req: Request, res: Response) => {
  const stock = await Stock.findAll();
  res.json(stock);
};

export const getStockById = async (req: Request, res: Response) => {
  const stock = await Stock.findByPk(req.params.id);
  if (stock) {
    res.json(stock);
  } else {
    res.status(404).send("Stock not found");
  }
};

export const createStock = async (req: Request, res: Response) => {
  const newStock = await Stock.create(req.body);
  res.status(201).json(newStock);
};

export const updateStock = async (req: Request, res: Response) => {
  const stock = await Stock.findByPk(req.params.id);
  if (stock) {
    await stock.update(req.body);
    res.json(stock);
  } else {
    res.status(404).send("Stock not found");
  }
};

export const deleteStock = async (req: Request, res: Response) => {
  const stock = await Stock.findByPk(req.params.id);
  if (stock) {
    await stock.destroy();
    res.status(204).send();
  } else {
    res.status(404).send("Stock not found");
  }
};
