import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/admin" className="flex items-center px-4 text-xl font-bold">
                Админ-панель
              </Link>
              <div className="flex space-x-4">
                <Link
                  href="/admin/products"
                  className="flex items-center px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  Товары
                </Link>
                <Link
                  href="/admin/promo"
                  className="flex items-center px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  Промо-блоки
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <Link
                href="/"
                className="px-4 text-gray-700 hover:text-gray-900"
              >
                На сайт
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
}
