import Loan from "../models/LoanModel.js";
import Asset from "../models/AssetModel.js";
import User from "../models/UserModel.js";

export const getAllLoansByUserId = async (req, res) => {
  const { id } = req.params;

  try {
    const loans = await Loan.findAll({
      include: [Asset, User],
      where: {
        user_id: id,
      },
    });

    // Extract required fields from asset and user objects
    const formattedLoans = loans.map((loan) => {
      const { id, uuid, status, createdAt, updatedAt, user_id, asset_id } =
        loan;
      const {
        serial_number,
        item_name,
        item_condition,
        category,
        status: assetStatus,
        image,
        url,
      } = loan.Asset;
      const { name, username, role } = loan.user;

      return {
        id,
        uuid,
        status,
        createdAt,
        updatedAt,
        user_id,
        asset_id,
        serial_number,
        item_name,
        item_condition,
        category,
        assetStatus,
        image,
        url,
        name,
        username,
        role,
      };
    });

    res.status(200).json(formattedLoans);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.findAll({
      include: [Asset, User],
    });

    // Extract required fields from asset and user objects
    const formattedLoans = loans.map((loan) => {
      const { id, uuid, status, createdAt, updatedAt, user_id, asset_id } =
        loan;
      const {
        serial_number,
        item_name,
        item_condition,
        category,
        status: assetStatus,
        image,
        url,
      } = loan.Asset;
      const { name, username, role } = loan.user;

      return {
        id,
        uuid,
        status,
        createdAt,
        updatedAt,
        user_id,
        asset_id,
        serial_number,
        item_name,
        item_condition,
        category,
        assetStatus,
        image,
        url,
        name,
        username,
        role,
      };
    });

    res.status(200).json(formattedLoans);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createLoan = async (req, res) => {
  const { assetId, userId } = req.body;

  try {
    await Loan.create({
      asset_id: assetId,
      user_id: userId,
      status: "Dipinjamkan",
    });

    await Asset.update(
      {
        status: "Tidak Tersedia",
      },
      {
        where: {
          id: assetId,
        },
      }
    );

    res.status(201).json({ message: "Loan created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const returnAsset = async (req, res) => {
  const { id } = req.params;
  const { assetId } = req.body;

  try {
    const loan = await Loan.findOne({
      where: {
        uuid: id,
      },
    });

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    const asset = await Asset.findOne({
      where: {
        id: assetId,
      },
    });

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    await Asset.update(
      {
        status: "Tersedia",
      },
      {
        where: {
          id: asset.id,
        },
      }
    );

    await Loan.update(
      {
        status: "Selesai",
      },
      {
        where: {
          uuid: loan.uuid,
        },
      }
    );

    res.status(200).json({ message: "Asset returned successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
