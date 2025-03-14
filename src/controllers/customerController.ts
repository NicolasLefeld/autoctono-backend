import { Request, Response } from "express";
import Customer from "../models/Customer";
import Sale from "../models/Sale";
import SaleStatus from "../models/SaleStatus";
import { SaleStatusEnum } from "../models/SaleStatus";

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
    const customer = await Customer.findByPk(req.params.id, {
      include: [
        {
          model: Sale,
          as: "sales",
          include: [
            {
              model: SaleStatus,
              as: "status",
              where: {
                code: [SaleStatusEnum.PENDING, SaleStatusEnum.IN_PROCESS],
              },
              required: true,
            },
          ],
          required: false,
        },
      ],
    });

    if (!customer) {
      res.status(404).send();
      return;
    }

    const currentAccount = customer.get("sales");

    res.send({ ...customer.toJSON(), currentAccount });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.findAll({
      include: [
        {
          model: Sale,
          as: "sales",
          include: [
            {
              model: SaleStatus,
              as: "status",
              where: {
                code: [SaleStatusEnum.PENDING, SaleStatusEnum.IN_PROCESS],
              },
              required: true,
            },
          ],
          required: false,
        },
      ],
    });

    const customersWithBalance = customers.map((customer) => {
      const sales = (customer.get("sales") as any[]) || [];

      const balance = sales.reduce((acc, sale) => acc + sale.total, 0);

      return { ...customer.toJSON(), currentAccount: balance };
    });

    res.send(customersWithBalance);
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
