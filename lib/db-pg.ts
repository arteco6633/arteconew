import { Pool } from 'pg'
import { Product, PromoBlock } from '@/types'

// Создание пула подключений к PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
})

// Типы для базы данных
interface DbProduct {
  id: string
  name: string
  price: number
  original_price: number | null
  image: string
  category: string
  description: string | null
  is_bestseller: boolean
  created_at: string
  updated_at: string
}

interface DbPromoBlock {
  id: string
  title: string
  subtitle: string | null
  image: string
  link: string | null
  is_active: boolean
  display_order: number
  created_at: string
  updated_at: string
}

// Конвертация из БД в тип приложения
function dbProductToProduct(db: DbProduct): Product {
  return {
    id: db.id,
    name: db.name,
    price: Number(db.price),
    originalPrice: db.original_price ? Number(db.original_price) : undefined,
    image: db.image,
    category: db.category,
    description: db.description || undefined,
    isBestseller: db.is_bestseller,
    createdAt: db.created_at,
    updatedAt: db.updated_at,
  }
}

function dbPromoBlockToPromoBlock(db: DbPromoBlock): PromoBlock {
  return {
    id: db.id,
    title: db.title,
    subtitle: db.subtitle || undefined,
    image: db.image,
    link: db.link || undefined,
    isActive: db.is_active,
    order: db.display_order,
    createdAt: db.created_at,
    updatedAt: db.updated_at,
  }
}

// Функции для работы с товарами
export async function getProducts(category?: string): Promise<Product[]> {
  let query = 'SELECT * FROM products ORDER BY created_at DESC'
  let params: any[] = []

  if (category) {
    if (category === 'бестселлеры') {
      query = 'SELECT * FROM products WHERE is_bestseller = true ORDER BY created_at DESC'
    } else {
      query = 'SELECT * FROM products WHERE category = $1 ORDER BY created_at DESC'
      params = [category]
    }
  }

  const result = await pool.query<DbProduct>(query, params)
  return result.rows.map(dbProductToProduct)
}

export async function getProductById(id: string): Promise<Product | null> {
  const result = await pool.query<DbProduct>(
    'SELECT * FROM products WHERE id = $1',
    [id]
  )

  if (result.rows.length === 0) {
    return null
  }

  return dbProductToProduct(result.rows[0])
}

export async function createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
  const result = await pool.query<DbProduct>(
    `INSERT INTO products (name, price, original_price, image, category, description, is_bestseller)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      product.name,
      product.price,
      product.originalPrice || null,
      product.image,
      product.category,
      product.description || null,
      product.isBestseller || false,
    ]
  )

  return dbProductToProduct(result.rows[0])
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
  const fields: string[] = []
  const values: any[] = []
  let paramIndex = 1

  if (updates.name !== undefined) {
    fields.push(`name = $${paramIndex++}`)
    values.push(updates.name)
  }
  if (updates.price !== undefined) {
    fields.push(`price = $${paramIndex++}`)
    values.push(updates.price)
  }
  if (updates.originalPrice !== undefined) {
    fields.push(`original_price = $${paramIndex++}`)
    values.push(updates.originalPrice ?? null)
  }
  if (updates.image !== undefined) {
    fields.push(`image = $${paramIndex++}`)
    values.push(updates.image)
  }
  if (updates.category !== undefined) {
    fields.push(`category = $${paramIndex++}`)
    values.push(updates.category)
  }
  if (updates.description !== undefined) {
    fields.push(`description = $${paramIndex++}`)
    values.push(updates.description ?? null)
  }
  if (updates.isBestseller !== undefined) {
    fields.push(`is_bestseller = $${paramIndex++}`)
    values.push(updates.isBestseller)
  }

  if (fields.length === 0) {
    const existing = await getProductById(id)
    if (!existing) throw new Error('Product not found')
    return existing
  }

  values.push(id)
  const result = await pool.query<DbProduct>(
    `UPDATE products SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
    values
  )

  if (result.rows.length === 0) {
    throw new Error('Product not found')
  }

  return dbProductToProduct(result.rows[0])
}

export async function deleteProduct(id: string): Promise<boolean> {
  const result = await pool.query(
    'DELETE FROM products WHERE id = $1',
    [id]
  )

  return result.rowCount !== null && result.rowCount > 0
}

// Функции для работы с промо-блоками
export async function getPromoBlocks(): Promise<PromoBlock[]> {
  const result = await pool.query<DbPromoBlock>(
    'SELECT * FROM promo_blocks ORDER BY display_order ASC, created_at DESC'
  )

  return result.rows.map(dbPromoBlockToPromoBlock)
}

export async function getPromoBlockById(id: string): Promise<PromoBlock | null> {
  const result = await pool.query<DbPromoBlock>(
    'SELECT * FROM promo_blocks WHERE id = $1',
    [id]
  )

  if (result.rows.length === 0) {
    return null
  }

  return dbPromoBlockToPromoBlock(result.rows[0])
}

export async function createPromoBlock(block: Omit<PromoBlock, 'id' | 'createdAt' | 'updatedAt'>): Promise<PromoBlock> {
  const result = await pool.query<DbPromoBlock>(
    `INSERT INTO promo_blocks (title, subtitle, image, link, is_active, display_order)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      block.title,
      block.subtitle || null,
      block.image,
      block.link || null,
      block.isActive,
      block.order,
    ]
  )

  return dbPromoBlockToPromoBlock(result.rows[0])
}

export async function updatePromoBlock(id: string, updates: Partial<PromoBlock>): Promise<PromoBlock> {
  const fields: string[] = []
  const values: any[] = []
  let paramIndex = 1

  if (updates.title !== undefined) {
    fields.push(`title = $${paramIndex++}`)
    values.push(updates.title)
  }
  if (updates.subtitle !== undefined) {
    fields.push(`subtitle = $${paramIndex++}`)
    values.push(updates.subtitle ?? null)
  }
  if (updates.image !== undefined) {
    fields.push(`image = $${paramIndex++}`)
    values.push(updates.image)
  }
  if (updates.link !== undefined) {
    fields.push(`link = $${paramIndex++}`)
    values.push(updates.link ?? null)
  }
  if (updates.isActive !== undefined) {
    fields.push(`is_active = $${paramIndex++}`)
    values.push(updates.isActive)
  }
  if (updates.order !== undefined) {
    fields.push(`display_order = $${paramIndex++}`)
    values.push(updates.order)
  }

  if (fields.length === 0) {
    const existing = await getPromoBlockById(id)
    if (!existing) throw new Error('Promo block not found')
    return existing
  }

  values.push(id)
  const result = await pool.query<DbPromoBlock>(
    `UPDATE promo_blocks SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
    values
  )

  if (result.rows.length === 0) {
    throw new Error('Promo block not found')
  }

  return dbPromoBlockToPromoBlock(result.rows[0])
}

export async function deletePromoBlock(id: string): Promise<boolean> {
  const result = await pool.query(
    'DELETE FROM promo_blocks WHERE id = $1',
    [id]
  )

  return result.rowCount !== null && result.rowCount > 0
}

// Функция для подписки на рассылку
export async function subscribeToNewsletter(email: string): Promise<boolean> {
  try {
    await pool.query(
      `INSERT INTO newsletter_subscriptions (email, is_active)
       VALUES ($1, true)
       ON CONFLICT (email) DO UPDATE SET is_active = true`,
      [email]
    )
    return true
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    throw error
  }
}
