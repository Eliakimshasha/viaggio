export interface PersonalDetails {
  fullName: string
  email: string
  dateOfBirth: string
  gender: string
  nationality: string
  phone: string
  additionalInfo: string
}

export interface Booking {
  id: string
  trip: string
  adults: number
  children: number
  startDate: string
  endDate: string
  cost: string
  status: "Full Paid" | "Pending" | "Cancelled"
}

export interface Payment {
  id: string
  location: string
  adults: number
  children: number
  startDate: string
  endDate: string
  cost: string
  paid: string
  balance: string
  status: "Pending" | "Paid" | "Overdue"
}

export interface NavItem {
  id: string
  label: string
  icon: string
  href: string
}
