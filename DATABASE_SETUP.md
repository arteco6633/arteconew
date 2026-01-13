# Настройка базы данных

## Шаг 1: Создание базы данных на Beget

1. Перейдите в панель управления Beget: https://cp.beget.com/cloud/databases/create
2. Выберите **PostgreSQL 16.4**
3. Выберите регион: **Россия, Москва**
4. Выберите конфигурацию (рекомендуется минимум 2 ГБ RAM для начала)
5. Создайте базу данных

## Шаг 2: Получение данных для подключения

После создания базы данных вы получите:
- **Host** (хост)
- **Port** (порт, обычно 5432)
- **Database** (имя базы данных)
- **Username** (имя пользователя)
- **Password** (пароль)

## Шаг 3: Настройка Supabase (рекомендуется)

### Вариант A: Использовать Supabase (рекомендуется)

1. Создайте аккаунт на https://supabase.com
2. Создайте новый проект
3. В настройках проекта найдите:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

### Вариант B: Прямое подключение к PostgreSQL Beget

Если используете прямую БД Beget, нужно настроить Supabase для работы с внешней БД или использовать прямой доступ через `pg` библиотеку.

## Шаг 4: Выполнение миграций

Подключитесь к базе данных и выполните SQL скрипт:

```bash
# Через psql
psql -h YOUR_HOST -U YOUR_USERNAME -d YOUR_DATABASE -f database/schema.sql

# Или через панель управления Beget (если есть SQL редактор)
```

Скопируйте содержимое файла `database/schema.sql` и выполните в SQL редакторе.

## Шаг 5: Настройка переменных окружения

1. Создайте файл `.env.local` в корне проекта:

```bash
cp .env.example .env.local
```

2. Заполните переменные:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

3. На сервере создайте файл `.env`:

```bash
ssh root@155.212.147.140
cd /var/www/arteconew
nano .env
# Вставьте те же переменные
```

## Шаг 6: Миграция данных (если есть старые данные)

Если у вас уже есть данные в JSON файлах, можно создать скрипт миграции:

```bash
# На сервере
cd /var/www/arteconew
node scripts/migrate-data.js
```

## Шаг 7: Проверка подключения

После настройки проверьте подключение:

1. Перезапустите приложение:
```bash
pm2 restart arteconew
```

2. Проверьте логи:
```bash
pm2 logs arteconew
```

3. Откройте админ-панель и попробуйте добавить товар

## Хранение файлов (изображений)

### Вариант 1: Supabase Storage (рекомендуется)

1. В Supabase создайте bucket `images`
2. Настройте политики доступа (public read)
3. Используйте Supabase Storage API для загрузки

### Вариант 2: Локальное хранилище на сервере

1. Создайте директорию для изображений:
```bash
mkdir -p /var/www/arteconew/public/images
chmod 755 /var/www/arteconew/public/images
```

2. Используйте Next.js API для загрузки файлов
3. Сохраняйте пути к файлам в БД

## Troubleshooting

### Ошибка подключения к БД

- Проверьте, что переменные окружения установлены правильно
- Проверьте, что БД доступна с сервера (firewall)
- Проверьте логи приложения: `pm2 logs arteconew`

### Ошибки миграции

- Убедитесь, что пользователь БД имеет права на создание таблиц
- Проверьте, что все SQL команды выполнены успешно
