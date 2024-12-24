import { Request, Response } from "express";
import Customer from "../models/Customer";

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).send(customer);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      res.status(404).send();
    }
    res.send(customer);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.findAll();
    res.send(customers);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const [updated] = await Customer.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      res.status(404).send();
    }
    const updatedCustomer = await Customer.findByPk(req.params.id);
    res.send(updatedCustomer);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const deleted = await Customer.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      res.status(404).send();
    }
    res.send({ message: "Customer deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
};
