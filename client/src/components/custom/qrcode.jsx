import React from "react";
import QRCode from "react-qr-code";

const QRComponent = ({ text }) => {
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
                20th September, 2025
              </div>
              <div className="ml-2 text-sm text-gray-200 font-light">
                Friday, 6:00 PM - 10:00 PM
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="p-4 bg-white rounded-xl mt-5">
            <QRCode value={text} size={150} />
          </div>

          {/* Seat Details /Floor Details */}
          <div className="text-sm text-gray-300 font-medium figtree">
            Jasan-e-sukoon
          </div>

          <div className="h-px mt-3 border-dashed border-b-2 border-[#373737] w-full"></div>

          <div className="text-center flex flex-col items-center justify-center gap-1">
            <div className="text-base font-medium text-white figtree">
              HONS Cafe, Hazratganj, Lucknow
            </div>
            <div className="text-sm font-medium text-gray-400 figtree">
              Booking ID: FDIS#3DS
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QRComponent;
