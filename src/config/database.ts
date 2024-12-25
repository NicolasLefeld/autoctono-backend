import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT as any,
  }
);

console.log(
  `\n ${process.env.DB_NAME}\n ${process.env.DB_USER}\n ${process.env.DB_PASSWORD}\n ${process.env.DB_HOST}\n ${process.env.DB_DIALECT}\n\n`
);

export default sequelize;
