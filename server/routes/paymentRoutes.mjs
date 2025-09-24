import { createOrder, verifyPayment } from "../controllers/payment.mjs";
import express from "express";

const paymentRouter = express.Router();

paymentRouter.post("/order", createOrder);
paymentRouter.post("/verify", verifyPayment);

export default paymentRouter;
