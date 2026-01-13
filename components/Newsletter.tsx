'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setSubmitted(true)
        setEmail('')
      }
    } catch (error) {
      console.error('Ошибка подписки:', error)
    }
  }

  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Подпишитесь на рассылку</h2>
        <p className="text-gray-600 mb-6">
          Подпишитесь на наши акции и новости и получите скидку на первый заказ
        </p>
        
        {submitted ? (
          <div className="bg-green-100 text-green-800 px-4 py-3 rounded">
            Спасибо за подписку!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ваш email"
              required
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Подписаться
            </button>
          </form>
        )}

        <p className="text-xs text-gray-500 mt-4">
          Нажимая «Подписаться», вы даете согласие на обработку указанных персональных данных в целях получения информационной и рекламной рассылки
        </p>
      </div>
    </section>
  )
}
