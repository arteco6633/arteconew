'use client'

import { useEffect, useState } from 'react'
import { PromoBlock } from '@/types'
import PromoForm from '@/components/admin/PromoForm'
import PromoList from '@/components/admin/PromoList'

export default function AdminPromo() {
  const [promoBlocks, setPromoBlocks] = useState<PromoBlock[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPromo, setEditingPromo] = useState<PromoBlock | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchPromoBlocks()
  }, [])

  const fetchPromoBlocks = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/promo')
      const data = await response.json()
      setPromoBlocks(data)
    } catch (error) {
      console.error('Ошибка загрузки промо-блоков:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingPromo(null)
    setShowForm(true)
  }

  const handleEdit = (promo: PromoBlock) => {
    setEditingPromo(promo)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот промо-блок?')) return

    try {
      const response = await fetch(`/api/promo/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchPromoBlocks()
      }
    } catch (error) {
      console.error('Ошибка удаления промо-блока:', error)
    }
  }

  const handleFormSubmit = () => {
    setShowForm(false)
    setEditingPromo(null)
    fetchPromoBlocks()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Управление промо-блоками</h1>
        <button
          onClick={handleCreate}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Добавить промо-блок
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <PromoForm
            promo={editingPromo}
            onSuccess={handleFormSubmit}
            onCancel={() => {
              setShowForm(false)
              setEditingPromo(null)
            }}
          />
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Загрузка...</p>
        </div>
      ) : (
        <PromoList
          promoBlocks={promoBlocks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}
