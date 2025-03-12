import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { parse } from "pg-connection-string";

dotenv.config();
var config = {} as any;

if (process.env.DATABASE_URL) {
  config = parse(process.env.DATABASE_URL as string);
} else {
  // DB_NAME = autoctono;
  // DB_USER = username;
  // DB_PASSWORD = password;
  // DB_HOST = localhost;

  config.database = process.env.DB_NAME;
  config.user = process.env.DB_USER;
  config.password = process.env.DB_PASSWORD;
  config.host = process.env.DB_HOST;
  config.port = 5432;
}
const sequelize = new Sequelize(
  config.database as string,
  config.user as string,
  config.password as string,
  {
    host: config.host ? config.host : "localhost",
    port: Number(config.port),
    dialect: "postgres",
    logging: console.log,
    ssl: process.env.DATABASE_URL ? true : false,
    // dialectOptions: {
    //   ssl: {
    //     ssl: process.env.DATABASE_URL ? true : false,
    //     rejectUnauthorized: false,
    //   },
    // },
  }
);

export default sequelize;
