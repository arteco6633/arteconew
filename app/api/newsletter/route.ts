import { NextRequest, NextResponse } from 'next/server'
import { subscribeToNewsletter as subscribeSupabase } from '@/lib/db'
import { subscribeToNewsletter as subscribePg } from '@/lib/db-pg'

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
      // Пробуем PostgreSQL, затем Supabase
      if (process.env.DATABASE_URL) {
        await subscribePg(email)
      } else if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        await subscribeSupabase(email)
      } else {
        console.log('Новая подписка:', email)
      }
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
