import express from "express";
import {
  getAssets,
  createAsset,
  deleteAsset,
  updateAsset,
} from "../controllers/Asset.js";

const router = express.Router();

router.get("/assets", getAssets);
// router.get("/asset/:id", getUserById);
router.post("/asset", createAsset);
router.delete("/asset/:id", deleteAsset);
router.patch("/asset/:id", updateAsset);

export default router;
