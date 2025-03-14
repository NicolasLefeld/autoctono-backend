import { Request, Response } from "express";
import ProductType from "../models/ProductType";
import Product from "../models/Product";
import sequelize from "../config/database";

export const createProductType = async (req: Request, res: Response) => {
  try {
    const productType = await ProductType.create(req.body);
    res.status(201).send(productType);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getProductType = async (req: Request, res: Response) => {
  try {
    const productType = await ProductType.findByPk(req.params.id);
    if (!productType) {
      res.status(404).send();
    }
    res.send(productType);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAllProductTypes = async (req: Request, res: Response) => {
  try {
    const productTypes = await ProductType.findAll();
    res.send(productTypes);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateProductType = async (req: Request, res: Response) => {
  try {
    const [updated] = await ProductType.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      res.status(404).send();
    }
    const updatedProductType = await ProductType.findByPk(req.params.id);
    res.send(updatedProductType);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateProductTypePrices = async (req: Request, res: Response) => {
  try {
    const { amountToIncrease, productTypesId } = req.body;

    for (const productTypeId of productTypesId) {
      await Product.update(
        {
          price: sequelize.literal(`price + price * ${amountToIncrease}`),
          //cost: sequelize.literal(`cost + cost * ${amountToIncrease}`),
        },
        {
          where: { productTypeId },
        }
      );
    }

    res.status(200).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteProductType = async (req: Request, res: Response) => {
  try {
    const deleted = await ProductType.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      res.status(404).send();
    }
    res.send({ message: "Product type deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
};
