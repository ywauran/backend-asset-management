import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";
import UserModel from "./UserModel.js";
import AssetModel from "./AssetModel.js";

const Loan = db.define("loan", {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
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
});

// UserModel.hasMany(Loan);
Loan.belongsTo(UserModel, { foreignKey: "user_id" });

// AssetModel.hasMany(Loan);
Loan.belongsTo(AssetModel, { foreignKey: "asset_id" });

export default Loan;
