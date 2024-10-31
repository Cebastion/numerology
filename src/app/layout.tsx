import type { Metadata } from "next"
import "./globals.css"
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import YandexMetrika from "@/components/YandexMetrika/YandexMetrika"

export const metadata: Metadata = {
  title: "⭐Личная программа по дате рожения с расшифровкой - Матрица Судьбы",
  description: "✔ Калькулятор Матрицы судьбы по дате рождения раскроет грани и глубины структуры личности ☛ Потенциал, таланты и слабые места вашей личности познайте прямо сейчас онлайн и бесплатно ☛ Выбор тарифа для прогноза на 10 лет и глубокого анализа структуры вашей личности!",
  keywords: ['расшифровка судьбы', 'Матрица судьбы:  Нумерологический онлайн-калькулятор'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en">
      <body>
        <YandexMetrika />
        <div className="wallpaper">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
