import {
  bookTicket,
  getAllTickets,
  getTicketByBookingId,
} from "../controllers/ticket.mjs";
import express from "express";

const ticketRouter = express.Router();
ticketRouter.post("/book", bookTicket);
ticketRouter.get("/", getAllTickets);
ticketRouter.get("/:bookingId", getTicketByBookingId);

export default ticketRouter;
