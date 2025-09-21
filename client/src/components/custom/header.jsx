import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="w-full h-16 flex justify-between items-center px-8 fixed top-0 left-0 z-50 text-white ">
      <Link to="/">
        <div className="text-base font-normal text-white figtree cursor-pointer">
          Home
        </div>
      </Link>
      /
      <Link to="/">
        <div className="text-base font-normal text-white figtree cursor-pointer">
          My Tickets
        </div>
      </Link>
      /
      <Link to="/shaan-e-shukoon">
        <div className="text-base font-normal text-white figtree cursor-pointer">
          Events
        </div>
      </Link>
    </div>
  );
}

export default Header;
