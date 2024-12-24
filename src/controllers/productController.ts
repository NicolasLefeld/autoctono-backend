import { Request, Response } from "express";
import Product from "../models/Product";

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll();
  res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Product not found");
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const newProduct = await Product.create(req.body);
  res.status(201).json(newProduct);
};

export const updateProduct = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    await product.update(req.body);
    res.json(product);
  } else {
    res.status(404).send("Product not found");
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    await product.destroy();
    res.status(204).send();
  } else {
    res.status(404).send("Product not found");
  }
};
