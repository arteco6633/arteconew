# Настройка переменных окружения

## Данные для подключения к БД:

- **Host:** `jogelfilulmir.beget.app:5432`
- **Database:** `arteco_db`
- **Username:** `arteco`
- **Password:** `8926416Salavat1996s@`
- **Private IP:** `10.19.0.1:5432` (используйте для подключения с сервера)

## Настройка на сервере:

### 1. Создайте файл .env на сервере:

```bash
ssh root@155.212.147.140
cd /var/www/arteconew
nano .env
```

### 2. Добавьте следующее содержимое:

```env
# PostgreSQL Database Connection (Beget)
# Используйте приватный IP для подключения с сервера (быстрее)
DATABASE_URL=postgresql://arteco:8926416Salavat1996s%40@10.19.0.1:5432/arteco_db
DATABASE_SSL=false
```

**Важно:** 
- `@` в пароле нужно экранировать как `%40` в URL
- Для приватного IP используйте `DATABASE_SSL=false`
- Для внешнего хоста используйте `DATABASE_SSL=true`

### 3. Альтернативный вариант (внешний хост):

Если приватный IP не работает, используйте внешний хост:

```env
DATABASE_URL=postgresql://arteco:8926416Salavat1996s%40@jogelfilulmir.beget.app:5432/arteco_db
DATABASE_SSL=true
```

## Настройка локально (для разработки):

Создайте файл `.env.local`:

```bash
cp env.template .env.local
nano .env.local
```

Добавьте:

```env
# Для локальной разработки используйте внешний хост
DATABASE_URL=postgresql://arteco:8926416Salavat1996s%40@jogelfilulmir.beget.app:5432/arteco_db
DATABASE_SSL=true
```

## Проверка подключения:

### На сервере:

```bash
ssh root@155.212.147.140
cd /var/www/arteconew

# Установите зависимости (если еще не установлены)
npm install

# Перезапустите приложение
pm2 restart arteconew

# Проверьте логи
pm2 logs arteconew --lines 50
```

### Проверка через psql:

```bash
# На сервере
psql -h 10.19.0.1 -U arteco -d arteco_db
# Введите пароль: 8926416Salavat1996s@

# Или через внешний хост
psql -h jogelfilulmir.beget.app -p 5432 -U arteco -d arteco_db
```

## Важно:

- ✅ Не коммитьте `.env` файл в Git (он уже в .gitignore)
- ✅ Используйте приватный IP на сервере для лучшей производительности
- ✅ Используйте внешний хост для локальной разработки
- ✅ Экранируйте специальные символы в пароле (`@` → `%40`)

## После настройки:

1. Выполните SQL миграцию (если еще не выполнили):
   ```bash
   psql -h 10.19.0.1 -U arteco -d arteco_db -f database/schema.sql
   ```

2. Перезапустите приложение:
   ```bash
   pm2 restart arteconew
   ```

3. Проверьте работу через админ-панель:
   - http://155.212.147.140:3000/admin
   - Попробуйте добавить товар
