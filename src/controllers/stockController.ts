import { Request, Response } from "express";
import Stock from "../models/Stock";

export const createStock = async (req: Request, res: Response) => {
  try {
    const stock = await Stock.create(req.body);
    res.status(201).send(stock);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getStock = async (req: Request, res: Response) => {
  try {
    const stock = await Stock.findByPk(req.params.id);
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
    const stocks = await Stock.findAll();
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
    const updatedStock = await Stock.findByPk(req.params.id);
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
