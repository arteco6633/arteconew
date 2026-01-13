export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  description?: string
  isBestseller?: boolean
  createdAt: string
  updatedAt: string
}

export interface PromoBlock {
  id: string
  title: string
  subtitle?: string
  image: string
  link?: string
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  order: number
}
