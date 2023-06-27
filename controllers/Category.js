import Category from "../models/CategoryModel.js";

export const getCategory = async (req, res) => {
  try {
    const response = await Category.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = async (req, res) => {
  const { title } = req.body;

  try {
    await Category.create({
      title: title,
    });
    res.status(201).json({ msg: "Berhasil menambah Kategori" });
  } catch (error) {}
};

export const deleteCategory = async (req, res) => {
  const category = await Category.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!category) return res.status(404).json({ msg: "Data tidak ditemukan" });

  try {
    await Category.destroy({
      where: {
        id: category.id,
      },
    });
    res.status(200).json({ msg: "Kategori berhasil dihapus" });
  } catch (error) {}
};

export const updatedCategory = async (req, res) => {
  const category = await Category.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!category) return res.status(404).json({ msg: "Data tidak ditemukan" });
  try {
    await Category.update(
      {
        title: title,
      },
      {
        where: {
          id: category.id,
        },
      }
    );
    res.status(200).json({ msg: "Data berhasil diperbarui" });
  } catch (error) {
    console.log(error);
  }
};
