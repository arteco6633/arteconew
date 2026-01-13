import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Панель управления</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/products"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Управление товарами</h2>
          <p className="text-gray-600">
            Добавляйте, редактируйте и удаляйте товары в каталоге
          </p>
        </Link>

        <Link
          href="/admin/promo"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Управление промо-блоками</h2>
          <p className="text-gray-600">
            Управляйте промо-баннерами на главной странице
          </p>
        </Link>
      </div>
    </div>
  )
}
