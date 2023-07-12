import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import CategoryModel from "./CategoryModel.js";

const { DataTypes } = Sequelize;

const Asset = db.define("Asset", {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  serial_number: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  item_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  item_condition: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  image: DataTypes.STRING,
  url: DataTypes.STRING,
});

export default Asset;
