import "./globals.css"
import { LayoutContent } from "../../components/layout-content"

export const metadata = {
  title: "Your App Name",
  description: "Your app description",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/favicon-32x32.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/favicon-32x32.png" />
        {/* ... other head elements */}
      </head>
      <body>
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  )
}
