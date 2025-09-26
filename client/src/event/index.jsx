import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Person1 from "../assets/person-1.jpg";
import { useParams } from "react-router-dom";
// import Person2 from "../assets/person-2.jpg";
// import Person3 from "../assets/person-3.jpg";
// import Person4 from "../assets/person-4.jpg";

function Event() {
  const { eventSlug } = useParams();
  const [event, setEvent] = useState({});
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/events/slug/${eventSlug}`
        );
        const data = await response.json();
        if (data.success) {
          setEvent(data.event);
        } else {
          console.error("Failed to fetch event details");
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
    if (eventSlug) {
      fetchEvent();
    }
  }, [eventSlug]);
  console.log(event);

  const checkout = async () => {
    navigate(`/event/${eventSlug}/checkout`);
  };

  const handleInvite = async () => {
    const link = `https://jamjunctionlucknow.com/event/${eventSlug}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: event.title,
          text: "Join this amazing event!",
          url: link,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        alert("Copy this link: " + link);
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

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
  const timeFormat = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number); // Destructure and convert to numbers
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  return (
    event && (
      <>
        <div className="flex flex-col w-screen h-full items-center justify-center">
          <div className="w-full h-1/3">
            <img
              className="w-full h-full object-cover"
              src={event.image}
              alt="bg"
            />
          </div>

          <div className="w-full h-2/3 flex flex-col items-center justify-center p-4">
            <div className="text-3xl text-gray-700 font-normal figtree self-start mb-4">
              {event.title}
            </div>
            {/* Time and Location */}
            <div className="text-base figtree self-start flex justify-start items-center gap-1 mt-5 w-full">
              <div className="w-10 h-10 rounded-md bg-violet-100 flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#9d49e5"
                >
                  <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" />
                </svg>
              </div>
              <div className="flex flex-col justify-center items-start">
                <div className="ml-2 text-base text-gray-800 font-medium">
                  {dateFormat(event.date)}
                </div>
                <div className="ml-2 text-sm text-gray-600 font-light">
                  {Day(event.date)}, {timeFormat(event.startTime)} -{" "}
                  {timeFormat(event.endTime)}
                </div>
              </div>
            </div>
            <div className="text-base figtree self-start flex justify-start items-center gap-1 mt-3 w-full">
              <div className="w-10 h-10 rounded-md bg-violet-100 flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#9d49e5"
                >
                  <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
                </svg>
              </div>
              <div className="flex flex-col justify-center items-start">
                <div className="ml-2 text-base text-gray-800 font-medium">
                  {event.location}
                </div>
                <div className="ml-2 text-sm text-gray-600 font-light">
                  {event.venue}
                </div>
              </div>
            </div>
            <div className="text-base figtree self-start flex justify-between items-center gap-1 mt-4 w-full">
              <div className="flex flex-col justify-center items-start">
                <div className=" text-base text-gray-800 font-medium">
                  Event Capacity
                </div>
                <div className=" text-sm text-gray-600 font-light">
                  Total Number of Seats Available
                </div>
              </div>
              <div className="w-20 h-9 rounded-md bg-violet-100 flex justify-center items-center border border-violet-400">
                {event.capacity}
              </div>
            </div>
            {/* About the event */}
            <div className="w-full h-full flex flex-col gap-1 mt-10 mb-30">
              <div className="text-lg font-medium text-gray-800 figtree self-start">
                About Event
              </div>
              <div className="text-sm text-gray-700 font-normal figtree self-start">
                {event.description}
              </div>
            </div>
            {/* Book your tickets */}
            <div className="w-full flex justify-center items-center h-40 bg-gradient-to-b from-transparent via-white to-white fixed bottom-0 left-0 right-0 p-4">
              <button
                onClick={checkout}
                className="flex justify-center items-center gap-6 w-full px-6 h-10 rounded-lg bg-violet-500 hover:bg-violet-600 text-white text-base font-medium figtree mt-6"
              >
                Checkout Tickets
                <div className="bg-violet-800 rounded-full w-6 h-6 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="16px"
                    fill="#FFFFFF"
                  >
                    <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                  </svg>
                </div>
              </button>
            </div>
            {/* Reminder Button - Reminding of the event btn - We will do it by sending whatsapp message of the number*/}
            <div className="w-10 h-10 backdrop-blur-sm absolute top-0 right-0 m-4 rounded-md flex justify-center items-center shadow-lg hover:shadow-xl cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#FFFFFF"
              >
                <path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-800q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Zm0-360Zm112 168 56-56-128-128v-184h-80v216l152 152ZM224-866l56 56-170 170-56-56 170-170Zm512 0 170 170-56 56-170-170 56-56ZM480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720q-117 0-198.5 81.5T200-440q0 117 81.5 198.5T480-160Z" />
              </svg>
            </div>
            {/* Back to home page */}
            <div
              onClick={() => {
                navigate("/");
              }}
              className="w-10 h-10 absolute top-0 left-0 mt-4 ml-2 rounded-md flex justify-center items-center shadow-lg hover:shadow-xl cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#FFFFFF"
              >
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
              </svg>
            </div>
            {/* Invite People Button */}
            <div className="absolute top-36 left-1/2 -translate-x-1/2 h-12 w-2/3 bg-white shadow-lg rounded-full flex justify-between items-center px-2">
              {/* Avatars */}
              <div className="flex items-center">
                <img src={Person1} alt="1" className="rounded-full w-7 h-7" />
                <img
                  src={Person1}
                  alt="2"
                  className="rounded-full w-7 h-7 -ml-4"
                />
                <img
                  src={Person1}
                  alt="3"
                  className="rounded-full w-7 h-7 -ml-4"
                />
              </div>

              {/* Going text */}
              <div className="text-sm font-medium text-violet-800">
                + {event.ticketsSold < 10 ? "10" : event.ticketsSold} Going
              </div>

              {/* Button */}
              <button
                onClick={handleInvite}
                className="bg-violet-600 text-white font-medium text-sm rounded-full px-4 py-1 hover:bg-violet-700 transition ml-1"
              >
                Invite
              </button>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default Event;
