"use client";
import React, { useRef, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Smartphone,
  ChevronDown,
  MapPin,
  Clock,
  Package,
} from "lucide-react";
import { CiLock } from "react-icons/ci";
import Image from "next/image";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import {
  CheckCircle,
  RadioButtonUnchecked,
  Schedule,
} from "@mui/icons-material";
import logo from "../../../public/assets/images/logo.png";
import { Label } from "../../../components/ui/Label";
import CountrySelect from "../../../components/CountrySelect";

const BookingFlowContent = () => {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [phoneNumber, setPhoneNumber] = useState("0XXXXXXXXX");
  const [cardOwner, setCardOwner] = useState("First Name & Last Name");
  const [cardNumber, setCardNumber] = useState("0000 0000 0000 0000");
  const [expiryDate, setExpiryDate] = useState("MM/YYYY");
  const [cvv, setCvv] = useState("XXX");
  const [paymentType, setPaymentType] = useState("full");

  // Installment specific states
  const [installmentCycles, setInstallmentCycles] = useState("3");
  const [initialAmount, setInitialAmount] = useState(0);
  const [installmentStep, setInstallmentStep] = useState(1);
  const [activePaymentStep, setActivePaymentStep] = useState(0);
  const [paymentHistory, setPaymentHistory] = useState([]);

  // DSM Experience specific states
  const [experienceDetails, setExperienceDetails] = useState({
    routeName: "",
    description: "",
    people: "",
    packageIncludes: "",
    startingDate: "",
    experienceType: "",
    isDsmExperience: false,
    bookingType: "regular",
    duration: "",
  });

  const dateInputRef = useRef(null);

  // Helper function to parse date string safely
  const parseDate = (dateString) => {
    if (!dateString) return null;

    // Try different date formats
    const formats = [
      // ISO format
      /^\d{4}-\d{2}-\d{2}$/,
      // US format like "March 12, 2025"
      /^[A-Za-z]+ \d{1,2}, \d{4}$/,
      // Short format like "12 March 2025"
      /^\d{1,2} [A-Za-z]+ \d{4}$/,
    ];

    let date = null;

    // Try parsing as ISO first
    if (formats[0].test(dateString)) {
      date = new Date(dateString);
    } else if (formats[1].test(dateString) || formats[2].test(dateString)) {
      date = new Date(dateString);
    } else {
      // Try direct parsing
      date = new Date(dateString);
    }

    // Check if date is valid
    if (date && !isNaN(date.getTime())) {
      return date;
    }

    return null;
  };

  // Helper function to format date for display
  const formatDateForDisplay = (dateInput) => {
    if (!dateInput) return "";

    let date;
    if (typeof dateInput === "string") {
      date = parseDate(dateInput);
    } else {
      date = dateInput;
    }

    if (!date || isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Helper function to calculate end date
  const calculateEndDate = (startDateInput, duration) => {
    if (!startDateInput || !duration) return "";

    let startDate = parseDate(startDateInput);
    if (!startDate || isNaN(startDate.getTime())) {
      return "";
    }

    const durationDays = parseInt(duration.replace(/\D/g, "")) || 0;
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + durationDays);

    return formatDateForDisplay(endDate);
  };

  // Get URL parameters and set experience details
  useEffect(() => {
    const urlPaymentType = searchParams.get("paymentType");
    const routeName = searchParams.get("routeName");
    const duration = searchParams.get("duration");
    const price = searchParams.get("price");
    const experienceType = searchParams.get("experienceType");
    const description = searchParams.get("description");
    const packageIncludes = searchParams.get("packageIncludes");
    const bookingType = searchParams.get("bookingType");
    const people = searchParams.get("people") || "1";
    const startingDate = searchParams.get("date") || "";

    // Check if this is a DSM experience
    const isDsmExperience =
      experienceType === "dsm-experience" ||
      experienceType === "cycling-experience";

    setExperienceDetails({
      routeName: routeName || "Skies over The Wild",
      description: description || "",
      packageIncludes:
        packageIncludes || "Meals, Transport, Proffesional Guides",
      experienceType: experienceType || "",
      isDsmExperience,
      bookingType: bookingType || "regular",
      people: people,
      duration: duration || "6 Days",
    });

    if (urlPaymentType) {
      setPaymentType(urlPaymentType);
    }

    // Set initial amount based on payment type and total
    if (urlPaymentType === "installment" && price) {
      const totalPrice = Number.parseInt(price);
      setInitialAmount(Math.round(totalPrice * 0.3)); // 30% initial payment
      // Initialize payment history for installment
      const cycles = Number.parseInt(installmentCycles) || 3;
      const remainingAmount = totalPrice - Math.round(totalPrice * 0.3);
      const monthlyPayment = Math.round(remainingAmount / (cycles - 1));

      setPaymentHistory([
        {
          id: 1,
          date: "20 Dec 2024",
          amount: Math.round(totalPrice * 0.3),
          status: "pending",
          cycle: 1,
          label: "Initial Payment",
        },
        {
          id: 2,
          date: "20 Jan 2025",
          amount: monthlyPayment,
          status: "upcoming",
          cycle: 2,
          label: "Second Payment",
        },
        {
          id: 3,
          date: "20 Feb 2025",
          amount: monthlyPayment,
          status: "upcoming",
          cycle: 3,
          label: "Final Payment",
        },
      ]);
    }
  }, [searchParams, installmentCycles]);

  // Experience Details State - simplified for DSM experiences
  const [experienceBookingDetails, setExperienceBookingDetails] = useState({
    participants: 1,
    experienceDate: "",
  });

  // Adventure Details State - for regular destinations
  const [adventureDetails, setAdventureDetails] = useState({
    adults: 1,
    children: 0,
    startDate: "",
    endDate: "",
  });

  // Initialize default values from URL parameters
  useEffect(() => {
    const people = searchParams.get("people") || "1";
    const startingDate = searchParams.get("date") || "";
    const duration = searchParams.get("duration") || "6 Days";

    if (experienceDetails.isDsmExperience) {
      const formattedDate = startingDate
        ? formatDateForDisplay(startingDate)
        : "12 March 2025";
      setExperienceBookingDetails((prev) => ({
        ...prev,
        participants: parseInt(people),
        experienceDate: formattedDate,
      }));
    } else {
      const formattedStartDate = startingDate
        ? formatDateForDisplay(startingDate)
        : "12 March 2025";
      const calculatedEndDate = startingDate
        ? calculateEndDate(startingDate, duration)
        : "18 March 2025";

      setAdventureDetails((prev) => ({
        ...prev,
        adults: parseInt(people),
        startDate: formattedStartDate,
        endDate: calculatedEndDate,
      }));
    }
  }, [searchParams, experienceDetails.isDsmExperience]);

  // Add useEffect to set participants based on booking type
  useEffect(() => {
    if (experienceDetails.bookingType === "team") {
      setExperienceBookingDetails((prev) => ({
        ...prev,
        participants: 11,
      }));
    }
  }, [experienceDetails.bookingType]);

  // Participant Details State - simplified for DSM experiences
  const [participants, setParticipants] = useState([]);

  // Traveler Details State - for regular destinations
  const [travelers, setTravelers] = useState([]);

  // Initialize participants/travelers when count changes
  React.useEffect(() => {
    if (experienceDetails.isDsmExperience) {
      // For DSM experiences - simplified participant info
      const newParticipants = Array.from(
        { length: experienceBookingDetails.participants },
        (_, index) => ({
          id: index + 1,
          fullName: "",
          email: "",
        }),
      );
      setParticipants(newParticipants);
    } else {
      // For regular destinations - full traveler info
      const newTravelers = Array.from(
        { length: adventureDetails.adults },
        (_, index) => ({
          id: index + 1,
          fullName: "",
          email: "",
          dateOfBirth: "",
          gender: "",
          nationality: "",
          phone: "",
        }),
      );
      setTravelers(newTravelers);
    }
  }, [
    experienceBookingDetails.participants,
    adventureDetails.adults,
    experienceDetails.isDsmExperience,
  ]);

  const updateParticipant = (id, field, value) => {
    setParticipants((prev) =>
      prev.map((participant) =>
        participant.id === id
          ? { ...participant, [field]: value }
          : participant,
      ),
    );
  };

  const updateTraveler = (id, field, value) => {
    setTravelers((prev) =>
      prev.map((traveler) =>
        traveler.id === id ? { ...traveler, [field]: value } : traveler,
      ),
    );
  };

  const nextStep = () => {
    const maxSteps = experienceDetails.isDsmExperience ? 2 : 3;
    if (currentStep < maxSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateTotal = () => {
    const basePrice = Number.parseInt(searchParams.get("price")) || 512;

    if (experienceDetails.isDsmExperience) {
      // For football team bookings, use flat team rate
      if (
        experienceDetails.experienceType === "dsm-experience" &&
        experienceDetails.bookingType === "team"
      ) {
        return basePrice; // Team flat rate (e.g., $1500)
      }
      // For individual bookings (football individual or cycling)
      return experienceBookingDetails.participants * basePrice;
    } else {
      // Regular destinations
      const adultTotal = adventureDetails.adults * basePrice;
      const childTotal = adventureDetails.children * basePrice;
      return adultTotal + childTotal;
    }
  };

  const calculateInstallmentAmount = () => {
    const total = calculateTotal();
    const cycles = Number.parseInt(installmentCycles);
    const remaining = total - initialAmount;
    return Math.round(remaining / (cycles - 1));
  };

  const nextInstallmentStep = () => {
    if (installmentStep < 4) {
      setInstallmentStep(installmentStep + 1);
    }
  };

  const prevInstallmentStep = () => {
    if (installmentStep > 1) {
      setInstallmentStep(installmentStep - 1);
    }
  };

  const getStepIcon = (index, status) => {
    switch (status) {
      case "completed":
        return <CheckCircle sx={{ color: "#4CAF50", fontSize: 24 }} />;
      case "pending":
        return <Schedule sx={{ color: "#FF9800", fontSize: 24 }} />;
      case "upcoming":
        return <RadioButtonUnchecked sx={{ color: "#9E9E9E", fontSize: 24 }} />;
      default:
        return <RadioButtonUnchecked sx={{ color: "#9E9E9E", fontSize: 24 }} />;
    }
  };

  // Handle start date change and recalculate end date
  const handleStartDateChange = (newStartDate) => {
    const calculatedEndDate = calculateEndDate(
      newStartDate,
      experienceDetails.duration,
    );
    setAdventureDetails((prev) => ({
      ...prev,
      startDate: newStartDate,
      endDate: calculatedEndDate,
    }));
  };

  // Step 1: Experience Details - simplified for DSM experiences
  const renderExperienceDetails = () => (
    <div className="space-y-6 md:pr-5">
      <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">
        Experience Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number Of Participants
          </label>
          {experienceDetails.bookingType === "team" ? (
            // For team bookings, show fixed 11 players
            <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
              <div className="flex items-center justify-between">
                <span>11 players (Team Booking)</span>
                <span className="text-sm text-gray-500 bg-green-100 px-2 py-1 rounded">
                  Team Rate
                </span>
              </div>
            </div>
          ) : (
            // For individual bookings, allow input
            <input
              type="number"
              min="1"
              max="20"
              value={experienceBookingDetails.participants}
              onChange={(e) =>
                setExperienceBookingDetails((prev) => ({
                  ...prev,
                  participants: Number.parseInt(e.target.value) || 1,
                }))
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-gray-500"
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience Date
          </label>
          <div className="relative">
            <input
              type="text"
              value={experienceBookingDetails.experienceDate}
              onChange={(e) =>
                setExperienceBookingDetails((prev) => ({
                  ...prev,
                  experienceDate: e.target.value,
                }))
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-gray-500 pr-10"
              placeholder="12 March 2025"
            />
            <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
      <button
        onClick={nextStep}
        className="w-full bg-gray-800 text-white py-3 lg:py-4 rounded-lg font-semibold hover:bg-[#25563d] transition-colors flex items-center justify-center"
      >
        <span>Continue</span>
        <div className="ml-2 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">→</span>
        </div>
      </button>
    </div>
  );

  // Step 1: Adventure Details - for regular destinations
  const renderAdventureDetails = () => (
    <div className="space-y-6 md:pr-5">
      <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">
        Adventure Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number Of Adults
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={adventureDetails.adults}
            onChange={(e) =>
              setAdventureDetails((prev) => ({
                ...prev,
                adults: Number.parseInt(e.target.value) || 1,
              }))
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number Of Children
          </label>
          <input
            type="number"
            min="0"
            max="10"
            value={adventureDetails.children}
            onChange={(e) =>
              setAdventureDetails((prev) => ({
                ...prev,
                children: Number.parseInt(e.target.value) || 0,
              }))
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start-Trip Date
          </label>
          <div className="relative">
            <input
              type="text"
              value={adventureDetails.startDate}
              onChange={(e) => handleStartDateChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-gray-500 pr-10"
              placeholder="12 March 2025"
            />
            <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End-Trip Date
          </label>
          <div className="relative">
            <input
              type="text"
              value={adventureDetails.endDate}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 pr-10 cursor-not-allowed"
              placeholder="18 March 2025"
            />
            <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Calculated automatically based on start date +
            {experienceDetails.duration}
          </p>
        </div>
      </div>
      <button
        onClick={nextStep}
        className="w-full bg-gray-800 text-white py-3 lg:py-4 rounded-lg font-semibold hover:bg-[#25563d] transition-colors flex items-center justify-center"
      >
        <span>Continue</span>
        <div className="ml-2 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">→</span>
        </div>
      </button>
    </div>
  );

  // Step 2: Participant Details - simplified for DSM experiences
  const renderParticipantDetails = () => (
    <div className="space-y-6 md:mr-9">
      <div className="flex items-center mb-6">
        <button
          onClick={prevStep}
          className="mr-4 text-gray-600 bg-gray-100 rounded-full p-2 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
          Participant Details
        </h2>
      </div>
      <div className="space-y-8">
        {participants.map((participant, index) => (
          <div
            key={participant.id}
            className="border border-gray-200 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Participant {index + 1}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={participant.fullName}
                  onChange={(e) =>
                    updateParticipant(
                      participant.id,
                      "fullName",
                      e.target.value,
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-gray-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={participant.email}
                  onChange={(e) =>
                    updateParticipant(participant.id, "email", e.target.value)
                  }
                  className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="email address"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={nextStep}
        className="w-full bg-gray-800 text-white py-3 lg:py-4 rounded-lg font-semibold hover:bg-[#25563d] transition-colors flex items-center justify-center"
      >
        <span>Continue to Payment</span>
        <div className="ml-2 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">→</span>
        </div>
      </button>
    </div>
  );

  // Step 2: Personal Details - for regular destinations
  const renderPersonalDetails = () => (
    <div className="space-y-6 md:mr-9">
      <div className="flex items-center mb-6">
        <button
          onClick={prevStep}
          className="mr-4 text-gray-600 bg-gray-100 rounded-full p-2 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
          Traveler Details
        </h2>
      </div>
      <div className="space-y-8">
        {travelers.map((traveler, index) => (
          <div
            key={traveler.id}
            className="border border-gray-200 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Traveler {index + 1}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={traveler.fullName}
                  onChange={(e) =>
                    updateTraveler(traveler.id, "fullName", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-gray-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={traveler.email}
                  onChange={(e) =>
                    updateTraveler(traveler.id, "email", e.target.value)
                  }
                  className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Of Birth
                </label>
                <div className="relative">
                  <input
                    ref={dateInputRef}
                    type="date"
                    value={traveler.dateOfBirth}
                    onChange={(e) =>
                      updateTraveler(traveler.id, "dateOfBirth", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-gray-500 pr-10 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    placeholder="DD - MM - YYYY"
                  />
                  <Calendar
                    className="absolute right-3 top-3 w-5 h-5 text-gray-400"
                    onClick={() => dateInputRef.current?.showPicker()}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <div className="relative">
                  <select
                    value={traveler.gender}
                    onChange={(e) =>
                      updateTraveler(traveler.id, "gender", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-gray-500 appearance-none"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality" className="text-gray-700">
                  Nationality
                </Label>
                <CountrySelect
                  onChange={(e) =>
                    updateTraveler(traveler.id, "nationality", e.target.value)
                  }
                  value={traveler.nationality}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={traveler.phone}
                  onChange={(e) =>
                    updateTraveler(traveler.id, "phone", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-gray-500"
                  placeholder="E.g +255 745 456 789"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={nextStep}
        className="w-full bg-gray-800 text-white py-3 lg:py-4 rounded-lg font-semibold hover:bg-[#25563d] transition-colors flex items-center justify-center"
      >
        <span>Continue</span>
        <div className="ml-2 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">→</span>
        </div>
      </button>
    </div>
  );

  // Installment Terms Component
  const renderInstallmentTerms = () => (
    <div className="space-y-6 md:px-24 md:py-16 md:border-1 md:border-gray-300 md:mr-9 md:rounded-xl">
      <div className="flex items-center mb-8 ">
        <h1 className="text-2xl font-bold text-gray-800 mr-3">
          Complete Payment Securely
        </h1>
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 10V8C6 5.79086 7.79086 4 10 4H14C16.2091 4 18 5.79086 18 8V10"
              stroke="#4F46E5"
              strokeWidth="2"
            />
            <rect
              x="4"
              y="10"
              width="16"
              height="10"
              rx="2"
              fill="#4F46E5"
              fillOpacity="0.1"
              stroke="#4F46E5"
              strokeWidth="2"
            />
            <circle cx="12" cy="15" r="2" fill="#4F46E5" />
          </svg>
        </div>
      </div>
      <div className="rounded-2xl p-8 space-y-8 md:px-0">
        <h3 className="text-xl font-semibold text-gray-800">
          Installment Terms
        </h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-3">
              Installment Cycles
            </label>
            <div className="relative">
              <select
                value={installmentCycles}
                onChange={(e) => setInstallmentCycles(e.target.value)}
                className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800 appearance-none text-base"
              >
                <option value="">Select</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="12">12 Months</option>
              </select>
              <ChevronDown className="absolute right-4 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-3">
              Initial Amount
            </label>
            <input
              type="text"
              value={initialAmount === 0 ? "$0" : `$${initialAmount}`}
              onChange={(e) => {
                const value = e.target.value.replace("$", "").replace(",", "");
                setInitialAmount(Number(value) || 0);
              }}
              className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800 text-base"
              placeholder="$0"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center pt-4">
        <button
          onClick={prevStep}
          className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={nextInstallmentStep}
          className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 15L12.5 10L7.5 5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {/* Progress Bar */}
      <div className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 font-medium">STEPS</span>
          <span className="text-xs text-gray-500 font-medium">
            {experienceDetails.isDsmExperience ? "2/3" : "3/4"}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div
            className="bg-gradient-to-r from-purple-400 to-blue-500 h-1 rounded-full transition-all duration-300"
            style={{ width: experienceDetails.isDsmExperience ? "67%" : "75%" }}
          ></div>
        </div>
      </div>
    </div>
  );

  // Installment Payment History Component with Material UI Stepper
  const renderInstallmentHistory = () => {
    const totalAmount = calculateTotal();
    const cycles = Number.parseInt(installmentCycles) || 3;
    const monthlyPayment = Math.round(
      (totalAmount - initialAmount) / (cycles - 1),
    );

    return (
      <div className="space-y-8 md:px-24 md:py-16 md:border-1 md:border-gray-300 md:mr-9 md:rounded-xl">
        <div className="flex items-center mb-6">
          <button
            onClick={prevInstallmentStep}
            className="mr-4 text-gray-600 bg-gray-100 rounded-full p-2 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">
            Installment Payment History
          </h2>
        </div>
        <div className="space-y-8">
          {/* Payment Cycles Stepper */}
          <div>
            <h3 className="text-base font-medium text-gray-600 mb-6">
              Payment Cycles
            </h3>
            <Box sx={{ maxWidth: 600, width: "100%" }}>
              <Stepper activeStep={activePaymentStep} orientation="horizontal">
                {paymentHistory.map((payment, index) => (
                  <Step key={payment.id}>
                    <StepLabel
                      StepIconComponent={() =>
                        getStepIcon(index, payment.status)
                      }
                      sx={{
                        "& .MuiStepLabel-label": {
                          color:
                            payment.status === "completed"
                              ? "#4CAF50"
                              : payment.status === "pending"
                                ? "#FF9800"
                                : "#9E9E9E",
                          fontWeight: payment.status === "pending" ? 600 : 400,
                          fontSize: "0.875rem",
                        },
                      }}
                    >
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                      >
                        {payment.date}
                      </Typography>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </div>
          {/* Transaction History */}
          <div className="">
            <h3 className="text-base font-medium text-gray-600 mb-4">
              Transaction History
            </h3>
            <Paper elevation={1} sx={{ p: 3 }}>
              <div className="flex justify-between items-center">
                <div>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Total Paid: $
                    {paymentHistory
                      .filter((p) => p.status === "completed")
                      .reduce((sum, p) => sum + p.amount, 0)
                      .toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Remaining: $
                    {(
                      totalAmount -
                      paymentHistory
                        .filter((p) => p.status === "completed")
                        .reduce((sum, p) => sum + p.amount, 0)
                    ).toLocaleString()}
                  </Typography>
                </div>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: "#d1d5db",
                    color: "#6b7280",
                    fontSize: 12,
                    "&:hover": {
                      borderColor: "#9ca3af",
                      backgroundColor: "#f9fafb",
                    },
                  }}
                >
                  View All Transactions
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2"
                  >
                    <path
                      d="M6 12L10 8L6 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </div>
              {/* Next Payment */}
              <div className="mt-11">
                <h3 className="text-base font-medium text-gray-600 mb-2">
                  Next Payment Amount
                </h3>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#1f2937" }}
                >
                  $
                  {paymentHistory
                    .find((p) => p.status === "pending")
                    ?.amount.toLocaleString() || "0"}
                </Typography>
              </div>
            </Paper>
          </div>
        </div>
        <button
          className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors text-base"
          onClick={() => {
            const nextPayment = paymentHistory.find(
              (p) => p.status === "pending",
            );
            if (nextPayment) {
              // Navigate to payment form
              setInstallmentStep(3); // Go to payment form step
            }
          }}
        >
          Pay Next Cycle - $
          {paymentHistory
            .find((p) => p.status === "pending")
            ?.amount.toLocaleString() || "0"}
        </button>
      </div>
    );
  };

  // Installment Payment Form Component
  const renderInstallmentPaymentForm = () => {
    const nextPayment = paymentHistory.find((p) => p.status === "pending");
    return (
      <div className="space-y-6">
        <div className="flex items-center mb-6 lg:mb-8">
          <button
            onClick={prevInstallmentStep}
            className="mr-4 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mr-3">
            Pay Installment - ${nextPayment?.amount.toLocaleString() || "0"}
          </h1>
          <div className="bg-blue-50 rounded-lg flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=48&width=48"
              alt="Lock Icon"
              width={24}
              height={24}
              className="w-12 h-12"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row border border-gray-200 rounded-l-2xl relative overflow-hidden">
          {/* Payment Methods Sidebar */}
          <div className="w-full md:h-full lg:w-48 mb-6 lg:mb-0 lg:mr-8">
            <div className="bg-gray-100 p-4 md:h-[67vh]">
              <h3 className="font-semibold text-gray-700 mb-4">
                Payment Method
              </h3>
              <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`flex-1 lg:w-full flex items-center justify-center lg:justify-start p-3 rounded-lg transition-colors ${
                    paymentMethod === "card"
                      ? "bg-gray-800 text-white"
                      : "text-gray-600 hover:bg-gray-200 bg-gray-200"
                  }`}
                >
                  <CreditCard className="w-4 h-4 mr-2 lg:mr-3" />
                  <span className="text-sm">Card</span>
                </button>
                <button
                  onClick={() => setPaymentMethod("mobile")}
                  className={`flex-1 lg:w-full flex items-center justify-center lg:justify-start p-3 rounded-lg transition-colors ${
                    paymentMethod === "mobile"
                      ? "bg-gray-800 text-white"
                      : "text-gray-600 hover:bg-gray-200 bg-gray-200"
                  }`}
                >
                  <Smartphone className="w-4 h-4 mr-2 lg:mr-3" />
                  <span className="text-sm">Mobile Money</span>
                </button>
              </div>
            </div>
          </div>
          {/* Payment Form */}
          <div className="flex-1 md:relative px-3 md:px-0">
            {paymentMethod === "mobile" ? (
              <div className="space-y-4 lg:space-y-6">
                <div className="md:w-[64%] md:mx-auto md:mt-16 mt-1 space-y-4 lg:space-y-6">
                  {/* Mobile Money Network */}
                  <div>
                    <div className="bg-gray-100 p-3 lg:p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          Mobile Money Network
                        </span>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Select Network
                      </div>
                    </div>
                  </div>
                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-gray-500 text-sm lg:text-base"
                      placeholder="0XXXXXXXXX"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="md:flex md:justify-center md:mt-9">
                <div className="space-y-4 lg:space-y-6">
                  {/* Card Owner Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NAME OF CARD OWNER
                    </label>
                    <input
                      type="text"
                      value={cardOwner}
                      onChange={(e) => setCardOwner(e.target.value)}
                      className="w-full p-3 md:py-2 py-3 border border-gray-300 rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-gray-500 text-sm"
                      placeholder="First Name & Last Name"
                    />
                  </div>
                  {/* Card Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CARD NUMBER
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full md:py-2 p-3 border border-gray-300 rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-gray-500 pr-12 text-sm"
                        placeholder="0000 0000 0000 0000"
                      />
                      <div className="absolute right-3 top-2 flex space-x-1">
                        <Image
                          src="/placeholder.svg?height=24&width=40"
                          alt="Card Icon"
                          width={24}
                          height={24}
                          className="w-10 h-auto"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Expiry and CVV */}
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        EXPIRY DATE
                      </label>
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="w-full md:py-2 p-3 border border-gray-300 rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-gray-500 text-sm"
                        placeholder="MM/YYYY"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          className="w-full md:py-2 p-3 border border-gray-300 rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-gray-500 pr-12 text-sm"
                          placeholder="XXX"
                        />
                        <div className="absolute right-3 top-2">
                          <Image
                            src="/placeholder.svg?height=24&width=24"
                            alt="Visa Icon"
                            width={24}
                            height={24}
                            className="w-auto h-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Pay Button */}
            <div className="md:flex md:justify-center md:mt-9">
              <button
                className="w-full bg-gray-800 md:w-[64%] text-white py-3 lg:py-3 rounded-lg font-semibold mt-6 lg:mt-0 hover:bg-[#25563d] transition-colors text-sm lg:text-base"
                onClick={() => {
                  // Handle payment processing here
                  const nextPayment = paymentHistory.find(
                    (p) => p.status === "pending",
                  );
                  if (nextPayment) {
                    // Update payment status and move to next step
                    setActivePaymentStep(activePaymentStep + 1);
                    setPaymentHistory((prev) =>
                      prev.map((p) =>
                        p.id === nextPayment.id
                          ? { ...p, status: "completed" }
                          : p.id === nextPayment.id + 1
                            ? { ...p, status: "pending" }
                            : p,
                      ),
                    );
                    // Go back to payment history
                    setInstallmentStep(2);
                  }
                }}
              >
                Pay ${nextPayment?.amount.toLocaleString() || "0"}
              </button>
            </div>
            {/* Security Info */}
            <div className="flex items-center mb-7 justify-center mt-4 text-xs lg:text-sm text-gray-500">
              <CiLock className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
              <span>Secured By</span>
              <span className="text-orange-500 ml-1">SwahiliePay</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Step 3: Payment (Full Payment)
  const renderFullPayment = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6 lg:mb-8">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mr-3">
          Complete Payment Securely
        </h1>
        <div className="bg-blue-50 rounded-lg flex items-center justify-center">
          <Image
            src="/placeholder.svg?height=48&width=48"
            alt="Lock Icon"
            width={24}
            height={24}
            className="w-12 h-12"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row border border-gray-200 rounded-l-2xl relative overflow-hidden">
        {/* Payment Methods Sidebar */}
        <div className="w-full md:h-full lg:w-48 mb-6 lg:mb-0 lg:mr-8">
          <div className="bg-gray-100 p-4 md:h-[67vh]">
            <h3 className="font-semibold text-gray-700 mb-4">Payment Method</h3>
            <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
              <button
                onClick={() => setPaymentMethod("card")}
                className={`flex-1 lg:w-full flex items-center justify-center lg:justify-start p-3 rounded-lg transition-colors ${
                  paymentMethod === "card"
                    ? "bg-gray-800 text-white"
                    : "text-gray-600 hover:bg-gray-200 bg-gray-200"
                }`}
              >
                <CreditCard className="w-4 h-4 mr-2 lg:mr-3" />
                <span className="text-sm">Card</span>
              </button>
              <button
                onClick={() => setPaymentMethod("mobile")}
                className={`flex-1 lg:w-full flex items-center justify-center lg:justify-start p-3 rounded-lg transition-colors ${
                  paymentMethod === "mobile"
                    ? "bg-gray-800 text-white"
                    : "text-gray-600 hover:bg-gray-200 bg-gray-200"
                }`}
              >
                <Smartphone className="w-4 h-4 mr-2 lg:mr-3" />
                <span className="text-sm">Mobile Money</span>
              </button>
            </div>
          </div>
        </div>
        {/* Payment Form */}
        <div className="flex-1 md:relative px-3 md:px-0">
          <button
            onClick={prevStep}
            className="mb-4 lg:mb-6 text-gray-600 md:absolute md:top-2 md:left-2 hover:text-gray-800"
          >
            <ArrowLeft size={30} className="bg-gray-200 rounded-full p-2" />
          </button>
          {paymentMethod === "mobile" ? (
            <div className="space-y-4 lg:space-y-6">
              <div className="md:w-[64%] md:mx-auto md:mt-16 mt-1 space-y-4 lg:space-y-6">
                {/* Mobile Money Network */}
                <div>
                  <div className="bg-gray-100 p-3 lg:p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Mobile Money Network
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Select Network
                    </div>
                  </div>
                </div>
                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-gray-500 text-sm lg:text-base"
                    placeholder="0XXXXXXXXX"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="md:flex md:justify-center md:mt-9">
              <div className="space-y-4 lg:space-y-6">
                {/* Card Owner Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NAME OF CARD OWNER
                  </label>
                  <input
                    type="text"
                    value={cardOwner}
                    onChange={(e) => setCardOwner(e.target.value)}
                    className="w-full p-3 md:py-2 py-3 border border-gray-300 rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-gray-500 text-sm"
                    placeholder="First Name & Last Name"
                  />
                </div>
                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CARD NUMBER
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full md:py-2 p-3 border border-gray-300 rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-gray-500 pr-12 text-sm"
                      placeholder="0000 0000 0000 0000"
                    />
                    <div className="absolute right-3 top-2 flex space-x-1">
                      <Image
                        src="/placeholder.svg?height=24&width=40"
                        alt="Card Icon"
                        width={24}
                        height={24}
                        className="w-10 h-auto"
                      />
                    </div>
                  </div>
                </div>
                {/* Expiry and CVV */}
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      EXPIRY DATE
                    </label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="w-full md:py-2 p-3 border border-gray-300 rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-gray-500 text-sm"
                      placeholder="MM/YYYY"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="w-full md:py-2 p-3 border border-gray-300 rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-gray-500 pr-12 text-sm"
                        placeholder="XXX"
                      />
                      <div className="absolute right-3 top-2">
                        <Image
                          src="/placeholder.svg?height=24&width=24"
                          alt="Visa Icon"
                          width={24}
                          height={24}
                          className="w-auto h-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Pay Button */}
          <div className="md:flex md:justify-center md:mt-9">
            <button className="w-full bg-gray-800 md:w-[64%] text-white py-3 lg:py-3 rounded-lg font-semibold mt-6 lg:mt-0 hover:bg-[#25563d] transition-colors text-sm lg:text-base">
              Pay ${calculateTotal().toLocaleString()}
            </button>
          </div>
          {/* Security Info */}
          <div className="flex items-center mb-7 justify-center mt-4 text-xs lg:text-sm text-gray-500">
            <CiLock className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
            <span>Secured By</span>
            <span className="text-orange-500 ml-1">SwahiliePay</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render function for step 3/2 (depending on experience type)
  const renderPayment = () => {
    if (paymentType === "installment") {
      if (installmentStep === 1) {
        return renderInstallmentTerms();
      } else if (installmentStep === 2) {
        return renderInstallmentHistory();
      } else if (installmentStep === 3) {
        return renderInstallmentPaymentForm();
      }
    }
    return renderFullPayment();
  };

  const handleNavigation = () => {
    // Add navigation logic here if needed
  };

  const maxSteps = experienceDetails.isDsmExperience ? 2 : 3;
  const finalStep = experienceDetails.isDsmExperience ? 2 : 3;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Left Panel */}
      <div className="w-full lg:w-2/3 bg-white p-4 lg:p-8 lg:pr-0 lg:pt-4">
        {/* Header */}
        <div
          className=" cursor-pointer pl-0 #"
          onClick={() => handleNavigation()}
        >
          <Image
            src={logo || "/placeholder.svg"}
            alt="logo"
            className="h-16 w-auto"
          />
        </div>
        {/* Title with Heart */}
        <div className="flex items-center mb-6">
          <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mr-2">
            {experienceDetails.routeName} -
            {paymentType === "installment"
              ? "Installment Payment"
              : "Full Payment"}
            🎈
          </h1>
        </div>
        {/* Step Content */}
        <div className="flex-1">
          {currentStep === 1 &&
            (experienceDetails.isDsmExperience
              ? renderExperienceDetails()
              : renderAdventureDetails())}
          {currentStep === 2 &&
            (experienceDetails.isDsmExperience
              ? renderParticipantDetails()
              : renderPersonalDetails())}
          {currentStep === finalStep && renderPayment()}
          {/* {!experienceDetails.isDsmExperience && currentStep === 3 && renderPayment()} */}
        </div>
        {/* Progress - Only show for full payment or when not in installment flow */}
        {(paymentType === "full" || currentStep < finalStep) && (
          <div className="md:pr-8">
            <div className="flex items-center justify-between mt-6 lg:mt-8">
              <span className="text-xs lg:text-sm text-gray-500">STEPS</span>
              <span className="text-xs lg:text-sm text-gray-500">
                {currentStep}/{maxSteps}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
              <div
                className="bg-gray-800 h-1 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / maxSteps) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
      {/* Right Panel - Trip/Experience Details */}
      <div className="w-full lg:w-1/3 bg-white rounded-l-2xl shadow-2xl p-6">
        <div className="md:w-[97%] w-[100%] mx-auto rounded-2xl shadow-g bg-white p-6 px-3 md:px-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            {experienceDetails.isDsmExperience
              ? "Experience Details"
              : "Trip Details"}
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <MapPin className="w-4 h-4 text-gray-500 mt-1 mr-3" />
              <div>
                <div className="text-sm text-gray-500">
                  {experienceDetails.isDsmExperience
                    ? "Experience"
                    : "Destination"}
                </div>
                <div className="font-medium text-gray-800">
                  {experienceDetails.routeName}
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="w-4 h-4 text-gray-500 mt-1 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Duration</div>
                <div className="font-medium text-gray-800">
                  {experienceDetails.duration}
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <Calendar className="w-4 h-4 text-gray-500 mt-1 mr-3" />
              <div>
                <div className="text-sm text-gray-500">
                  {experienceDetails.isDsmExperience
                    ? "Experience Date"
                    : "Start and End"}
                </div>
                <div className="font-medium text-gray-800">
                  {experienceDetails.isDsmExperience
                    ? experienceBookingDetails.experienceDate
                    : `${adventureDetails.startDate} - ${adventureDetails.endDate}`}
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <Package className="w-4 h-4 text-gray-500 mt-1 mr-3" />
              <div>
                <div className="text-sm text-gray-500">
                  {experienceDetails.isDsmExperience
                    ? "Experience Includes"
                    : "Package Includes"}
                </div>
                <div className="font-medium text-gray-800">
                  {experienceDetails.routeName === "Cycling Experiences"
                    ? "Bicycles and Helmet"
                    : experienceDetails.routeName === "Football Experiences"
                      ? "Entry Fee, Jersey and Drinks"
                      : "Transport, Meals, Professional Guides"}
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Payment Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-gray-700">
                    {experienceDetails.isDsmExperience
                      ? experienceDetails.bookingType === "team"
                        ? "Team Booking (11 players)"
                        : `${experienceBookingDetails.participants} Participants`
                      : `${adventureDetails.adults} Adults`}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    {experienceDetails.bookingType === "team"
                      ? "Team Rate"
                      : `@ $${searchParams.get("price") || "512"}`}
                  </span>
                </div>
                <span className="font-semibold text-gray-800">
                  ${calculateTotal().toLocaleString()}
                </span>
              </div>
              {!experienceDetails.isDsmExperience &&
                adventureDetails.children > 0 && (
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-700">
                        {adventureDetails.children} Child
                        {adventureDetails.children > 1 ? "ren" : ""}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        @ ${searchParams.get("price") || "512"}
                      </span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      $
                      {(
                        adventureDetails.children *
                        (Number.parseInt(searchParams.get("price")) || 512)
                      ).toLocaleString()}
                    </span>
                  </div>
                )}
              <div className="border-t border-gray-200 pt-3 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">TOTAL</span>
                  <span className="text-xl font-bold text-gray-800">
                    ${calculateTotal().toLocaleString()}
                  </span>
                </div>
                {paymentType === "installment" && currentStep === finalStep && (
                  <div className="mt-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Initial Payment:</span>
                      <span>${initialAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Payment:</span>
                      <span>
                        ${calculateInstallmentAmount().toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookingFlow = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingFlowContent />
    </Suspense>
  );
};

export default BookingFlow;
