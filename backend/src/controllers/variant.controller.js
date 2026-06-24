import {
  createVariant,
  getVariants,
  updateVariant,
  deleteVariant,
} from "../services/variant.service.js";

export const create = async (req, res) => {
  try {
    const variant = await createVariant(req.body);

    res.status(201).json({
      success: true,
      message: "Variant created successfully",
      data: variant,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const variants = await getVariants();

    res.status(200).json({
      success: true,
      data: variants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;

    const variant = await updateVariant(id, req.body);

    res.status(200).json({
      success: true,
      message: "Variant updated successfully",
      data: variant,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const variant = await deleteVariant(id);

    res.status(200).json({
      success: true,
      message: "Variant deleted successfully",
      data: variant,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};