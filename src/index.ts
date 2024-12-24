import express from "express";
import dotenv from "dotenv";
import sequelize from "../src/config/database"; // Ensure this path is correct
import stockRoutes from "./routes/stockRoutes";
import saleRoutes from "./routes/saleRoutes";
import productRoutes from "./routes/productRoutes";
import productTypeRoutes from "./routes/productTypeRoutes";
import productSaleRoutes from "./routes/productSaleRoutes";
import customerRoutes from "./routes/customerRoutes";
import authRoutes from "./routes/authRoutes"; // Import auth routes

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Use individual routers
app.use("/api/stocks", stockRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/products", productRoutes);
app.use("/api/product-types", productTypeRoutes);
app.use("/api/product-sales", productSaleRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/auth", authRoutes); // Use auth routes

// Sync database and start server
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
