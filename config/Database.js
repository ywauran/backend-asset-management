import { Sequelize } from "sequelize";

const db = new Sequelize("railway", "root", "KdzcAZxVGk5YMhsmesop", {
  host: "containers-us-west-36.railway.app",
  port: 6751,
  dialect: "mysql",
});

export default db;
