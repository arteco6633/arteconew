import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Catalog from '@/components/Catalog'
import PromoBanner from '@/components/PromoBanner'
import Newsletter from '@/components/Newsletter'
import Bestsellers from '@/components/Bestsellers'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      {/* Отступ для fixed хэдера (h-20 + h-12 = 128px) */}
      <div className="pt-[128px]">
        <PromoBanner />
        <Bestsellers />
        <Catalog />
        <Newsletter />
        <Footer />
      </div>
    </main>
  )
}
