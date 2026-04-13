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
                <a
                  href="about"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="contact"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="pricing"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Payment options
                </a>
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
                <a
                  href="travel-style"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Unlock travel styles
                </a>
              </li>
              <li>
                <a
                  href="destinations"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Explore destinations
                </a>
              </li>
              <li>
                <a
                  href="kilimanjaro"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Hike Mt.Kilimanjaro
                </a>
              </li>
              <li>
                <a
                  href="dsm-experiences"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Streets of DSM
                </a>
              </li>
              <li>
                <a
                  href="escape-dsm"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Escape DSM
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-gray-900 text-lg font-semibold mb-6">Legal</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="terms"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a
                  href="privacy"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Privacy policy
                </a>
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
                <a
                  href="https://www.instagram.com/True Africa Escapetz"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/True Africa Escapetz"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Twitter
                </a>
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
