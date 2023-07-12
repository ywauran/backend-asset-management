import express from "express";
import {
  getAllLoans,
  returnAsset,
  createLoan,
  getAllLoansByUserId,
} from "../controllers/Loan.js";

const router = express.Router();

router.get("/loans", getAllLoans);
router.get("/loans-user/:id", getAllLoansByUserId);
router.post("/loan", createLoan);
router.patch("/return-asset/:id", returnAsset);

export default router;
