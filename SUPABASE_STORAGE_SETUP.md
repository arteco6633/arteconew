# Настройка Supabase Storage для загрузки файлов

## Шаг 1: Создание bucket в Supabase

1. Откройте панель Supabase: https://supabase.com/dashboard
2. Выберите ваш проект
3. Перейдите в **Storage** (в левом меню)
4. Нажмите **"New bucket"**
5. Заполните:
   - **Name**: `images`
   - **Public bucket**: ✅ Включите (чтобы файлы были доступны публично)
   - **File size limit**: `10 MB` (или больше, если нужно)
   - **Allowed MIME types**: `image/jpeg, image/png, image/webp, image/gif` (или оставьте пустым для всех)
6. Нажмите **"Create bucket"**

## Шаг 2: Настройка политик доступа (опционально)

Если bucket публичный, файлы будут доступны всем. Если нужна защита:

1. Перейдите в **Storage** → **Policies**
2. Создайте политику для bucket `images`:
   - **Policy name**: `Allow public read`
   - **Allowed operation**: `SELECT` (чтение)
   - **Policy definition**: 
     ```sql
     bucket_id = 'images'
     ```
   - **Target roles**: `anon`, `authenticated`

## Шаг 3: Проверка переменных окружения

Убедитесь, что в `.env` файле есть:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Важно:** `SUPABASE_SERVICE_ROLE_KEY` нужен для загрузки файлов с сервера.

## Шаг 4: Проверка работы

1. Откройте админ-панель: http://localhost:3000/admin/promo
2. Нажмите "Добавить промо-блок"
3. Нажмите "Выбрать файл" и загрузите изображение
4. Файл должен загрузиться в Supabase Storage
5. URL будет автоматически заполнен

## Структура файлов в Storage

Файлы будут храниться в bucket `images` по пути:
```
images/
  uploads/
    1234567890-abc123.jpg
    1234567891-def456.png
    ...
```

## Troubleshooting

### Ошибка "Bucket not found"
- Убедитесь, что bucket `images` создан в Supabase
- Проверьте название bucket (должно быть точно `images`)

### Ошибка "new row violates row-level security policy"
- Убедитесь, что bucket публичный, или настройте политики RLS

### Ошибка "Invalid API key"
- Проверьте `SUPABASE_SERVICE_ROLE_KEY` в `.env`
- Используйте Service Role Key, а не Anon Key

### Файлы не отображаются
- Проверьте, что bucket публичный
- Или настройте политики для публичного доступа
