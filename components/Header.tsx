'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Показываем хэдер при скролле вверх или в самом верху
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true)
      } 
      // Скрываем хэдер при скролле вниз
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

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
    <header 
      className={`text-white w-full fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{ backgroundColor: '#474A51' }}
    >
      {/* Верхняя полоса с логотипом и иконками */}
      <div className="border-b border-white border-opacity-30" style={{ borderWidth: '0.5px' }}>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Логотип */}
            <Link href="/" className="text-xl font-normal tracking-wide text-white hover:text-white no-underline">
              ARTECO
            </Link>

            {/* Иконки справа */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              {/* Поиск */}
              <button className="hover:opacity-70 transition-opacity flex-shrink-0" aria-label="Поиск">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Избранное */}
              <button className="hover:opacity-70 transition-opacity flex-shrink-0" aria-label="Избранное">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              {/* Пользователь */}
              <button className="hover:opacity-70 transition-opacity flex-shrink-0 hidden sm:block" aria-label="Профиль">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              {/* Корзина */}
              <button className="hover:opacity-70 transition-opacity flex-shrink-0" aria-label="Корзина">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Навигационная панель */}
      <div className="border-b" style={{ borderColor: '#3a3d43' }}>
        <div className="w-full px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-12">
            {/* Навигация слева */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              <Link href="/" className="text-sm text-white hover:opacity-70 transition-opacity whitespace-nowrap no-underline">
                Каталог
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/catalog/${category.toLowerCase()}`}
                  className="text-sm text-white hover:opacity-70 transition-opacity whitespace-nowrap no-underline"
                >
                  {category}
                </Link>
              ))}
            </nav>

            {/* Телефон и мобильное меню справа */}
            <div className="absolute right-4 sm:right-6 lg:right-8 flex items-center space-x-4">
              {/* Телефон - скрыт на мобильных */}
              <div className="hidden sm:flex items-center space-x-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              <a href="tel:80000000000" className="text-sm text-white hover:opacity-70 transition-opacity whitespace-nowrap no-underline">
                8 (000) 000-00-00
              </a>
              </div>

              {/* Мобильное меню */}
              <button
                className="lg:hidden flex-shrink-0"
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
      </div>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <nav className="lg:hidden border-t" style={{ backgroundColor: '#474A51', borderColor: '#3a3d43' }}>
          <div className="px-4 py-4 space-y-3">
            <Link 
              href="/" 
              className="block text-sm text-white hover:opacity-70 transition-opacity py-2 no-underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Каталог
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/catalog/${category.toLowerCase()}`}
                className="block text-sm text-white hover:opacity-70 transition-opacity py-2 no-underline"
                onClick={() => setIsMenuOpen(false)}
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
