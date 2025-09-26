import express from "express";
import {
  getEvents,
  getEventById,
  getEventBySlug,
} from "../controllers/event.mjs";

const eventRouter = express.Router();

eventRouter.get("/", getEvents);
eventRouter.get("/slug/:eventSlug", getEventBySlug);
eventRouter.get("/:id", getEventById);

export default eventRouter;
