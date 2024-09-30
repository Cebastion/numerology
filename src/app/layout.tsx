import type { Metadata } from "next"
import "./globals.css"
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Head from 'next/head'

export const metadata: Metadata = {
  title: "Numerology",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <div className="wallpaper">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
