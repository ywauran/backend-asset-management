import argon2 from "argon2";
// eslint-disable-next-line import/extensions
import User from "../models/UserModel.js";

export const Login = async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (!user)
    return res.status(404).json({
      msg: "Upss! Sepertinya kamu salah memasukkan username atau password.",
    });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match)
    return res.status(400).json({
      msg: "Upss! Sepertinya kamu salah memasukkan username atau password.",
    });
  req.session.userId = user.uuid;
  const { uuid, name, username, role } = user;
  res.status(200).json({
    uuid,
    name,
    username,
    role,
  });
};

export const Me = async (req, res) => {
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
  if (!user) return res.status(404).json({ msg: "User not found" });
  res.status(200).json(user);
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Cant log out" });
    res.status(200).json({ msg: "You have logged out" });
  });
};
