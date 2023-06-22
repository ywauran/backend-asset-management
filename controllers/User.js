import argon2 from "argon2";
import path from "path";
import { Op } from "sequelize";
import User from "../models/UserModel.js";

export const getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 3;
  const search = req.query.search_query || "";
  const offset = limit * page;
  const totalRows = await User.count({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          username: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
  });

  const totalPage = Math.ceil(totalRows / limit);
  const result = await User.findAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          username: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
    offset: offset,
    limit: limit,
    order: [["id", "DESC"]],
  });
  res.json({
    result: result,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  });
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["uuid", "name", "username", "image", "url", "role"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    req.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  if (req.files === null || req.files === undefined)
    return req.status(400).json({ msg: "Belum ada file yang diupload" });
  const { name, username, password, role } = req.body;

  const { file } = req.files;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "mage must be less than 5 MB" });
  const hashPassword = await argon2.hash(password);

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await User.create({
        name: name,
        username: username,
        password: hashPassword,
        image: fileName,
        url: url,
        role: role,
      });
      res.status(201).json({ msg: "Register successfully" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "Pengguna tidak ditemukan" });
  const { name, email, phoneNumber, nidn } = req.body;
  try {
    await User.update(
      {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        nidn: nidn,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "Pengguna berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ msg: "Pengguna tidak ditemukan" });
  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "Pengguna berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
