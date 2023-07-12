import argon2 from "argon2";
import User from "../models/UserModel.js";

export const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).json({
        msg: "Ups! Sepertinya kamu salah memasukkan username atau password.",
      });
    }

    const match = await argon2.verify(user.password, req.body.password);

    if (!match) {
      return res.status(400).json({
        msg: "Ups! Sepertinya kamu salah memasukkan username atau password.",
      });
    }

    req.session.userId = user.uuid;

    const { uuid, name, username, role, id } = user;

    res.status(200).json({
      uuid,
      name,
      username,
      role,
      id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
};

export const me = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res
        .status(401)
        .json({ msg: "Silahkan login menggunakan akun anda" });
    }

    const user = await User.findOne({
      attributes: ["uuid", "id", "name", "username", "role", "image", "url"],
      where: {
        uuid: req.session.userId,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ msg: "Tidak dapat keluar" });
    }

    res.status(200).json({ msg: "Anda telah keluar" });
  });
};
