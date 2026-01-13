'use client'

import { useState } from 'react'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
  required?: boolean
}

export default function ImageUpload({ value, onChange, label = 'Изображение', required = false }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Проверка типа файла
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      setError('Неподдерживаемый тип файла. Разрешены: JPEG, PNG, WebP, GIF')
      return
    }

    // Проверка размера (10MB)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      setError('Файл слишком большой. Максимальный размер: 10MB')
      return
    }

    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка загрузки')
      }

      onChange(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки файла')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && '*'}
      </label>
      
      {/* Превью текущего изображения */}
      {value && (
        <div className="mb-2">
          <div className="relative w-full h-48 border border-gray-300 rounded-md overflow-hidden">
            <img
              src={value}
              alt="Превью"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        </div>
      )}

      {/* Загрузка файла */}
      <div className="flex items-center space-x-4">
        <label className="flex-1 cursor-pointer">
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
          <div className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer text-center text-sm text-gray-700">
            {uploading ? 'Загрузка...' : value ? 'Заменить изображение' : 'Выбрать файл'}
          </div>
        </label>
      </div>

      {/* Поле для URL (альтернатива) */}
      <div className="mt-2">
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Или введите URL изображения"
          required={required}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
        />
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
