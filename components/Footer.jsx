"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";
import logo from "../public/assets/images/logo3.png";

const Footer = () => {
  const path = usePathname();
  return (
    <footer
      className={`pt-16 relative z-10 ${
        path === "/escapeDsm" ? "bg-[#f4a56018]" : "bg-[#fff9f5]"
      } `}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid  px-8 grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Company Section */}
          <div>
            <h3 className="text-gray-900 text-lg font-semibold mb-6">
              Company
            </h3>
            <ul className="space-y-4">
              <li>
                <span className="text-gray-600">
                  About us
                </span>
              </li>
              <li>
                <span className="text-gray-600">
                  Contact
                </span>
              </li>
              <li>
                <span className="text-gray-600">
                  Payment options
                </span>
              </li>
            </ul>
          </div>

          {/* One click Section */}
          <div>
            <h3 className="text-gray-900 text-lg font-semibold mb-6">
              One click
            </h3>
            <ul className="space-y-4">
              <li>
                <span className="text-gray-600">
                  Unlock travel styles
                </span>
              </li>
              <li>
                <span className="text-gray-600">
                  Explore destinations
                </span>
              </li>
              <li>
                <span className="text-gray-600">
                  Hike Mt.Kilimanjaro
                </span>
              </li>
              <li>
                <span className="text-gray-600">
                  Streets of DSM
                </span>
              </li>
              <li>
                <span className="text-gray-600">
                  Escape DSM
                </span>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-gray-900 text-lg font-semibold mb-6">Legal</h3>
            <ul className="space-y-4">
              <li>
                <span className="text-gray-600">
                  Terms and Conditions
                </span>
              </li>
              <li>
                <span className="text-gray-600">
                  Privacy policy
                </span>
              </li>
            </ul>
          </div>

          {/* Connect with us Section */}
          <div>
            <h3 className="text-gray-900 text-lg font-semibold mb-6">
              Connect with us
            </h3>
            <ul className="space-y-4">
              <li>
                <span className="text-gray-600">
                  Instagram
                </span>
              </li>
              <li>
                <span className="text-gray-600">
                  Twitter
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex  flex-col md:flex-row mb-4 justify-between items-start md:items-center">
          <div className="flex pl-3 items-center mb-4 md:mb-0">
            <Image src={logo} alt="logo" className="md:h-16 h-16 w-auto" />
          </div>
          <div className="text-gray-600 text-sm text-center pr-8">
            <p>
              Seamless travel experiences for individuals and groups through
              flexible payment options.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div
          className={`text-gray-800 py-9 text-sm text-center font-medium ${
            path === "/escapeDsm" ? "bg-[#F4A460] " : "bg-[#ede5d9] "
          } `}
        >
          © 2025 TrueAfricaEscape. All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
