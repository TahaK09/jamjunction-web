import eventModel from "../models/eventModel.mjs";

export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      venue,
      price,
      capacity,
      organizer,
    } = req.body;

    if (!title || !date || !venue || !price || !capacity) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const event = new eventModel({
      title,
      description,
      date,
      time,
      venue,
      price,
      capacity,
      organizer,
    });

    await event.save();
    res
      .status(201)
      .json({ success: true, message: "Event created successfully", event });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getEvents = async (req, res) => {
  try {
    const { upcoming } = req.query;
    let filter = {};

    if (upcoming === "true") {
      filter.date = { $gte: new Date() }; // only future events
    }

    const events = await eventModel.find(filter).sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await eventModel.findById(id);

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res.status(200).json({ success: true, event });
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await eventModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res.status(200).json({ success: true, event });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
