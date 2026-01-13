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
    <header className="bg-gray-900 text-white">
      {/* Верхняя полоса с логотипом и иконками */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Логотип */}
            <Link href="/" className="text-xl font-normal tracking-wide">
              rivael
            </Link>

            {/* Иконки справа */}
            <div className="flex items-center space-x-6">
              {/* Поиск */}
              <button className="hover:opacity-70 transition-opacity" aria-label="Поиск">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Избранное */}
              <button className="hover:opacity-70 transition-opacity" aria-label="Избранное">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              {/* Пользователь */}
              <button className="hover:opacity-70 transition-opacity" aria-label="Профиль">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              {/* Корзина */}
              <button className="hover:opacity-70 transition-opacity" aria-label="Корзина">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Навигационная панель */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Локация слева */}
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span className="text-sm">Красногорск</span>
            </div>

            {/* Навигация по центру */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm hover:opacity-70 transition-opacity">
                Каталог
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/catalog/${category.toLowerCase()}`}
                  className="text-sm hover:opacity-70 transition-opacity"
                >
                  {category}
                </Link>
              ))}
            </nav>

            {/* Телефон справа */}
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:80000000000" className="text-sm hover:opacity-70 transition-opacity">
                8 (000) 000-00-00
              </a>
            </div>

            {/* Мобильное меню */}
            <button
              className="md:hidden ml-4"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Меню"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-4 space-y-3">
            <Link href="/" className="block text-sm hover:opacity-70 transition-opacity">
              Каталог
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/catalog/${category.toLowerCase()}`}
                className="block text-sm hover:opacity-70 transition-opacity"
              >
                {category}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
