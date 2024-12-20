import { Request, Response } from "express";
import Inventory from "../models/Inventory";

export const getAllInventory = async (req: Request, res: Response) => {
  const inventory = await Inventory.findAll();
  res.json(inventory);
};

export const getInventoryById = async (req: Request, res: Response) => {
  const inventory = await Inventory.findByPk(req.params.id);
  if (inventory) {
    res.json(inventory);
  } else {
    res.status(404).send("Inventory not found");
  }
};

export const createInventory = async (req: Request, res: Response) => {
  const newInventory = await Inventory.create(req.body);
  res.status(201).json(newInventory);
};

export const updateInventory = async (req: Request, res: Response) => {
  const inventory = await Inventory.findByPk(req.params.id);
  if (inventory) {
    await inventory.update(req.body);
    res.json(inventory);
  } else {
    res.status(404).send("Inventory not found");
  }
};

export const deleteInventory = async (req: Request, res: Response) => {
  const inventory = await Inventory.findByPk(req.params.id);
  if (inventory) {
    await inventory.destroy();
    res.status(204).send();
  } else {
    res.status(404).send("Inventory not found");
  }
};
