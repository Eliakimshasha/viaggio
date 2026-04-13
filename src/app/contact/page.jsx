"use client";
import React, { useRef, useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import Image from "next/image";
import heroImage from "../../../public/assets/images/hero.png";
import office from "../../../public/assets/images/office.png";
import bg from "../../../public/assets/images/bg3.jpg";
import CountrySelect from "../../../components/CountrySelect";
import pic1 from "../../../public/assets/images/li1 (1).png";
import pic2 from "../../../public/assets/images/li1 (3).png";
import pic3 from "../../../public/assets/images/Group.png";
import pic4 from "../../../public/assets/images/Vector.png";

import Link from "next/link";
import { Label } from "../../../components/ui/Label";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    phone: "",
    message: "",
  });

  const [dropdownOpen, setDropdownOpen] = useState({
    gender: false,
    nationality: false,
  });

  const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];
  const countries = [
    "Tanzania",
    "Kenya",
    "Uganda",
    "Rwanda",
    "Burundi",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDropdownSelect = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setDropdownOpen((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const toggleDropdown = (field) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };
  const dateInputRef = useRef(null);

  return (
    <>
      <div className="relative md:h-[90vh] bg-[#fff9f5] h-[50vh] w-full overflow-hidden">
        <Image
          src={heroImage}
          alt="Hero background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      <div className="min-h-screen bg-[#fff9f5] flex flex-col items-center justify-center p-4">
        <h1 className="my-20 font-medium text-black md:text-3xl text-xl text-center">
          Get In Touch With Us. Looking Forward To Hearing From You
        </h1>

        <div className="w-full max-w-5xl md:px-20 md:py-14 bg-white rounded-3xl border border-gray-200 p-8">
          <form className="space-y-8">
            {/* Full Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-3">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-3">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email address"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Date of Birth and Gender Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-3">
                  Date Of Birth
                </label>
                <div className="relative">
                  <input
                    ref={dateInputRef}
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    placeholder="DD -MM - YYYY"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-12 
        [&::-webkit-calendar-picker-indicator]:opacity-0 
        [&::-webkit-calendar-picker-indicator]:absolute 
        [&::-webkit-calendar-picker-indicator]:w-full 
        [&::-webkit-calendar-picker-indicator]:h-full 
        [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                  <Calendar
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer pointer-events-none"
                    onClick={() => dateInputRef.current?.showPicker()}
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-3">
                  Gender
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleDropdown("gender")}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-left flex items-center justify-between"
                  >
                    <span>{formData.gender || "Select Gender"}</span>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </button>
                  {dropdownOpen.gender && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                      {genderOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleDropdownSelect("gender", option)}
                          className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Nationality and Phone Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="nationality" className="text-gray-700">
                  Nationality
                </Label>
                <CountrySelect
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      nationality: value,
                    }))
                  }
                  value={formData.nationality}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-3">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="E.g +255 743 404 942"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-3">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Anything you would like us to know about you"
                rows={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                className="px-8 py-3 bg-gray-200 text-gray-600 rounded-xl hover:bg-gray-300 transition-colors duration-200 text-sm font-medium"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="relative md:h-[90vh] h-[50vh] w-full overflow-hidden">
        <Image
          src={bg}
          alt="Hero background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="absolute inset-0 bg-white/70 z-10"></div>
        <div className="absolute inset-0 flex items-center flex-col justify-center z-20 text-black font-medium">
          <h1 className="text-3xl md:text-5xl ">
            Viaggio Tanzania Head Office
          </h1>
          <p className="text-lg md:text-3xl py-3">Tanzanite Park, 12th Floor</p>
          <p className="text-lg md:text-2xl">Arusha, Tanzania</p>
          <div className="flex gap-8 py-6">
            <Link href="https://www.instagram.com/True Africa Escapetz">
              <Image
                src={pic1}
                alt="link"
                className="w-6 h-6"
                width={20}
                height={20}
              />
            </Link>
            <Link href="https://x.com/True Africa Escapetz">
              <Image
                src={pic2}
                alt="link"
                className="w-6 h-6"
                width={20}
                height={20}
              />
            </Link>{" "}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=reuben@True Africa Escapetz.com"
              target="_blank"
            >
              <Image
                src={pic3}
                alt="link"
                className="w-6 h-6"
                width={20}
                height={20}
              />
            </a>
            <Link href="https://maps.app.goo.gl/RJpAr3cBsqSuguTU8">
              <Image
                src={pic4}
                alt="link"
                className="w-6 h-6"
                width={20}
                height={20}
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
