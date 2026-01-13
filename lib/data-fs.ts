import { Product, PromoBlock } from '@/types'
import fs from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data')

// Убедимся, что директория существует
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

const productsFile = path.join(dataDir, 'products.json')
const promoFile = path.join(dataDir, 'promo.json')

// Инициализация файлов с тестовыми данными, если их нет
function initDataFiles() {
  if (!fs.existsSync(productsFile)) {
    const initialProducts: Product[] = [
      {
        id: '1',
        name: 'Лёгкая рубашка с цветочным принтом',
        price: 113100,
        image: '/images/product1.jpg',
        category: 'рубашки',
        isBestseller: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Серые шерстяные брюки с защипами',
        price: 140300,
        image: '/images/product2.jpg',
        category: 'брюки',
        isBestseller: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Корсетный чёрный топ с кружевом',
        price: 90300,
        originalPrice: 120000,
        image: '/images/product3.jpg',
        category: 'футболки',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '4',
        name: 'Элегантное белое платье с чёрным бантом',
        price: 230000,
        image: '/images/product4.jpg',
        category: 'платья',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '5',
        name: 'Шёлковая рубашка пастельного оттенка',
        price: 110900,
        image: '/images/product5.jpg',
        category: 'рубашки',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '6',
        name: 'Широкие голубые брюки с защипами',
        price: 160000,
        image: '/images/product6.jpg',
        category: 'брюки',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '7',
        name: 'Лонгслив с открытыми плечами в молочном оттенке',
        price: 210300,
        image: '/images/product7.jpg',
        category: 'худи',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '8',
        name: 'Нежный голубой топ-сетка',
        price: 160900,
        image: '/images/product8.jpg',
        category: 'футболки',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
    fs.writeFileSync(productsFile, JSON.stringify(initialProducts, null, 2))
  }

  if (!fs.existsSync(promoFile)) {
    const initialPromo: PromoBlock[] = [
      {
        id: '1',
        title: 'shop the look',
        image: '/images/promo1.jpg',
        isActive: true,
        order: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
    fs.writeFileSync(promoFile, JSON.stringify(initialPromo, null, 2))
  }
}

// Инициализация при первом импорте
initDataFiles()

export function getProducts(category?: string): Product[] {
  try {
    initDataFiles() // Убедимся, что файлы инициализированы
    const data = fs.readFileSync(productsFile, 'utf-8')
    let products: Product[] = JSON.parse(data)

    if (category) {
      if (category === 'бестселлеры') {
        products = products.filter((p) => p.isBestseller)
      } else {
        products = products.filter((p) => p.category.toLowerCase() === category.toLowerCase())
      }
    }

    return products
  } catch (error) {
    console.error('Ошибка чтения товаров:', error)
    return []
  }
}

export function getProductById(id: string): Product | null {
  const products = getProducts()
  return products.find((p) => p.id === id) || null
}

export function createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product {
  const products = getProducts()
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  products.push(newProduct)
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2))
  return newProduct
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getProducts()
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) return null

  products[index] = {
    ...products[index],
    ...updates,
    id,
    updatedAt: new Date().toISOString(),
  }
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2))
  return products[index]
}

export function deleteProduct(id: string): boolean {
  const products = getProducts()
  const filtered = products.filter((p) => p.id !== id)
  if (filtered.length === products.length) return false

  fs.writeFileSync(productsFile, JSON.stringify(filtered, null, 2))
  return true
}

export function getPromoBlocks(): PromoBlock[] {
  try {
    initDataFiles() // Убедимся, что файлы инициализированы
    const data = fs.readFileSync(promoFile, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Ошибка чтения промо-блоков:', error)
    return []
  }
}

export function getPromoBlockById(id: string): PromoBlock | null {
  const blocks = getPromoBlocks()
  return blocks.find((b) => b.id === id) || null
}

export function createPromoBlock(block: Omit<PromoBlock, 'id' | 'createdAt' | 'updatedAt'>): PromoBlock {
  const blocks = getPromoBlocks()
  const newBlock: PromoBlock = {
    ...block,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  blocks.push(newBlock)
  fs.writeFileSync(promoFile, JSON.stringify(blocks, null, 2))
  return newBlock
}

export function updatePromoBlock(id: string, updates: Partial<PromoBlock>): PromoBlock | null {
  const blocks = getPromoBlocks()
  const index = blocks.findIndex((b) => b.id === id)
  if (index === -1) return null

  blocks[index] = {
    ...blocks[index],
    ...updates,
    id,
    updatedAt: new Date().toISOString(),
  }
  fs.writeFileSync(promoFile, JSON.stringify(blocks, null, 2))
  return blocks[index]
}

export function deletePromoBlock(id: string): boolean {
  const blocks = getPromoBlocks()
  const filtered = blocks.filter((b) => b.id !== id)
  if (filtered.length === blocks.length) return false

  fs.writeFileSync(promoFile, JSON.stringify(filtered, null, 2))
  return true
}
