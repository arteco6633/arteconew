'use client'

import { PromoBlock } from '@/types'
import Image from 'next/image'

interface PromoListProps {
  promoBlocks: PromoBlock[]
  onEdit: (promo: PromoBlock) => void
  onDelete: (id: string) => void
}

export default function PromoList({ promoBlocks, onEdit, onDelete }: PromoListProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Изображение
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Заголовок
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Подзаголовок
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Порядок
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Статус
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Действия
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {promoBlocks.map((promo) => (
            <tr key={promo.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="relative w-32 h-20">
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{promo.title}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-500">{promo.subtitle || '-'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{promo.order}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {promo.isActive ? (
                  <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded">
                    Активен
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 rounded">
                    Неактивен
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(promo)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => onDelete(promo.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
