"use client";

import React, { useRef, useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import CountrySelect from "../../../../components/CountrySelect";

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

  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState({
    gender: false,
    nationality: false,
  });

  const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // router.push("/dashboard")
    alert("Form submitted successfully!");
  };

  const dateInputRef = useRef(null);

  return (
    <div className="min-h-screen items-center flex flex-col justify-center p-4 bg-gray-50">
      <div className="w-[90%] max-w-4xl">
        <h1 className="my-6 text-start text-black md:text-xl text-lg font-semibold">
          Finalize creating your account with one more last Step
        </h1>
        <div className="w-full md:px-20 md:py-7 bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Full Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                  required
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                  required
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white pr-12"
                    required
                  />
                  <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer pointer-events-none" />
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-left flex items-center justify-between"
                  >
                    <span
                      className={
                        formData.gender ? "text-gray-700" : "text-gray-400"
                      }
                    >
                      {formData.gender || "Select Gender"}
                    </span>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </button>
                  {dropdownOpen.gender && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                      {genderOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleDropdownSelect("gender", option)}
                          className="w-full px-4 py-3 text-left text-sm text-gray-700 bg-white hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl transition-colors"
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
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-3">
                  Nationality
                </label>
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                  required
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
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-black text-white rounded-xl hover:bg-gray-700 transition-colors duration-200 text-sm font-medium shadow-sm"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
