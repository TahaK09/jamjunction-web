import { Routes, Route } from "react-router-dom";
import Event from "./event/index.jsx";
import Home from "./home/index.jsx";

function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shaan-e-shukoon" element={<Event />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
