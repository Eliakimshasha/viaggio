"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Calendar, CreditCard, LogOut } from "lucide-react"
import { Button } from "../../components/ui/Button"
import { navigationItems, bookingsData, paymentsData } from "../../components/lib/data"

const iconMap = {
  user: User,
  calendar: Calendar,
  "credit-card": CreditCard,
}

// Get counts for each section
const getCounts = () => {
  return {
    "personal-details": 1, // Always 1 profile
    bookings: bookingsData.length,
    payments: paymentsData.length,
  }
}

export function Sidebar() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const counts = getCounts()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      {/* Mobile: Horizontal Cards */}
      <div className="lg:hidden border-b border-gray-200 p-4">
        <div className="grid grid-cols-3 gap-2">
          {navigationItems.map((item) => {
            const Icon = iconMap[item.icon]
            const isActive =
              mounted && (pathname === item.href || (pathname === "/dashboard" && item.id === "personal-details"))
            const count = counts[item.id] || 0

            return (
              <Link key={item.id} href={item.href}>
                <div
                  className={`p-3 rounded-lg border-2 transition-all ${
                    isActive ? "border-black bg-black text-white" : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <Icon size={20} />
                    <span className="text-xs font-medium text-center leading-tight">{item.label}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        isActive ? "bg-white text-black" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {count}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Desktop: Vertical Sidebar */}
      <div className="hidden lg:block w-64 pt-6 min-h-screen">
        <div className="p-4 flex flex-col h-full min-h-screen">
          <div className="flex-1">
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = iconMap[item.icon]
                const isActive =
                  mounted && (pathname === item.href || (pathname === "/dashboard" && item.id === "personal-details"))
                const count = counts[item.id] || 0

                return (
                  <Link key={item.id} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full md:mb-3 justify-between gap-3 ${
                        isActive
                          ? "bg-black text-white hover:bg-gray-800"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} />
                        {item.label}
                      </div>
                      <span
                        className={`text-xs px-2 md:hidden block py-0.5 rounded-full ${
                          isActive ? "bg-white text-black" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {count}
                      </span>
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="pt-4 border-t border-white">
            <Button variant="ghost" className="w-full justify-start gap-3 text-gray-600 hover:text-gray-900">
              <LogOut size={18} />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
