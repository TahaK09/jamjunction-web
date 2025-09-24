import ticketModel from "../models/ticketModel.mjs";
import eventModel from "../models/eventModel.mjs";
import QRCode from "qrcode";
import crypto from "crypto";
import mongoose from "mongoose";
/**
 * Book Ticket Controller
 * 1. Validate event
 * 2. Create ticket in DB with pending status
 * 3. (Later: redirect/initiate payment with gateway like Razorpay/Stripe)
 * 4. On payment success webhook → confirm ticket, generate QR
 */

export const bookTicket = async (req, res) => {
  try {
    const { eventId, orderId, quantity, price } = req.body;

    // const event = await eventModel.findById(eventId);
    // if (!event) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "Event not found" });
    // }

    // 2. Generate bookingId from Mongo ObjectId
    // const bookingId = "EVT-" + orderId.toString().slice(-6).toUpperCase();

    // 3. Create new ticket in DB (paymentStatus pending initially)
    const ticket = new ticketModel({
      eventId,
      bookingId: `EVT-${orderId.replace("order_", "").toUpperCase()}`,
      quantity: quantity || 1,
      price,
      orderId,
      paymentStatus: "pending",
    });

    // 5. Generate QR code (link for verification or bookingId)
    const baseUrl = process.env.BASE_URL || "http://localhost:5000";
    // const qrData = `${baseUrl}/verify/${ticket._id}`;
    // const qrCode = await QRCode.toDataURL(qrData);

    // Update ticket with QR code
    // ticket.qrCode = qrCode;
    await ticket.save();

    //   Check if event has enough capacity
    // if (event.ticketsSold + (quantity || 1) > event.capacity) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Event is sold out or not enough tickets left",
    //   });
    // }
    // Increment tickets sold
    // event.ticketsSold += quantity || 1;
    // await event.save();

    // 6. Respond with ticket details
    return res.status(201).json({
      success: true,
      message: "Ticket created. Proceed to payment.",
      ticket: {
        id: ticket._id,
        bookingId: ticket.bookingId,
        price: ticket.price,
        orderId,
        paymentStatus: ticket.paymentStatus,
      },
    });
  } catch (error) {
    console.error("Error booking ticket:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await ticketModel.find().populate("eventId");

    return res.status(200).json({ success: true, tickets });
  } catch (error) {
    console.error("Error fetching ticket:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getTicketByBookingId = async (req, res) => {
  try {
    const { bookingId } = req.params;
    if (!bookingId) {
      return res

        .status(400)
        .json({ success: false, message: "Booking ID is required" });
    }
    const ticket = await ticketModel
      .findOne({ bookingId: bookingId })
      .populate("eventId");
    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });
    }
    return res.status(200).json({ success: true, ticket });
  } catch (error) {
    console.error("Error fetching ticket by bookingId:", error);
    return res

      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
