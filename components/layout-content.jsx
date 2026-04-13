"use client"

import { usePathname } from "next/navigation"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Whatsapp from "../components/Whatsapp"

export function LayoutContent({ children }) {
  const path = usePathname()

  return (
    <>
      {!["authentication", "payments", "dashboard"].some((route) => path.startsWith(`/${route}`)) && <Header />}
      <div
        className={` ${
          ["authentication", "payments"].some((route) => path.startsWith(`/${route}`)) ? "mt-0" : "mt-14"
        } bg-white `}
      >
        {children}
      </div>
      {/* <div>
        <Whatsapp />
      </div> */}
      {!["authentication", "payments", "routes", "dashboard"].some((route) => path.startsWith(`/${route}`)) && (
        <Footer />
      )}
    </>
  )
}
