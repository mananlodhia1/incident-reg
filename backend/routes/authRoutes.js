import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshToken,
} from "../controllers/authController.js";

const router = Router();

router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);
router.post("/logout", logoutUser);

export default router;
