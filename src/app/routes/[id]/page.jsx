"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Users,
  Calendar,
  Plane,
  Home,
  FileText,
  DollarSign,
  Navigation,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import Image from "next/image";
import distance from "../../../../public/assets/images/distance.png";
import { routeData } from "../../../../components/data/routeData";

import BG from "../../../../public/assets/images/Frame 42.png";
export default function RouteDetail() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [dayTabValue, setDayTabValue] = useState(0);
  const [contentTabValue, setContentTabValue] = useState(0);
  const [selectedPeople, setSelectedPeople] = useState("1 people");
  const [showPeopleDropdown, setShowPeopleDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Select date");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());

  const route = routeData[id];

  if (!route) {
    return (
      <div className="container mx-auto px-4">
        <h1 className="text-4xl mt-8">Route not found</h1>
      </div>
    );
  }

  const getCurrentRouteData = () => {
    if (route.hasMultipleDays) {
      const dayOptions = Object.keys(route.variants);
      const selectedDayOption = dayOptions[dayTabValue];
      return route.variants[selectedDayOption];
    }
    return route;
  };

  const currentData = getCurrentRouteData();

  // Fixed pricing logic to use group-based pricing
  const getCurrentPrice = () => {
    const totalPeople = adults + children;

    if (totalPeople === 0) return 0;

    // Find the appropriate pricing tier based on total people
    let selectedPricing = null;

    for (const pricing of currentData.pricing) {
      const group = pricing.group.toLowerCase();

      if (group.includes("person") || group.includes("people")) {
        // Extract number from group string (e.g., "1 person", "2-4 people")
        const numbers = group.match(/\d+/g);
        if (numbers) {
          if (numbers.length === 1) {
            // Single number like "1 person"
            const groupSize = parseInt(numbers[0]);
            if (totalPeople === groupSize) {
              selectedPricing = pricing;
              break;
            }
          } else if (numbers.length === 2) {
            // Range like "2-4 people"
            const minSize = parseInt(numbers[0]);
            const maxSize = parseInt(numbers[1]);
            if (totalPeople >= minSize && totalPeople <= maxSize) {
              selectedPricing = pricing;
              break;
            }
          }
        }
      }
    }

    // If no exact match found, use the closest or largest group pricing
    if (
      !selectedPricing &&
      currentData.pricing &&
      currentData.pricing.length > 0
    ) {
      selectedPricing = currentData.pricing[currentData.pricing.length - 1]; // Use largest group as fallback
    }

    return selectedPricing ? selectedPricing.price : 0;
  };

  const handleDayTabChange = (newValue) => {
    setDayTabValue(newValue);
  };

  const handleContentTabChange = (newValue) => {
    setContentTabValue(newValue);
  };

  const handlePaymentClick = (paymentType) => {
    // Get the correct duration based on route type
    let duration;
    if (route.hasMultipleDays) {
      duration = currentData.duration; // Use current variant's duration
    } else if (route.duration) {
      duration = route.duration;
    } else if (route.blackBg) {
      duration = route.blackBg;
    } else {
      duration = "1 Day"; // Default fallback
    }

    const queryParams = new URLSearchParams({
      routeId: id,
      paymentType: paymentType,
      people: getTotalPeople().toString(),
      date: selectedDate,
      price: getCurrentPrice().toString(),
      routeName: route.name,
      duration: duration,
      description: currentData.description || "",
      packageIncludes: route.inclusions
        ? route.inclusions
            .slice(0, 3)
            .map((item) => item.text)
            .join(", ")
        : "Meals, Transport, Professional Guides",
    });

    router.push(`/payments?${queryParams.toString()}`);
  };

  const getPeopleText = () => {
    const total = getTotalPeople();
    if (total === 0) return "Select guests";

    const parts = [];
    if (adults > 0) parts.push(`${adults} Adult${adults > 1 ? "s" : ""}`);
    if (children > 0)
      parts.push(`${children} Child${children > 1 ? "ren" : ""}`);

    return parts.join(", ");
  };

  const incrementCount = (type) => {
    if (type === "adults") {
      setAdults((prev) => prev + 1);
    } else {
      setChildren((prev) => prev + 1);
    }
  };

  const decrementCount = (type) => {
    if (type === "adults") {
      setAdults((prev) => Math.max(0, prev - 1));
    } else {
      setChildren((prev) => Math.max(0, prev - 1));
    }
  };

  // Improved calendar generation with proper month/year handling
  const generateCalendarDates = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Get first day of the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Get the day of week for the first day (0 = Sunday)
    const firstDayOfWeek = firstDay.getDay();

    // Generate calendar grid
    const dates = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      dates.push(null);
    }

    // Add all days of the current month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const currentDate = new Date(year, month, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Only include dates from today onwards
      if (currentDate >= today) {
        dates.push(currentDate);
      } else {
        dates.push(null); // Past dates as null
      }
    }

    return dates;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDateShort = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getTotalPeople = () => {
    return adults + children;
  };

  const navigateCalendar = (direction) => {
    setCurrentCalendarDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const calendarDates = generateCalendarDates(currentCalendarDate);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const contentTabs = [
    ...(route.showTabDescription !== false ? ["Description"] : []),
    "Itinerary",
    ...(route.showPriceTab ? ["Price"] : []), // Changed from !== false to just truthy check
    "Inclusion",
    "Exclusion",
  ];

  return (
    <div className="bg-gray-50 min-h-screen md:px-4">
      {/* Header */}
      <div className="bg-gray-50 pt-8 pb-4">
        <div className="text-black mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 gap-6">
            <div className="flex-1">
              <h1 className="text-4xl md:mb-12 md:text-5xl font-bold mb-4 mt-5 md:mt-0">
                {route.name}
              </h1>

              {/* Day Selection Tabs */}
              {(route.hasMultipleDays ||
                (route.whiteBg && route.blackBg) ||
                route.duration) && (
                <div className="flex flex-wrap gap-4 mb-6">
                  {route.hasMultipleDays ? (
                    Object.keys(route.variants).map((dayOption, index) => (
                      <button
                        key={dayOption}
                        onClick={() => handleDayTabChange(index)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                          dayTabValue === index
                            ? "bg-[#25563d] text-white"
                            : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {route.variants[dayOption].duration} route
                      </button>
                    ))
                  ) : route.whiteBg && route.blackBg ? (
                    <>
                      <div className="px-6 py-2 rounded-full text-sm font-medium bg-white border border-gray-300 text-gray-700">
                        {route.blackBg}
                      </div>
                      <div className="px-6 py-2 rounded-full text-sm font-medium bg-[#25563d] text-white">
                        {route.whiteBg}
                      </div>
                    </>
                  ) : (
                    <div className="px-6 py-2 rounded-full text-sm font-medium bg-white border border-gray-300 text-gray-700">
                      {route.duration}
                    </div>
                  )}
                </div>
              )}

              <p className="text-black leading-relaxed mb-8 max-w-4xl md:leading-[40px] md:text-lg">
                {currentData.description}
              </p>
            </div>

            {/* Booking Card */}
            <div className="w-full lg:ml-8 lg:w-[400px] bg-white rounded-xl shadow-lg p-6 relative">
              <div className="text-2xl font-bold mb-6">
                ${getCurrentPrice().toLocaleString()} / person
              </div>

              {/* People Selector */}
              <div className="mb-4 relative">
                <div
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300"
                  onClick={() => setShowPeopleDropdown(!showPeopleDropdown)}
                >
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-gray-500 mr-3" />
                    <span>{getPeopleText()}</span>
                  </div>
                  {showPeopleDropdown ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>

                {showPeopleDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="p-4 space-y-4">
                      {/* Adults */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Adults</div>
                          <div className="text-sm text-gray-500">Age 13+</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => decrementCount("adults")}
                            disabled={adults <= 0}
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{adults}</span>
                          <button
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                            onClick={() => incrementCount("adults")}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      {/* <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Children</div>
                          <div className="text-sm text-gray-500">Ages 2-12</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => decrementCount("children")}
                            disabled={children <= 0}
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{children}</span>
                          <button
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                            onClick={() => incrementCount("children")}
                          >
                            +
                          </button>
                        </div>
                      </div> */}

                      <div className="pt-2">
                        <button
                          className="w-full bg-[#946626] text-white py-2 px-4 rounded-lg"
                          onClick={() => setShowPeopleDropdown(false)}
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Date Selector */}
              <div className="mb-6 relative">
                <div
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300"
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-500 mr-3" />
                    <span>{selectedDate || "Select date"}</span>
                  </div>
                  {showCalendar ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>

                {showCalendar && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 w-80">
                    <div className="p-4">
                      {/* Calendar Header */}
                      <div className="flex items-center justify-between mb-4">
                        <button
                          onClick={() => navigateCalendar(-1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <h3 className="font-semibold text-gray-900">
                          {monthNames[currentCalendarDate.getMonth()]}{" "}
                          {currentCalendarDate.getFullYear()}
                        </h3>
                        <button
                          onClick={() => navigateCalendar(1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <ChevronRight className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>

                      {/* Days of week header */}
                      <div className="grid grid-cols-7 gap-1 text-xs text-gray-500 mb-2">
                        <div className="text-center p-2 font-medium">Sun</div>
                        <div className="text-center p-2 font-medium">Mon</div>
                        <div className="text-center p-2 font-medium">Tue</div>
                        <div className="text-center p-2 font-medium">Wed</div>
                        <div className="text-center p-2 font-medium">Thu</div>
                        <div className="text-center p-2 font-medium">Fri</div>
                        <div className="text-center p-2 font-medium">Sat</div>
                      </div>

                      {/* Calendar dates */}
                      <div className="grid grid-cols-7 gap-1">
                        {calendarDates.map((date, index) => (
                          <div key={index} className="aspect-square">
                            {date ? (
                              <button
                                className="w-full h-full text-sm rounded hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-center"
                                onClick={() => {
                                  setSelectedDate(formatDate(date));
                                  setShowCalendar(false);
                                }}
                              >
                                {date.getDate()}
                              </button>
                            ) : (
                              <div className="w-full h-full"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-900">Guest Price</span>
                  <span className="text-gray-900">
                    ${(getCurrentPrice() * getTotalPeople()).toLocaleString()}
                  </span>
                </div>

                {getTotalPeople() > 0 && (
                  <>
                    <div className="text-sm text-gray-500 mb-4">
                      For {getTotalPeople()}{" "}
                      {getTotalPeople() === 1 ? "person" : "people"}
                    </div>
                    <hr className="border-gray-200 mb-4" />
                    <div className="flex justify-between items-center font-semibold">
                      <span>Total</span>
                      <span>
                        {" "}
                        $
                        {(
                          getCurrentPrice() * getTotalPeople()
                        ).toLocaleString()}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Payment Buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => handlePaymentClick("full")}
                  className="flex-1 bg-[#25563d] text-white py-3 px-4 rounded-full text-sm font-medium hover:bg-sky-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={getTotalPeople() === 0 || !selectedDate}
                >
                  Pay Full Amount
                </button>
                <button
                  onClick={() => handlePaymentClick("installment")}
                  className="flex-1 bg-[#946626] text-white py-3 px-4 rounded-full text-sm font-medium hover:bg-[#7a4f1f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={getTotalPeople() === 0 || !selectedDate}
                >
                  Pay in Installments
                </button>
              </div>

              {/* Click outside handler */}
              {(showPeopleDropdown || showCalendar) && (
                <div
                  className="fixed inset-0 z-5"
                  onClick={() => {
                    setShowPeopleDropdown(false);
                    setShowCalendar(false);
                  }}
                />
              )}
            </div>
          </div>

          {/* Content Tabs */}
          <div className="border-b border-gray-200 md:border-none md:pt-2 md:bg-white md:shadow-xl md:rounded-full md:my-9 md:mt-16 pb-3 md:pb-2 mb-6 md:px-5 w-full">
            <div className="relative">
              <div className="absolute left-0 top-0 md:hidden bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 md:hidden w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-2 md:justify-between min-w-max px-2 py-1 md:items-center">
                  {contentTabs.map((tab, index) => (
                    <button
                      key={index}
                      onClick={() => handleContentTabChange(index)}
                      className={`px-6 md:px-14 py-1 text-base font-medium rounded-full transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                        contentTabValue === index
                          ? "bg-[#25563d] text-white shadow-lg transform scale-105"
                          : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Description Tab */}
        {route.showTabDescription !== false && contentTabValue === 0 && (
          <div className="py-4 sm:py-6">
            <p className="text-base sm:text-lg md:text-lg text-gray-800 leading-relaxed md:leading-[40px] md:mb-16">
              {currentData.tabDescription}
            </p>
          </div>
        )}

        {/* Itinerary Tab */}
        {contentTabValue === (route.showTabDescription !== false ? 1 : 0) && (
          <div className="py-4 sm:py-6">
            {currentData.itinerary?.map((day, index) => {
              const cardColors = [
                "#F3FFF2",
                "#F3FFF2",
                "#F3FFF2",
                "#F3FFF2",
                "#F3FFF2",
                "#F3FFF2",
                "#F3FFF2",
                "#F3FFF2",
              ];
              const bgColor = cardColors[index % cardColors.length];
              return (
                <div
                  key={index}
                  className="relative h-fit overflow-hidden rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 p-4 py-11 sm:p-6 lg:p-8 xl:p-10"
                  style={{ backgroundColor: bgColor }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4 sm:gap-6 lg:gap-8 relative z-10 h-full">
                    <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6 flex-1 min-h-0">
                      <div className="flex gap-3 sm:gap-4 items-center flex-wrap">
                        <span className="inline-flex items-center px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-[#2E492E] text-white rounded-full text-sm sm:text-base font-bold whitespace-nowrap">
                          Day {day.day}
                        </span>
                        <div className="bg-[#f1f7f1] backdrop-blur-sm rounded-full px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 flex-1 min-w-0">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <Image
                              src={distance}
                              alt="Distance"
                              className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                            />
                            <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-gray-900 leading-tight truncate">
                              {day.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 flex items-start lg:items-center overflow-hidden">
                        <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                          <p className="text-[#2E492E] md:leading-[40px] md:mt-7 lg:text-base xl:text-lg leading-relaxed font-medium line-clamp-none">
                            {day.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    {day.image && (
                      <div className="w-full lg:w-[45%] xl:w-[50%] flex-shrink-0">
                        <div className="h-full flex flex-col justify-center lg:justify-end">
                          <div className="h-[320px] lg:px-7 px-6 flex justify-center items-center sm:h-[320px] z-20 md:h-[400px] lg:h-[400px] xl:h-[400px] relative">
                            <Image
                              src={BG}
                              alt={`Day ${day.day} illustration`}
                              fill
                              className="h-full w-auto absolute left-0 top-0 z-30"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 40vw"
                            />
                            <div className="absolute inset-0 bg-white/70 z-40"></div>

                            <div
                              className="relative text-gray-800 w-full z-50 md:text-4xl text-2xl  flex flex-col gap-8 lg:gap-8  font-bolder"
                              style={{ fontWeight: "700" }}
                            >
                              {/* <div className="flex items-start gap-2">
                                <h1 className="flex-1"> Altitude:</h1>
                                <h1>{day.Altitude || day.altitude}</h1>
                              </div> */}
                              <h1 className="flex-1">
                                Altitude: {day.Altitude || day.altitude}
                              </h1>
                              <h1> Hiking Distance : {day.distance}</h1>
                              <h1> Hiking Time : {day.time}</h1>
                              <h1> Habitat: {day.habitat}</h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Price Tab */}
        {route.showPriceTab &&
          contentTabValue === (route.showTabDescription !== false ? 2 : 1) && (
            <div className="py-4 sm:py-6 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 px-2 text-gray-900">
                The more you climb together, the more rewarding it becomes
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 px-2">
                Our pricing is designed to encourage shared adventure.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
                {currentData.pricing?.map((pricing, index) => (
                  <div
                    key={index}
                    className={`p-4 sm:p-6 text-center rounded-lg shadow-sm ${
                      index === 0
                        ? "bg-orange-50"
                        : index === 1
                        ? "bg-blue-50"
                        : index === 2
                        ? "bg-pink-50"
                        : index === 3
                        ? "bg-purple-50"
                        : "bg-green-50"
                    }`}
                  >
                    <div className="flex items-center justify-center mb-3 sm:mb-4">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-600" />
                      <span className="text-gray-600 text-xs sm:text-sm">
                        {pricing.group}
                      </span>
                    </div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                      ${pricing.price.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Inclusion Tab */}
        {contentTabValue ===
          (route.showTabDescription !== false
            ? route.showPriceTab !== false
              ? 3
              : 2
            : route.showPriceTab !== false
            ? 2
            : 1) && (
          <div className="py-4 sm:py-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-gray-900">
              Package Includes
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {route.inclusions?.map((item, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4">
                  <Image
                    src={item.icon}
                    alt={item.text}
                    className="w-5 h-5 sm:w-6 sm:h-6 ml-2"
                  />

                  <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exclusion Tab */}
        {contentTabValue ===
          (route.showTabDescription !== false
            ? route.showPriceTab !== false
              ? 4
              : 3
            : route.showPriceTab !== false
            ? 3
            : 2) && (
          <div className="py-4 sm:py-6 bg-white">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-gray-900">
              Package Excludes
            </h2>
            <div className="space-y-4 sm:space-y-6 ">
              {route.exclusions?.map((item, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4">
                  <Image
                    src={item.icon}
                    alt={item.text}
                    className="w-5 h-5 sm:w-6 sm:h-6 ml-2"
                  />

                  <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
