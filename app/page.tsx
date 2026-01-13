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
      <PromoBanner />
      <Bestsellers />
      <Catalog />
      <Newsletter />
      <Footer />
    </main>
  )
}
