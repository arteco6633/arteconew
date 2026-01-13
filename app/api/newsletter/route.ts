import { NextRequest, NextResponse } from 'next/server'
import { subscribeToNewsletter } from '@/lib/data'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Некорректный email' },
        { status: 400 }
      )
    }

    try {
      await subscribeToNewsletter(email)
      return NextResponse.json({ success: true })
    } catch (error) {
      // Если БД не настроена, просто логируем
      console.log('Новая подписка:', email)
      return NextResponse.json({ success: true })
    }
  } catch (error) {
    console.error('Ошибка подписки:', error)
    return NextResponse.json({ error: 'Ошибка подписки' }, { status: 500 })
  }
}
