import express from "express";
import dotenv from "dotenv";
import sequelize from "../src/config/database"; // Ensure this path is correct
import stockRoutes from "./routes/stockRoutes";
import saleRoutes from "./routes/saleRoutes";
import productRoutes from "./routes/productRoutes";
import productTypeRoutes from "./routes/productTypeRoutes";
import customerRoutes from "./routes/customerRoutes";
import authRoutes from "./routes/authRoutes"; // Import auth routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/stocks", stockRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/products", productRoutes);
app.use("/api/product-types", productTypeRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/auth", authRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
