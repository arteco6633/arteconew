'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const categories = [
    'Футболки',
    'Брюки',
    'Сумки',
    'Худи',
    'Рубашки',
    'Платья',
    'Акции'
  ]

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              Ричмонд
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              Каталог
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/catalog/${category.toLowerCase()}`}
                className="text-gray-700 hover:text-gray-900"
              >
                {category}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <a href="tel:80000000000" className="text-gray-700 hover:text-gray-900">
              8 (000) 000-00-00
            </a>
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Меню"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-gray-700 hover:text-gray-900 py-2">
                Каталог
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/catalog/${category.toLowerCase()}`}
                  className="text-gray-700 hover:text-gray-900 py-2"
                >
                  {category}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
