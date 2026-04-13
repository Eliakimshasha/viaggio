import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Calendar,
  User,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function BookingCard({
  experienceId,
  experienceName,
  duration,
  pricing,
  isFootball,
}) {
  const router = useRouter();
  const [selectedPeople, setSelectedPeople] = useState("1 person");
  const [selectedDate, setSelectedDate] = useState("Select date");
  const [showPeopleDropdown, setShowPeopleDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
  const [showBookingTypeDropdown, setShowBookingTypeDropdown] = useState(false);
  const [footballBookingType, setFootballBookingType] = useState("individual");

  // People options for cycling
  const peopleOptions = [
    "1 person",
    "2 people",
    "3 people",
    "4 people",
    "5 people",
    "6 people",
  ];

  // Booking type options for football
  const footballBookingOptions = [
    { value: "individual", label: "Individual Player", icon: User },
    { value: "team", label: "Team Booking (11 players)", icon: UserCheck },
  ];

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
      setAdults((prev) => Math.max(1, prev - 1));
    } else {
      setChildren((prev) => Math.max(0, prev - 1));
    }
  };

  const generateCalendarDates = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const dates = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      dates.push(null);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const currentDate = new Date(year, month, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (currentDate >= today) {
        dates.push(currentDate);
      } else {
        dates.push(null);
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

  const getCurrentPrice = () => {
    if (isFootball) {
      if (footballBookingType === "team") {
        return 77;
      } else {
        if (Array.isArray(pricing)) {
          const individualPrice = pricing.find((p) => p.group === "1 person");
          return individualPrice ? individualPrice.price : 8;
        }
        return 8;
      }
    }

    if (!pricing || !Array.isArray(pricing) || pricing.length === 0) {
      if (typeof pricing === "number") {
        return pricing;
      }
      if (pricing && typeof pricing === "object" && pricing.price) {
        return pricing.price;
      }
      return 0;
    }

    const priceData = pricing.find(
      (p) =>
        p.group.includes(selectedPeople.split(" ")[0]) ||
        (selectedPeople === "2 people" && p.group === "2-4 people")
    );
    return priceData ? priceData.price : pricing[0].price;
  };

  const getTotalPrice = () => {
    if (isFootball) {
      if (footballBookingType === "team") {
        return getCurrentPrice();
      } else {
        return getCurrentPrice();
      }
    }
    return getCurrentPrice() * adults;
  };

  const handlePaymentClick = (paymentType) => {
    // Extract duration days for better parsing
    const durationDays = duration ? duration.match(/\d+/)?.[0] || "1" : "1";

    const queryParams = new URLSearchParams({
      routeId: experienceId,
      paymentType: paymentType,
      people: isFootball
        ? footballBookingType === "team"
          ? "11 players"
          : "1 person"
        : selectedPeople,
      date: selectedDate,
      price: getTotalPrice().toString(),
      routeName: experienceName,
      duration: duration || "1 Day",
      durationDays: durationDays,
      bookingType: isFootball ? footballBookingType : "regular",
      experienceType: isFootball ? "dsm-experience" : "cycling-experience",
    });
    router.push(`/payments?${queryParams.toString()}`);
  };

  const handlePeopleSelect = (people) => {
    setSelectedPeople(people);
    setShowPeopleDropdown(false);
  };

  const handleFootballBookingTypeSelect = (type) => {
    setFootballBookingType(type);
    setShowBookingTypeDropdown(false);
  };

  const getPriceLabel = () => {
    if (isFootball) {
      return footballBookingType === "team" ? "/ team" : "/ person";
    }
    return "/ person";
  };

  const getSelectedBookingTypeLabel = () => {
    const selected = footballBookingOptions.find(
      (option) => option.value === footballBookingType
    );
    return selected ? selected.label : "Individual Player";
  };

  const getSelectedBookingTypeIcon = () => {
    const selected = footballBookingOptions.find(
      (option) => option.value === footballBookingType
    );
    return selected ? selected.icon : User;
  };

  return (
    <div className="w-full lg:ml-8 lg:w-[400px] bg-white rounded-xl shadow-lg p-6">
      <div className="text-2xl font-bold mb-6 text-gray-800">
        ${getCurrentPrice().toLocaleString()} {getPriceLabel()}
      </div>

      {isFootball ? (
        <div className="mb-4 relative">
          <div
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300"
            onClick={() => setShowBookingTypeDropdown(!showBookingTypeDropdown)}
          >
            <div className="flex items-center">
              {React.createElement(getSelectedBookingTypeIcon(), {
                className: "w-5 h-5 text-gray-500 mr-3",
              })}
              <span className="text-gray-700">
                {getSelectedBookingTypeLabel()}
              </span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform ${
                showBookingTypeDropdown ? "rotate-180" : ""
              }`}
            />
          </div>

          {showBookingTypeDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {footballBookingOptions.map((option) => (
                <div
                  key={option.value}
                  className="p-3 hover:bg-gray-50 cursor-pointer text-gray-700 flex items-center"
                  onClick={() => handleFootballBookingTypeSelect(option.value)}
                >
                  <option.icon className="w-5 h-5 text-gray-500 mr-3" />
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="mb-4 relative">
          <div
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300"
            onClick={() => setShowPeopleDropdown(!showPeopleDropdown)}
          >
            <div className="flex items-center">
              <Users className="w-5 h-5 text-gray-500 mr-3" />
              <span className="text-gray-500">{getPeopleText()}</span>
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
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-500">Adults</div>
                    <div className="text-sm text-gray-500">Age 13+</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      className="w-8 h-8 rounded-full border text-gray-500 border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => decrementCount("adults")}
                      disabled={adults <= 1}
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-gray-500">
                      {adults}
                    </span>
                    <button
                      className="w-8 h-8 text-gray-500 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                      onClick={() => incrementCount("adults")}
                    >
                      +
                    </button>
                  </div>
                </div>

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
      )}

      {/* Date Dropdown */}
      <div className="mb-6 relative">
        <div
          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-gray-500 mr-3" />
            <span className="text-gray-500">
              {selectedDate || "Select date"}
            </span>
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

              <div className="grid grid-cols-7 gap-1 text-xs text-gray-500 mb-2">
                <div className="text-center p-2 font-medium">Sun</div>
                <div className="text-center p-2 font-medium">Mon</div>
                <div className="text-center p-2 font-medium">Tue</div>
                <div className="text-center p-2 font-medium">Wed</div>
                <div className="text-center p-2 font-medium">Thu</div>
                <div className="text-center p-2 font-medium">Fri</div>
                <div className="text-center p-2 font-medium">Sat</div>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDates.map((date, index) => (
                  <div key={index} className="aspect-square">
                    {date ? (
                      <button
                        className="w-full text-gray-500 h-full text-sm rounded hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-center"
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
        {isFootball ? (
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-900">
                {footballBookingType === "team"
                  ? "Team Booking"
                  : "Individual Player"}
              </span>
              <span className="text-gray-500">
                {footballBookingType === "team" ? "11 players" : "1 player"}
              </span>
              <span className="text-gray-900">
                ${getCurrentPrice().toLocaleString()}
              </span>
            </div>
            <hr className="border-gray-200 mb-4" />
            <div className="flex justify-between text-gray-700 items-center font-semibold">
              <span>Total</span>
              <span>${getTotalPrice().toLocaleString()}</span>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-900">
                ${getCurrentPrice().toLocaleString()}
              </span>
              <span className="text-gray-500">
                {adults} Adult{adults !== 1 ? "s" : ""}
              </span>
              <span className="text-gray-900">
                ${(getCurrentPrice() * adults).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-900">$0</span>
              <span className="text-gray-500">
                {children} Child{children !== 1 ? "ren" : ""}
              </span>
              <span className="text-gray-900">$0</span>
            </div>
            <hr className="border-gray-200 mb-4" />
            <div className="flex justify-between text-gray-700 items-center font-semibold">
              <span>Total</span>
              <span>${getTotalPrice().toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>

      {/* Payment Buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => handlePaymentClick("full")}
          className="flex-1 bg-[#78D8FF] text-white py-3 px-4 rounded-full text-sm font-medium hover:bg-sky-500 transition-colors"
        >
          Pay Full Amount
        </button>
        <button
          onClick={() => handlePaymentClick("installment")}
          className="flex-1 bg-[#946626] text-white py-3 px-4 rounded-full text-sm font-medium hover:bg-[#7a4f1f] transition-colors"
        >
          Pay in Installments
        </button>
      </div>
    </div>
  );
}
