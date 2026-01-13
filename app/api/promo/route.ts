import { NextRequest, NextResponse } from 'next/server'
import { getPromoBlocks, createPromoBlock } from '@/lib/data'

export async function GET(request: NextRequest) {
  try {
    const blocks = getPromoBlocks()
    return NextResponse.json(blocks)
  } catch (error) {
    console.error('Ошибка получения промо-блоков:', error)
    return NextResponse.json({ error: 'Ошибка получения промо-блоков' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, subtitle, image, link, isActive, order } = body

    if (!title || !image) {
      return NextResponse.json(
        { error: 'Отсутствуют обязательные поля' },
        { status: 400 }
      )
    }

    const block = createPromoBlock({
      title,
      subtitle,
      image,
      link,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      order: order || 0,
    })

    return NextResponse.json(block, { status: 201 })
  } catch (error) {
    console.error('Ошибка создания промо-блока:', error)
    return NextResponse.json({ error: 'Ошибка создания промо-блока' }, { status: 500 })
  }
}
