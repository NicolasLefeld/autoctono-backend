import { Request, Response } from "express";
import ProductSale from "../models/ProductSale";

export const createProductSale = async (req: Request, res: Response) => {
  try {
    const productSale = await ProductSale.create(req.body);
    res.status(201).send(productSale);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getProductSale = async (req: Request, res: Response) => {
  try {
    const productSale = await ProductSale.findByPk(req.params.id);
    if (!productSale) {
      res.status(404).send();
    }
    res.send(productSale);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAllProductSales = async (req: Request, res: Response) => {
  try {
    const productSales = await ProductSale.findAll();
    res.send(productSales);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateProductSale = async (req: Request, res: Response) => {
  try {
    const [updated] = await ProductSale.update(req.body, {
      where: { UniqueID: req.params.id },
    });
    if (!updated) {
      res.status(404).send();
    }
    const updatedProductSale = await ProductSale.findByPk(req.params.id);
    res.send(updatedProductSale);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteProductSale = async (req: Request, res: Response) => {
  try {
    const deleted = await ProductSale.destroy({
      where: { UniqueID: req.params.id },
    });
    if (!deleted) {
      res.status(404).send();
    }
    res.send({ message: "Product sale deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
};
