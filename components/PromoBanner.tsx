'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PromoBlock } from '@/types'

export default function PromoBanner() {
  const [promoBlocks, setPromoBlocks] = useState<PromoBlock[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPromoBlocks()
  }, [])

  const fetchPromoBlocks = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/promo')
      const data = await response.json()
      const activePromos = data.filter((promo: PromoBlock) => promo.isActive)
      activePromos.sort((a: PromoBlock, b: PromoBlock) => a.order - b.order)
      setPromoBlocks(activePromos)
    } catch (error) {
      console.error('Ошибка загрузки промо-блоков:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || promoBlocks.length === 0) {
    return null
  }

  return (
    <section className="w-full">
      {promoBlocks.map((promo) => (
        <div key={promo.id} className="relative w-full h-[400px] md:h-[500px]">
          {promo.link ? (
            <Link href={promo.link}>
              <Image
                src={promo.image}
                alt={promo.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h2 className="text-3xl md:text-5xl font-bold mb-2">{promo.title}</h2>
                  {promo.subtitle && (
                    <p className="text-lg md:text-xl">{promo.subtitle}</p>
                  )}
                </div>
              </div>
            </Link>
          ) : (
            <>
              <Image
                src={promo.image}
                alt={promo.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h2 className="text-3xl md:text-5xl font-bold mb-2">{promo.title}</h2>
                  {promo.subtitle && (
                    <p className="text-lg md:text-xl">{promo.subtitle}</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </section>
  )
}
