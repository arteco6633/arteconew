import { NextRequest, NextResponse } from 'next/server'
import { getPromoBlockById, updatePromoBlock, deletePromoBlock } from '@/lib/data'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const block = await getPromoBlockById(params.id)
    if (!block) {
      return NextResponse.json({ error: 'Промо-блок не найден' }, { status: 404 })
    }
    return NextResponse.json(block)
  } catch (error) {
    console.error('Ошибка получения промо-блока:', error)
    return NextResponse.json({ error: 'Ошибка получения промо-блока' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const block = await updatePromoBlock(params.id, body)
    
    if (!block) {
      return NextResponse.json({ error: 'Промо-блок не найден' }, { status: 404 })
    }
    
    return NextResponse.json(block)
  } catch (error) {
    console.error('Ошибка обновления промо-блока:', error)
    return NextResponse.json({ error: 'Ошибка обновления промо-блока' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await deletePromoBlock(params.id)
    if (!deleted) {
      return NextResponse.json({ error: 'Промо-блок не найден' }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Ошибка удаления промо-блока:', error)
    return NextResponse.json({ error: 'Ошибка удаления промо-блока' }, { status: 500 })
  }
}
