"use client";

import { MdWhatsapp } from "react-icons/md";
import { useState } from "react";

export default function Component() {
  const [isClicked, setIsClicked] = useState(false);

  const handleWhatsAppClick = () => {
    // Add click animation
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);

    // Replace with your WhatsApp number (include country code without + sign)
    const phoneNumber = "1234567890"; // Replace with your actual WhatsApp number
    const message = "Hello! I need help."; // Default message

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* Fixed WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Ripple Animations */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Outer ripple */}
          <div className="absolute w-20 h-20 rounded-full border-2 border-[#68AC33] animate-ping-slow"></div>
          {/* Middle ripple */}
          <div className="absolute w-16 h-16 rounded-full border-2 border-[#68AC33] animate-ping-medium"></div>
          {/* Inner ripple */}
          <div className="absolute w-12 h-12 rounded-full border-2 border-[#68AC33] animate-ping-fast"></div>
        </div>

        {/* Main WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          className={`relative z-10 w-14 h-14 bg-[#946626] hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 group ${
            isClicked ? "animate-bounce scale-95" : ""
          }`}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-green-400/20 blur-md group-hover:bg-green-400/30 transition-all duration-300"></div>

          {/* WhatsApp Icon */}
          <MdWhatsapp className="w-6 h-6 text-white relative z-10" />

          {/* Click ripple effect */}
          {isClicked && (
            <div className="absolute inset-0 rounded-full bg-white/30 animate-ping"></div>
          )}
        </button>

        {/* Tooltip */}
        <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          Chat with us on WhatsApp
          {/* Tooltip arrow */}
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.4;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }

        @keyframes ping-medium {
          0% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }

        @keyframes ping-fast {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.4);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-ping-medium {
          animation: ping-medium 2s cubic-bezier(0, 0, 0.2, 1) infinite 0.3s;
        }

        .animate-ping-fast {
          animation: ping-fast 2s cubic-bezier(0, 0, 0.2, 1) infinite 0.6s;
        }
      `}</style>
    </>
  );
}
