import { NextRequest, NextResponse } from 'next/server'
import { getProducts, createProduct } from '@/lib/data'
import { Product } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category') || undefined

    const products = getProducts(category)
    return NextResponse.json(products)
  } catch (error) {
    console.error('Ошибка получения товаров:', error)
    return NextResponse.json({ error: 'Ошибка получения товаров' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, price, originalPrice, image, category, description, isBestseller } = body

    if (!name || !price || !image || !category) {
      return NextResponse.json(
        { error: 'Отсутствуют обязательные поля' },
        { status: 400 }
      )
    }

    const product = createProduct({
      name,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      image,
      category,
      description,
      isBestseller: Boolean(isBestseller),
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Ошибка создания товара:', error)
    return NextResponse.json({ error: 'Ошибка создания товара' }, { status: 500 })
  }
}
