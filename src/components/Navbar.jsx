import React, { useState } from "react";
import nav_logo from "../assets/logo.png";
import { useNavigate } from "react-router";

function Navbar() {
  const navigate = useNavigate();
  const [openPrint, setOpenPrint] = useState(false);
  const [openSession, setOpenSession] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#141414]/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex justify-between items-center h-[55.56px]">
        {/* Logo */}
        <div className="flex items-center">
          <img src={nav_logo} alt="Logo" className="w-36 lg:w-60" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-8 items-center text-[16px] font-light text-[#D6D1CE]">
          <li onClick={() => navigate("/")} className="cursor-pointer relative group">
            <span className="hover:text-[#E6C2A1] transition-colors duration-300">Home</span>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#E6C2A1] group-hover:w-full transition-all duration-300"></span>
          </li>
          <li onClick={() => navigate("/about-us")} className="cursor-pointer relative group">
            <span className="hover:text-[#E6C2A1] transition-colors duration-300">About Us</span>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#E6C2A1] group-hover:w-full transition-all duration-300"></span>
          </li>

          {/* Sessions Dropdown */}
          <li
            className="relative cursor-pointer group"
            onMouseEnter={() => setOpenSession(true)}
            onMouseLeave={() => setOpenSession(false)}
          >
            <span className="hover:text-[#E6C2A1] transition-colors duration-300">Sessions ▾</span>
            {openSession && (
              <ul className="absolute top-full left-0 bg-white/80 backdrop-blur-md shadow-lg rounded-md w-64 py-2 z-50">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800 transition-colors duration-200">Newborn</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800 transition-colors duration-200">Kids Photography</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800 transition-colors duration-200">Family Session</li>
              </ul>
            )}
          </li>

          {/* Photo Print Dropdown */}
          <li
            className="relative cursor-pointer group"
            onMouseEnter={() => setOpenPrint(true)}
            onMouseLeave={() => setOpenPrint(false)}
          >
            <span className="hover:text-[#E6C2A1] transition-colors duration-300">Photo Print ▾</span>
            {openPrint && (
              <ul className="absolute top-full left-0 bg-white/80 backdrop-blur-md shadow-lg rounded-md w-64 py-2 z-50">
                <li
                  onClick={() => navigate("/standard-photo-print")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800 transition-colors duration-200"
                >
                  Standard Photo Print
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800 transition-colors duration-200">Canvas Print</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800 transition-colors duration-200">Frame Print</li>
              </ul>
            )}
          </li>

          <li className="cursor-pointer relative group">
            <span className="hover:text-[#E6C2A1] transition-colors duration-300">Maternity</span>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#E6C2A1] group-hover:w-full transition-all duration-300"></span>
          </li>
          <li className="cursor-pointer relative group">
            <span className="hover:text-[#E6C2A1] transition-colors duration-300">Cake Smash</span>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#E6C2A1] group-hover:w-full transition-all duration-300"></span>
          </li>
          <li className="cursor-pointer relative group">
            <span className="hover:text-[#E6C2A1] transition-colors duration-300">Contact</span>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#E6C2A1] group-hover:w-full transition-all duration-300"></span>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-200 focus:outline-none text-2xl p-1"
          >
            {mobileMenuOpen ? "✕" : "☰"} {/* Clean minimal icons */}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <ul className="lg:hidden bg-[#141414]/95 backdrop-blur-md shadow-md flex flex-col gap-3 py-4 px-6 text-[#D6D1CE] font-light">
          <li onClick={() => { navigate("/"); setMobileMenuOpen(false); }}>Home</li>
          <li onClick={() => { navigate("/about-us"); setMobileMenuOpen(false); }}>About Us</li>

          {/* Mobile Sessions Dropdown */}
          <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="cursor-pointer py-1">Sessions</summary>
              <ul className="pl-4 mt-2 flex flex-col gap-2">
                <li>Newborn</li>
                <li>Kids Photography</li>
                <li>Family Session</li>
              </ul>
            </details>
          </li>

          {/* Mobile Photo Print Dropdown */}
          <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="cursor-pointer py-1">Photo Print</summary>
              <ul className="pl-4 mt-2 flex flex-col gap-2">
                <li onClick={() => navigate("/standard-photo-print")}>Standard Photo Print</li>
                <li>Canvas Print</li>
                <li>Frame Print</li>
              </ul>
            </details>
          </li>

          <li>Maternity</li>
          <li>Cake Smash</li>
          <li>Contact</li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
