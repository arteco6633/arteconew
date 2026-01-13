import { NextRequest, NextResponse } from 'next/server'
import { getProductById, updateProduct, deleteProduct } from '@/lib/data'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await getProductById(params.id)
    if (!product) {
      return NextResponse.json({ error: 'Товар не найден' }, { status: 404 })
    }
    return NextResponse.json(product)
  } catch (error) {
    console.error('Ошибка получения товара:', error)
    return NextResponse.json({ error: 'Ошибка получения товара' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const product = await updateProduct(params.id, body)
    
    if (!product) {
      return NextResponse.json({ error: 'Товар не найден' }, { status: 404 })
    }
    
    return NextResponse.json(product)
  } catch (error) {
    console.error('Ошибка обновления товара:', error)
    return NextResponse.json({ error: 'Ошибка обновления товара' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await deleteProduct(params.id)
    if (!deleted) {
      return NextResponse.json({ error: 'Товар не найден' }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Ошибка удаления товара:', error)
    return NextResponse.json({ error: 'Ошибка удаления товара' }, { status: 500 })
  }
}
