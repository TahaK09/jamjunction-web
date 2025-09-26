import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";

const QRComponent = () => {
  const { bookingId } = useParams();
  const [ticketDetails, setTicketDetails] = useState([]);
  const [eventDetails, setEventDetails] = useState([]);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/tickets/${bookingId}`
        );
        const data = await response.json();
        if (data.success) {
          setTicketDetails(data.ticket);
        } else {
          console.error("Failed to fetch ticket details");
        }
      } catch (error) {
        console.error("Error fetching ticket details:", error);
      }
    };
    if (bookingId) {
      fetchTicketDetails();
    }
  }, [bookingId]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/events/${ticketDetails?.eventId?._id}`
        );
        const data = await response.json();
        console.log(data.event);
        if (data.success) {
          setEventDetails(data.event);
        } else {
          console.error("Failed to fetch event details");
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
    fetchEventDetails();
  }, [ticketDetails]);

  const dateFormat = (dateStr) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };
  const Day = (eventDate) => {
    const date = new Date(eventDate);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayIndex = date.getUTCDay();
    return days[dayIndex];
  };

  return (
    <>
      <div className="bg-gray-800 w-screen h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4 bg-black p-6 rounded-xl border border-gray-400  bg-[url('../../assets/magic-pattern.png')] bg-cover bg-center">
          {/* Branding */}
          <div className="flex flex-col items-center justify-center gap z-1000">
            <div className="text-white font-medium text-3xl asimovian-regular">
              JamJunction
            </div>
            {/* here we'll have the events partner or simply "Event Ticket" */}
            <div className="text-gray-300 font-bold text-[12px] figtree">
              with WTF & Co.
            </div>
          </div>

          <div className="bg-gradient-to-r from-transparent via-white to-transparent h-px w-full "></div>

          <div className="text-base figtree self-start flex justify-start items-center gap-1 w-full">
            <div className="w-10 h-10 rounded-md bg-white flex justify-center items-center overflow-hidden">
              <img
                src="https://media.licdn.com/dms/image/v2/D4D0BAQEDZc6qvmi3UQ/company-logo_200_200/B4DZlY9rP8IYAI-/0/1758134187805?e=1761177600&v=beta&t=0tnt73wCJbp6ZrUQgEwhu8m-HoqZ62fdFSHSeVUQ_Hs"
                alt="JJL"
              />
            </div>
            <div className="flex flex-col justify-center items-start">
              <div className="ml-2 text-base text-gray-100 font-medium">
                {dateFormat(eventDetails.date)}
              </div>
              <div className="ml-2 text-sm text-gray-200 font-light">
                {Day(eventDetails.date)}, {eventDetails.startTime} -{" "}
                {eventDetails.endTime}
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="p-4 bg-white rounded-xl mt-5">
            <QRCode
              value={`http://localhost:5174/api/tickets/validate/${bookingId}`}
              size={150}
            />
          </div>

          {/* Seat Details /Floor Details */}
          <div className="text-sm text-gray-300 font-medium figtree">
            {eventDetails.title}
          </div>

          <div className="h-px mt-3 border-dashed border-b-2 border-[#373737] w-full"></div>

          <div className="text-center flex flex-col items-center justify-center gap-1">
            <div className="text-base font-medium text-white figtree">
              {eventDetails?.eventId?.venue}
            </div>
            <div className="text-sm font-medium text-gray-400 figtree">
              Booking ID: {ticketDetails?.bookingId}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QRComponent;
