import eventModel from "../models/eventModel.mjs";

export const getEventBySlug = async (req, res) => {
  try {
    const { eventSlug } = req.params;
    const event = await eventModel.findOne({ eventSlug: eventSlug });
    if (!event) {
      return res

        .status(404)
        .json({ success: false, message: "Event not found" });
    }
    res.status(200).json({ success: true, event });
  } catch (error) {
    console.error("Error fetching event by slug:", error);
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
