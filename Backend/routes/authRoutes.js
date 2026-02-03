import express from "express";
import {
  registerUser,
  loginUser,
  resetPassword
} from "../controllers/authController.js";

const router = express.Router();

/* TEST */
router.get("/", (req, res) => {
  res.send("Auth API working");
});

/* ROUTES */
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/reset-password", resetPassword);

export default router;
