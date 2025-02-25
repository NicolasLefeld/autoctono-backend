import dotenv from "dotenv";
import express from "express";
import sequelize from "../src/config/database";
import { initModels } from "./models";
import authRoutes from "./routes/authRoutes";
import customerRoutes from "./routes/customerRoutes";
import productRoutes from "./routes/productRoutes";
import productSaleRoutes from "./routes/productSaleRoutes";
import productTypeRoutes from "./routes/productTypeRoutes";
import saleRoutes from "./routes/saleRoutes";
import stockRoutes from "./routes/stockRoutes";
import cors from "cors";
import loggerMiddleware from "./middleware/loggerMiddleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(loggerMiddleware);
app.use(cors());

app.use("/api/stocks", stockRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/products", productRoutes);
// app.use("/api/product-sale", productSaleRoutes);
app.use("/api/product-types", productTypeRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/auth", authRoutes);

initModels();

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
