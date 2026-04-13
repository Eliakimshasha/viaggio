import type { PersonalDetails, Booking, Payment, NavItem } from "./types"

export const personalDetailsData: PersonalDetails = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  dateOfBirth: "",
  gender: "",
  nationality: "",
  phone: "",
  additionalInfo: "",
}

export const bookingsData: Booking[] = [
  {
    id: "1",
    trip: "Kkma Zaoa",
    adults: 2,
    children: 0,
    startDate: "28 Mar 2025",
    endDate: "30 Mar 2025",
    cost: "1,000,000 TZS",
    status: "Full Paid",
  },
  {
    id: "2",
    trip: "Proposps",
    adults: 4,
    children: 0,
    startDate: "01 Apr 2025",
    endDate: "05 Apr 2025",
    cost: "1,200,000 TZS",
    status: "Pending",
  },
]

export const paymentsData: Payment[] = [
  {
    id: "1",
    location: "Kilimanjaro Ut",
    adults: 2,
    children: 0,
    startDate: "28 Mar 2025",
    endDate: "30 Mar 2025",
    cost: "$1,769",
    paid: "-",
    balance: "$1,769",
    status: "Pending",
  },
  {
    id: "2",
    location: "Zanzibar",
    adults: 4,
    children: 0,
    startDate: "01 Apr 2025",
    endDate: "05 Apr 2025",
    cost: "$1,500",
    paid: "-",
    balance: "$1,500",
    status: "Pending",
  },
]

export const navigationItems: NavItem[] = [
  {
    id: "personal-details",
    label: "Personal Details",
    icon: "user",
    href: "/dashboard/",
  },
  {
    id: "bookings",
    label: "Bookings",
    icon: "calendar",
    href: "/dashboard/bookings",
  },
  {
    id: "payments",
    label: "Payments",
    icon: "credit-card",
    href: "/dashboard/payments",
  },
]

export const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
]

export const countryOptions = [
  { value: "tz", label: "Tanzania", flag: "🇹🇿" },
  { value: "ke", label: "Kenya", flag: "🇰🇪" },
  { value: "ug", label: "Uganda", flag: "🇺🇬" },
  { value: "us", label: "United States", flag: "🇺🇸" },
  { value: "uk", label: "United Kingdom", flag: "🇬🇧" },
]
