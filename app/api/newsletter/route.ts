import { NextRequest, NextResponse } from 'next/server'

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

    // Здесь можно добавить сохранение в базу данных
    console.log('Новая подписка:', email)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Ошибка подписки:', error)
    return NextResponse.json({ error: 'Ошибка подписки' }, { status: 500 })
  }
}
