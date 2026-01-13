'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'

export default function Bestsellers() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBestsellers()
  }, [])

  const fetchBestsellers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/products?category=бестселлеры')
      const data = await response.json()
      // Ограничиваем до 3-4 товаров для блока бестселлеров
      setProducts(data.slice(0, 4))
    } catch (error) {
      console.error('Ошибка загрузки бестселлеров:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return null
  }

  if (products.length === 0) {
    return null
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">бестселлеры</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : null

            return (
              <Link key={product.id} href={`/product/${product.id}`} className="group">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {discount && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1">
                      -{discount}%
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                    {product.name}
                  </h3>
                  <div className="mt-1 flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-900">
                      {product.price.toLocaleString('ru-RU')} ₽
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.originalPrice.toLocaleString('ru-RU')} ₽
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
