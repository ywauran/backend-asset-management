import Asset from "../models/AssetModel.js";
import path from "path";

export const getAssets = async (req, res) => {
  try {
    const response = await Asset.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
};

export const createAsset = async (req, res) => {
  try {
    if (req.files === null || req.files === undefined)
      return res.status(400).json({ msg: "Belum ada file yang diupload" });

    const { item_name, serial_number } = req.body;
    const { file } = req.files;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedTypes = [".png", ".jpg", ".jpeg"];

    if (!allowedTypes.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Gambar tidak valid" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Gambar harus kurang dari 5 MB" });

    file.mv(`./public/images/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
      try {
        await Asset.create({
          item_name: item_name,
          serial_number: serial_number,
          item_condition: "Baik",
          status: "Tersedia",
          image: fileName,
          url: url,
        });
        res.status(201).json({ msg: "Berhasil menambah data" });
      } catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Kesalahan saat membuat aset" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
};

export const updateAsset = async (req, res) => {
  try {
    const { item_name, serial_number } = req.body;
    const asset = await Asset.findOne({ where: { uuid: req.params.id } });

    if (!asset) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    if (req.files && req.files.file) {
      const { file } = req.files;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      const fileName = file.md5 + ext;
      const allowedTypes = [".png", ".jpg", ".jpeg"];

      if (!allowedTypes.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Gambar tidak valid" });
      }
      if (fileSize > 5000000) {
        return res.status(422).json({ msg: "Gambar harus kurang dari 5 MB" });
      }

      file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) {
          return res.status(500).json({ msg: err.message });
        }

        await asset.update({
          item_name,
          serial_number,
          image: fileName,
          url: `${req.protocol}://${req.get("host")}/images/${fileName}`,
        });

        res.status(200).json({ msg: "Data berhasil diperbarui" });
      });
    } else {
      await asset.update({
        item_name,
        serial_number,
      });

      res.status(200).json({ msg: "Data berhasil diperbarui" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
};

export const deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!asset) return res.status(404).json({ msg: "Data tidak ditemukan" });

    await Asset.destroy({
      where: {
        id: asset.id,
      },
    });

    res.status(200).json({ msg: "Data berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
};
