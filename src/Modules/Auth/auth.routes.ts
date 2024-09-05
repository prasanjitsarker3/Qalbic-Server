import express from "express";
import validationRequest from "../../Middleware/validationRequest";
import { userLoginSchema, userRegistrationSchema } from "./authValidation";
import { authController } from "./authController";
import auth from "../../Middleware/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/register",
  validationRequest(userRegistrationSchema),
  authController.userRegister
);
router.post(
  "/login",
  validationRequest(userLoginSchema),
  authController.userLogin
);
router.post("/refreshToken", authController.refreshToken);
router.post(
  "/change-password",
  auth(UserRole.ADMIN, UserRole.SUPPER_ADMIN, UserRole.USER),
  authController.changePassword
);

export const authRoutes = router;
