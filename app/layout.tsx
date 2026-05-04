import { Afacad, Adamina, Fira_Code } from "next/font/google"

import "./globals.css"
import { Providers } from "./providers"
import { Toaster } from "@/components/ui/sonner"

const fontSans = Afacad({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontSerif = Adamina({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
})

const fontMono = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}
    >
      <body>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}