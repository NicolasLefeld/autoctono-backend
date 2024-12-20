import { Request, Response } from "express";
import Cliente from "../models/Customer";

export const getAllCustomers = async (req: Request, res: Response) => {
  const clientes = await Cliente.findAll();
  res.json(clientes);
};

export const getCustomerById = async (req: Request, res: Response) => {
  const cliente = await Cliente.findByPk(req.params.id);
  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).send("Cliente not found");
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  const newCliente = await Cliente.create(req.body);
  res.status(201).json(newCliente);
};

export const updateCustomer = async (req: Request, res: Response) => {
  const cliente = await Cliente.findByPk(req.params.id);
  if (cliente) {
    await cliente.update(req.body);
    res.json(cliente);
  } else {
    res.status(404).send("Cliente not found");
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  const cliente = await Cliente.findByPk(req.params.id);
  if (cliente) {
    await cliente.destroy();
    res.status(204).send();
  } else {
    res.status(404).send("Cliente not found");
  }
};
