import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { parse } from "pg-connection-string";

dotenv.config();

const config = parse(process.env.DATABASE_URL as string);

const sequelize = new Sequelize(
  config.database as string,
  config.user as string,
  config.password as string,
  {
    host: config.host ? config.host : "localhost",
    port: Number(config.port),
    dialect: "postgres",
    logging: console.log,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

export default sequelize;
