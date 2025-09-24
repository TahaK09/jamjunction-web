import ticketModel from "../models/ticketModel.mjs";
import Razorpay from "razorpay";
import crypto from "crypto";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Create Order
export const createOrder = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const { amount, currency, receipt } = req.body;
    const options = {
      amount: amount * 100,
      currency: currency || "INR",
      receipt: receipt || `receipt_${Math.random().toString(36).substring(7)}`,
      payment_capture: 1,
    };
    const order = await razorpay.orders.create(options);
    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error("Error creating order:", error);

    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Verify Payment
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET;
    const hash = crypto.createHmac("sha256", secret);
    hash.update(razorpay_order_id + "|" + razorpay_payment_id);
    const digest = hash.digest("hex");
    console.log(digest, razorpay_signature, razorpay_payment_id);
    if (digest !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Transaction not legit!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified",
      payment_id: razorpay_payment_id,
      bookingId: bookingId,
    });

    //Update ticket as paid
    const ticket = await ticketModel.findOne({
      bookingId: bookingId,
    });
    if (ticket) {
      ticket.paymentStatus = "paid";
      ticket.paymentId = razorpay_payment_id;
      await ticket.save();
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
