import argon2 from "argon2";
import path from "path";
import { Op } from "sequelize";
import User from "../models/UserModel.js";

export const getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 3;
  const search = req.query.search_query || "";
  const offset = limit * page;

  try {
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
        role: "guest",
      },
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
    });

    res.status(200).json({
      result: result,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
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
    console.error(error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
};

export const createUser = async (req, res) => {
  if (req.files === null || req.files === undefined)
    return res.status(400).json({ msg: "Belum ada file yang diupload" });

  const { name, username, password, role } = req.body;
  const { file } = req.files;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Gambar tidak valid" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Gambar harus kurang dari 5 MB" });

  const hashPassword = await argon2.hash(password);

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Kesalahan server internal" });
    }

    try {
      await User.create({
        name: name,
        username: username,
        password: hashPassword,
        image: fileName,
        url: url,
        role: role,
      });
      res.status(201).json({ msg: "Registrasi berhasil" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Permintaan tidak valid" });
    }
  });
};

export const updateUser = async (req, res) => {
  try {
    const { name, username, password, role } = req.body;
    const user = await User.findOne({ where: { uuid: req.params.id } });

    if (!user) {
      return res.status(404).json({ msg: "Pengguna tidak ditemukan" });
    }

    if (req.files && req.files.file) {
      const { file } = req.files;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      const fileName = file.md5 + ext;
      const allowedType = [".png", ".jpg", ".jpeg"];

      if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Gambar tidak valid" });
      }
      if (fileSize > 5000000) {
        return res.status(422).json({ msg: "Gambar harus kurang dari 5 MB" });
      }

      file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Kesalahan server internal" });
        }

        const hashPassword = await argon2.hash(password);

        await user.update({
          name,
          username,
          password: hashPassword,
          image: fileName,
          url: `${req.protocol}://${req.get("host")}/images/${fileName}`,
          role,
        });

        res.status(200).json({ msg: "Data pengguna berhasil diperbarui" });
      });
    } else {
      const hashPassword = await argon2.hash(password);

      await user.update({
        name,
        username,
        password: hashPassword,
        role,
      });

      res.status(200).json({ msg: "Data pengguna berhasil diperbarui" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ error: "Pengguna tidak ditemukan" });

  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "Pengguna berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Permintaan tidak valid" });
  }
};
