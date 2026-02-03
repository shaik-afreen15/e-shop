import express from "express";
import { getMyOrders, createOrder, cancelOrder, deleteOrder } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/my-orders", protect, getMyOrders);
router.post("/", protect, createOrder);
router.patch("/:id/cancel", protect, cancelOrder);
router.delete("/:id", protect, deleteOrder);

export default router;
