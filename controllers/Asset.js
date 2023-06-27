import Asset from "../models/AssetModel.js";
import path from "path";

export const getAssets = async (req, res) => {
  try {
    const response = await Asset.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const createAsset = async (req, res) => {
  if (req.files === null || req.files === undefined)
    return req.status(400).json({ msg: "Belum ada file yang diupload" });
  const { item_name, serial_number, item_condition, categoryId } = req.body;

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

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Asset.create({
        item_name: item_name,
        serial_number: serial_number,
        item_condition: item_condition,
        categoryId: categoryId,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Berhasil menambah data" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

export const updateAsset = async (req, res) => {
  const asset = await Asset.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!asset) return res.status(404).json({ msg: "Data tidak ditemukan" });
  const { item_name, quantity } = req.body;
  try {
    await Asset.update(
      {
        item_name: item_name,
        quantity: quantity,
      },
      {
        where: {
          id: asset.id,
        },
      }
    );
    res.status(200).json({ msg: "Data berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteAsset = async (req, res) => {
  const asset = await Asset.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!asset) return res.status(404).json({ msg: "Data tidak ditemukan" });
  try {
    await Asset.destroy({
      where: {
        id: asset.id,
      },
    });
    res.status(200).json({ msg: "Data berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
