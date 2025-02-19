import { Request, Response } from "express";
import sequelize from "../config/database";
import Product from "../models/Product";
import ProductSale from "../models/ProductSale";
import Sale, { SaleInstance } from "../models/Sale";
import Stock from "../models/Stock";
import Customer from "../models/Customer";
import SaleStatus from "../models/SaleStatus";

export const createSale = async (req: Request, res: Response) => {
  const { detail, total, customerId, statusId, products, iva } = req.body;

  const transaction = await sequelize.transaction();

  try {
    const sale: SaleInstance = await Sale.create(
      { detail, total, customerId, statusId, iva },
      { transaction }
    );

    for (const product of products) {
      const { productId, unitPrice, quantity } = product;

      await ProductSale.create(
        {
          unitPrice: unitPrice,
          quantity: quantity,
          productId: productId,
          saleId: sale.id,
        },
        { transaction }
      );

      const stock = await Stock.findOne({
        where: { productId },
        transaction,
      });

      if (!stock || stock.quantity < quantity) {
        await transaction.rollback();
        res.status(400).json({ message: "Insufficient stock" });

        return;
      }

      await stock.update(
        { quantity: stock.quantity - quantity },
        { transaction }
      );
    }

    await transaction.commit();

    const saleWithDetails = await Sale.findByPk(sale.id, {
      include: [
        {
          model: ProductSale,
          as: "productSales",
          include: [
            {
              model: Product,
              as: "product",
            },
          ],
        },
        { model: Customer, as: "customer" },
        { model: SaleStatus, as: "status" },
      ],
    });

    res.status(201).json(saleWithDetails);
  } catch (error) {
    try {
      await transaction.rollback();
    } catch (rollbackError) {
      // Posiblemente la transacción ya se cerró; podríamos ignorar o loguear
      console.error("Error rolling back transaction", rollbackError);
    }
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

export const getSaleDTO = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;

    const saleWithDetails = await Sale.findByPk(id, {
      include: [
        {
          model: ProductSale,
          as: "productSales",
          include: [
            {
              model: Product,
              as: "product",
            },
          ],
        },
        { model: Customer, as: "customer" },
        { model: SaleStatus, as: "status" },
      ],
    });
    if (!saleWithDetails) {
      res.status(404).send();
    }
    res.send(saleWithDetails);
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

export const getAllSalesDTO = async (req: Request, res: Response) => {
  try {
    const saleWithDetails = await Sale.findAll({
      include: [
        {
          model: ProductSale,
          as: "productSales",
          include: [
            {
              model: Product,
              as: "product",
            },
          ],
        },
        { model: Customer, as: "customer" },
        { model: SaleStatus, as: "status" },
      ],
    });
    if (!saleWithDetails) {
      res.status(404).send();
    }
    res.send(saleWithDetails);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateSale = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { detail, total, customerId, statusId, products } = req.body;

  // Iniciamos una transacción
  const transaction = await sequelize.transaction();

  try {
    // Buscamos la venta a actualizar
    const sale = await Sale.findByPk(id, { transaction });
    if (!sale) {
      try {
        await transaction.rollback();
      } catch (rollbackError) {
        console.error("Error rolling back transaction", rollbackError);
      }
      res.status(404).send({ message: "Sale not found" });
    }

    // Actualizamos los campos básicos de la venta
    await sale?.update(
      { detail, total, customerId, statusId },
      { transaction }
    );

    // Eliminamos los registros anteriores de ProductSale asociados a esta venta
    await ProductSale.destroy({ where: { saleId: id }, transaction });

    // Recorremos el array de productos enviado y creamos nuevos registros en ProductSale
    for (const product of products) {
      const { productId, unitPrice, quantity } = product;

      // (Opcional) Puedes verificar stock aquí, tal como en createSale
      const stock = await Stock.findOne({
        where: { productId },
        transaction,
      });
      if (!stock || stock.quantity < quantity) {
        try {
          await transaction.rollback();
        } catch (rollbackError) {
          console.error("Error rolling back transaction", rollbackError);
        }
        res.status(400).json({ message: "Insufficient stock" });
      }

      await ProductSale.create(
        { productId, unitPrice, quantity, saleId: sale?.id },
        { transaction }
      );

      // Actualizamos el stock (opcional, según tu lógica)
      await stock?.update(
        { quantity: stock.quantity - quantity },
        { transaction }
      );
    }

    await transaction.commit();

    // Obtenemos la venta actualizada con todos los detalles y asociaciones
    const updatedSale = await Sale.findByPk(id, {
      include: [
        {
          model: ProductSale,
          as: "productSales",
          include: [{ model: Product, as: "product" }],
        },
        { model: Customer, as: "customer" },
        { model: SaleStatus, as: "status" },
      ],
    });

    res.send(updatedSale);
  } catch (error) {
    await transaction.rollback();
    res.status(400).send(error);
  }
};

export const deleteSale = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const deleteProductSale = await ProductSale.destroy({
      where: { saleId: id },
    });

    const deleteSale = await Sale.destroy({ where: { id } });
    if (!deleteSale) {
      res.status(404).send("Sale not found");
    }
    res.send({ message: "Sale deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
};
