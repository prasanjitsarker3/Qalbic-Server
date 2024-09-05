import express from "express";
import { categoryController } from "./categoryController";
const router = express.Router();
router.post("/created", categoryController.createdCategory);
router.get("", categoryController.allCategory);
router.patch("/:id", categoryController.deletedCategory);

export const categoryRoutes = router;
