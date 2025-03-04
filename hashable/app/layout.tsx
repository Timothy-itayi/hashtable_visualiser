import type React from "react"
import "98.css/dist/98.css"
import "./globals.css"
import type { Metadata } from "next"




export const metadata: Metadata = {
  title: "HashTable Visualizer",
  description: "A Windows 98-style HashTable Visualizer",
  icons: {
    icon: [
      { url: "/icon.png" },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

