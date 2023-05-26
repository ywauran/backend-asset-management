import { Sequelize } from "sequelize";

import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const User = db.define("user", {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 100],
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 100],
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: false,
    },
  },
  image: DataTypes.STRING,
  url: DataTypes.STRING,
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

export default User;
