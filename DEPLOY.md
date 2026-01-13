# Инструкция по деплою на Beget

## Подготовка сервера

### 1. Подключение к серверу

```bash
ssh root@155.212.147.140
```

### 2. Установка Node.js (если не установлен)

```bash
# Установка Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Проверка версии
node --version
npm --version
```

### 3. Установка PM2 (процесс-менеджер)

```bash
sudo npm install -g pm2
```

### 4. Установка Nginx (для проксирования)

```bash
sudo apt-get update
sudo apt-get install -y nginx
```

## Деплой проекта

### Вариант 1: Автоматический деплой (через скрипт)

1. Сделайте скрипт исполняемым:
```bash
chmod +x deploy.sh
```

2. Запустите деплой:
```bash
./deploy.sh
```

### Вариант 2: Ручной деплой

1. **Подключитесь к серверу:**
```bash
ssh root@155.212.147.140
```

2. **Создайте директорию для проекта:**
```bash
mkdir -p /var/www/arteconew
cd /var/www/arteconew
```

3. **Клонируйте репозиторий:**
```bash
git clone git@github.com:arteco6633/arteconew.git .
```

4. **Установите зависимости:**
```bash
npm install
```

5. **Соберите проект:**
```bash
npm run build
```

6. **Запустите через PM2:**
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Настройка Nginx

Создайте конфигурационный файл для Nginx:

```bash
sudo nano /etc/nginx/sites-available/arteconew
```

Добавьте следующую конфигурацию:

```nginx
server {
    listen 80;
    server_name ваш-домен.ru www.ваш-домен.ru;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Активируйте конфигурацию:

```bash
sudo ln -s /etc/nginx/sites-available/arteconew /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Управление приложением

### Полезные команды PM2:

```bash
# Статус приложения
pm2 status

# Логи приложения
pm2 logs arteconew

# Перезапуск
pm2 restart arteconew

# Остановка
pm2 stop arteconew

# Удаление из PM2
pm2 delete arteconew

# Мониторинг
pm2 monit
```

### Обновление проекта:

```bash
cd /var/www/arteconew
git pull origin main
npm install
npm run build
pm2 restart arteconew
```

## Настройка файрвола (если нужно)

Если нужно открыть порт 3000:

```bash
sudo ufw allow 3000/tcp
```

## Проверка работы

После деплоя проверьте:

1. Приложение доступно на `http://155.212.147.140:3000`
2. PM2 показывает статус "online": `pm2 status`
3. Логи не содержат ошибок: `pm2 logs arteconew`

## Важные замечания

1. **Данные**: Файлы в директории `/data` создаются автоматически при первом запуске
2. **Переменные окружения**: При необходимости создайте файл `.env` в корне проекта
3. **Права доступа**: Убедитесь, что у приложения есть права на запись в директорию `/data`

## Troubleshooting

### Приложение не запускается:
```bash
pm2 logs arteconew --lines 50
```

### Проблемы с портом:
```bash
netstat -tulpn | grep 3000
```

### Перезапуск Nginx:
```bash
sudo systemctl restart nginx
```
