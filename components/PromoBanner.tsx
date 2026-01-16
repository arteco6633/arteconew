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
      {promoBlocks.map((promo, index) => (
        <div key={promo.id} className="relative w-full h-[70vh] min-h-[600px] max-h-[900px]">
          {promo.link ? (
            <Link href={promo.link} className="block w-full h-full">
              <Image
                src={promo.image}
                alt={promo.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              {(promo.title || promo.subtitle) && (
                <div className="absolute inset-0 flex items-end justify-center pb-12 md:pb-20">
                  <div className="text-center text-white px-4 max-w-4xl">
                    {promo.title && (
                      <h2 className="text-2xl md:text-4xl lg:text-5xl font-light mb-2 tracking-wide">
                        {promo.title}
                      </h2>
                    )}
                    {promo.subtitle && (
                      <p className="text-base md:text-lg lg:text-xl font-light">
                        {promo.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </Link>
          ) : (
            <div className="w-full h-full">
              <Image
                src={promo.image}
                alt={promo.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              {(promo.title || promo.subtitle) && (
                <div className="absolute inset-0 flex items-end justify-center pb-12 md:pb-20">
                  <div className="text-center text-white px-4 max-w-4xl">
                    {promo.title && (
                      <h2 className="text-2xl md:text-4xl lg:text-5xl font-light mb-2 tracking-wide">
                        {promo.title}
                      </h2>
                    )}
                    {promo.subtitle && (
                      <p className="text-base md:text-lg lg:text-xl font-light">
                        {promo.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </section>
  )
}
