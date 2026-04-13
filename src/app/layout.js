import "./globals.css"
import { LayoutContent } from "../../components/layout-content"

export const metadata = {
  title: "Your App Name",
  description: "Your app description",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ... other head elements */}
      </head>
      <body>
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  )
}
