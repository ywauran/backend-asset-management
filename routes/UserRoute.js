import express from "express";
import { getUsers, getUserById, createUser } from "../controllers/User.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/user/:id", getUserById);
router.post("/user", createUser);

export default router;
