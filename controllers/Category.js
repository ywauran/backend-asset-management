import Category from "../models/CategoryModel.js";

export const getCategory = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({ data: categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
};

export const createCategory = async (req, res) => {
  const { title } = req.body;

  try {
    await Category.create({ title });
    res.status(201).json({ message: "Kategori berhasil dibuat" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findOne({ where: { uuid: id } });
    if (!category) {
      return res.status(404).json({ error: "Kategori tidak ditemukan" });
    }

    await Category.destroy({ where: { id: category.id } });
    res.status(200).json({ message: "Kategori berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const category = await Category.findOne({ where: { uuid: id } });
    if (!category) {
      return res.status(404).json({ error: "Kategori tidak ditemukan" });
    }

    await Category.update({ title }, { where: { id: category.id } });
    res.status(200).json({ message: "Kategori berhasil diperbarui" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
};
