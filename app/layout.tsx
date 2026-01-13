import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ричмонд - Интернет-магазин',
  description: 'Каталог одежды и аксессуаров',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
