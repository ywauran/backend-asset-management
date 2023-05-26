import { Sequelize } from "sequelize";

const db = new Sequelize("db_asset_management", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
