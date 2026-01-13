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
      {/* Промо-блок без отступа сверху, так как хэдер fixed */}
      <PromoBanner />
      {/* Отступ для остального контента */}
      <div>
        <Bestsellers />
        <Catalog />
        <Newsletter />
        <Footer />
      </div>
    </main>
  )
}
