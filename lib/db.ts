import { createClient } from '@supabase/supabase-js'
import { Product, PromoBlock } from '@/types'

// Инициализация Supabase клиента
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials not found. Using file system fallback.')
}

export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null

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
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  let query = supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (category) {
    if (category === 'бестселлеры') {
      query = query.eq('is_bestseller', true)
    } else {
      query = query.eq('category', category)
    }
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching products:', error)
    throw error
  }

  return (data as DbProduct[]).map(dbProductToProduct)
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null // Not found
    }
    console.error('Error fetching product:', error)
    throw error
  }

  return dbProductToProduct(data as DbProduct)
}

export async function createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const { data, error } = await supabase
    .from('products')
    .insert({
      name: product.name,
      price: product.price,
      original_price: product.originalPrice || null,
      image: product.image,
      category: product.category,
      description: product.description || null,
      is_bestseller: product.isBestseller || false,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating product:', error)
    throw error
  }

  return dbProductToProduct(data as DbProduct)
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const updateData: any = {}
  if (updates.name !== undefined) updateData.name = updates.name
  if (updates.price !== undefined) updateData.price = updates.price
  if (updates.originalPrice !== undefined) updateData.original_price = updates.originalPrice ?? null
  if (updates.image !== undefined) updateData.image = updates.image
  if (updates.category !== undefined) updateData.category = updates.category
  if (updates.description !== undefined) updateData.description = updates.description ?? null
  if (updates.isBestseller !== undefined) updateData.is_bestseller = updates.isBestseller

  const { data, error } = await supabase
    .from('products')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating product:', error)
    throw error
  }

  return dbProductToProduct(data as DbProduct)
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting product:', error)
    throw error
  }

  return true
}

// Функции для работы с промо-блоками
export async function getPromoBlocks(): Promise<PromoBlock[]> {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const { data, error } = await supabase
    .from('promo_blocks')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching promo blocks:', error)
    throw error
  }

  return (data as DbPromoBlock[]).map(dbPromoBlockToPromoBlock)
}

export async function getPromoBlockById(id: string): Promise<PromoBlock | null> {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const { data, error } = await supabase
    .from('promo_blocks')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null
    }
    console.error('Error fetching promo block:', error)
    throw error
  }

  return dbPromoBlockToPromoBlock(data as DbPromoBlock)
}

export async function createPromoBlock(block: Omit<PromoBlock, 'id' | 'createdAt' | 'updatedAt'>): Promise<PromoBlock> {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const { data, error } = await supabase
    .from('promo_blocks')
    .insert({
      title: block.title,
      subtitle: block.subtitle || null,
      image: block.image,
      link: block.link || null,
      is_active: block.isActive,
      display_order: block.order,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating promo block:', error)
    throw error
  }

  return dbPromoBlockToPromoBlock(data as DbPromoBlock)
}

export async function updatePromoBlock(id: string, updates: Partial<PromoBlock>): Promise<PromoBlock> {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const updateData: any = {}
  if (updates.title !== undefined) updateData.title = updates.title
  if (updates.subtitle !== undefined) updateData.subtitle = updates.subtitle ?? null
  if (updates.image !== undefined) updateData.image = updates.image
  if (updates.link !== undefined) updateData.link = updates.link ?? null
  if (updates.isActive !== undefined) updateData.is_active = updates.isActive
  if (updates.order !== undefined) updateData.display_order = updates.order

  const { data, error } = await supabase
    .from('promo_blocks')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating promo block:', error)
    throw error
  }

  return dbPromoBlockToPromoBlock(data as DbPromoBlock)
}

export async function deletePromoBlock(id: string): Promise<boolean> {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const { error } = await supabase
    .from('promo_blocks')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting promo block:', error)
    throw error
  }

  return true
}

// Функция для подписки на рассылку
export async function subscribeToNewsletter(email: string): Promise<boolean> {
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }

  const { error } = await supabase
    .from('newsletter_subscriptions')
    .insert({ email, is_active: true })
    .select()

  if (error) {
    // Игнорируем ошибку дублирования email
    if (error.code === '23505') {
      return true
    }
    console.error('Error subscribing to newsletter:', error)
    throw error
  }

  return true
}
