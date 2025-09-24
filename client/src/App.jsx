import { Routes, Route } from "react-router-dom";
import Event from "./event/index.jsx";
import Home from "./home/index.jsx";
import QRComponent from "./components/custom/qrcode.jsx";
import Pricing from "./components/custom/pricing.jsx";

function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/shaan-e-shukoon"
            element={<Event eventId={"68d1d78ba009977a61bb0637"} />}
          />
          <Route path="/pricing" element={<Pricing />} />
          <Route
            path="/qr/:bookingId"
            element={
              <QRComponent text="https://jamjunctionlucknow.com/verify/asdfdsjfk" />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
