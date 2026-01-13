import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Информация</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/payment" className="hover:text-gray-900">Оплата</Link>
              </li>
              <li>
                <Link href="/delivery" className="hover:text-gray-900">Доставка</Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-gray-900">Правила возврата</Link>
              </li>
              <li>
                <Link href="/requisites" className="hover:text-gray-900">Реквизиты</Link>
              </li>
              <li>
                <Link href="/offer" className="hover:text-gray-900">Оферта</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gray-900">Политика конфиденциальности</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Сервисы</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/gift-card" className="hover:text-gray-900">Подарочная карта</Link>
              </li>
              <li>
                <Link href="/loyalty" className="hover:text-gray-900">Программа лояльности</Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-gray-900">Избранное</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Контакты</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <span className="font-medium">Телефон</span>
              </li>
              <li>
                <a href="tel:80000000000" className="hover:text-gray-900">
                  8 (000) 000-00-00
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm text-gray-600">
              Сайт создан для ознакомления с функциональными возможностями Сервиса. Покупка товаров невозможна.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>© Muted.</p>
        </div>
      </div>
    </footer>
  )
}
