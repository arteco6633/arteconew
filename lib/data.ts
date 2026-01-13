import { Product, PromoBlock } from '@/types'
import * as dbSupabase from './db'
import * as fsData from './data-fs'

// Определяем, использовать ли БД или файловую систему
const getDatabaseType = () => {
  // Приоритет: Supabase > файловая система
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  ) {
    return 'supabase' // Supabase Cloud
  }
  return false // Файловая система
}

// Функции для работы с товарами
export async function getProducts(category?: string): Promise<Product[]> {
  const dbType = getDatabaseType()
  if (dbType === 'supabase') {
    try {
      return await dbSupabase.getProducts(category)
    } catch (error) {
      console.error('Supabase error, falling back to file system:', error)
      return Promise.resolve(fsData.getProducts(category))
    }
  }
  return Promise.resolve(fsData.getProducts(category))
}

export async function getProductById(id: string): Promise<Product | null> {
  const dbType = getDatabaseType()
  if (dbType === 'supabase') {
    try {
      return await dbSupabase.getProductById(id)
    } catch (error) {
      console.error('Supabase error, falling back to file system:', error)
      return Promise.resolve(fsData.getProductById(id))
    }
  }
  return Promise.resolve(fsData.getProductById(id))
}

export async function createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
  const dbType = getDatabaseType()
  if (dbType === 'supabase') {
    try {
      return await dbSupabase.createProduct(product)
    } catch (error) {
      console.error('Supabase error, falling back to file system:', error)
      return Promise.resolve(fsData.createProduct(product))
    }
  }
  return Promise.resolve(fsData.createProduct(product))
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const dbType = getDatabaseType()
  if (dbType === 'supabase') {
    try {
      return await dbSupabase.updateProduct(id, updates)
    } catch (error) {
      console.error('Supabase error, falling back to file system:', error)
      return Promise.resolve(fsData.updateProduct(id, updates))
    }
  }
  return Promise.resolve(fsData.updateProduct(id, updates))
}

export async function deleteProduct(id: string): Promise<boolean> {
  const dbType = getDatabaseType()
  if (dbType === 'supabase') {
    try {
      return await dbSupabase.deleteProduct(id)
    } catch (error) {
      console.error('Supabase error, falling back to file system:', error)
      return Promise.resolve(fsData.deleteProduct(id))
    }
  }
  return Promise.resolve(fsData.deleteProduct(id))
}

// Функции для работы с промо-блоками
export async function getPromoBlocks(): Promise<PromoBlock[]> {
  const dbType = getDatabaseType()
  if (dbType === 'supabase') {
    try {
      return await dbSupabase.getPromoBlocks()
    } catch (error) {
      console.error('Supabase error, falling back to file system:', error)
      return Promise.resolve(fsData.getPromoBlocks())
    }
  }
  return Promise.resolve(fsData.getPromoBlocks())
}

export async function getPromoBlockById(id: string): Promise<PromoBlock | null> {
  const dbType = getDatabaseType()
  if (dbType === 'supabase') {
    try {
      return await dbSupabase.getPromoBlockById(id)
    } catch (error) {
      console.error('Supabase error, falling back to file system:', error)
      return Promise.resolve(fsData.getPromoBlockById(id))
    }
  }
  return Promise.resolve(fsData.getPromoBlockById(id))
}

export async function createPromoBlock(block: Omit<PromoBlock, 'id' | 'createdAt' | 'updatedAt'>): Promise<PromoBlock> {
  const dbType = getDatabaseType()
  if (dbType === 'supabase') {
    try {
      return await dbSupabase.createPromoBlock(block)
    } catch (error) {
      console.error('Supabase error, falling back to file system:', error)
      return Promise.resolve(fsData.createPromoBlock(block))
    }
  }
  return Promise.resolve(fsData.createPromoBlock(block))
}

export async function updatePromoBlock(id: string, updates: Partial<PromoBlock>): Promise<PromoBlock | null> {
  const dbType = getDatabaseType()
  if (dbType === 'supabase') {
    try {
      return await dbSupabase.updatePromoBlock(id, updates)
    } catch (error) {
      console.error('Supabase error, falling back to file system:', error)
      return Promise.resolve(fsData.updatePromoBlock(id, updates))
    }
  }
  return Promise.resolve(fsData.updatePromoBlock(id, updates))
}

export async function deletePromoBlock(id: string): Promise<boolean> {
  const dbType = getDatabaseType()
  if (dbType === 'supabase') {
    try {
      return await dbSupabase.deletePromoBlock(id)
    } catch (error) {
      console.error('Supabase error, falling back to file system:', error)
      return Promise.resolve(fsData.deletePromoBlock(id))
    }
  }
  return Promise.resolve(fsData.deletePromoBlock(id))
}

// Функция для подписки на рассылку
export async function subscribeToNewsletter(email: string): Promise<boolean> {
  const dbType = getDatabaseType()
  if (dbType === 'supabase') {
    try {
      return await dbSupabase.subscribeToNewsletter(email)
    } catch (error) {
      console.error('Supabase error, falling back to file system:', error)
      return Promise.resolve(fsData.subscribeToNewsletter(email))
    }
  }
  return Promise.resolve(fsData.subscribeToNewsletter(email))
}
