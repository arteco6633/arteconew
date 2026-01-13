#!/bin/bash

# Скрипт для первоначальной настройки сервера Beget
# Выполните этот скрипт на сервере после подключения: bash server-setup.sh

set -e

echo "🚀 Начинаем первоначальную настройку сервера..."

# Установка Node.js
echo "📦 Устанавливаем Node.js..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "✅ Node.js уже установлен: $(node --version)"
fi

# Установка PM2
echo "📦 Устанавливаем PM2..."
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
else
    echo "✅ PM2 уже установлен: $(pm2 --version)"
fi

# Создание директории
echo "📁 Создаем директорию для проекта..."
mkdir -p /var/www/arteconew
cd /var/www/arteconew

# Настройка SSH для GitHub (если нужно)
if [ ! -f ~/.ssh/github_deploy ]; then
    echo "🔑 Создаем SSH ключ для GitHub..."
    ssh-keygen -t ed25519 -C "deploy@beget" -f ~/.ssh/github_deploy -N ""
    echo ""
    echo "📋 Публичный ключ для GitHub (скопируйте и добавьте в GitHub: Settings → SSH and GPG keys):"
    echo "----------------------------------------"
    cat ~/.ssh/github_deploy.pub
    echo "----------------------------------------"
    echo ""
    read -p "Нажмите Enter после добавления ключа в GitHub..."
    
    # Настройка SSH config
    if [ ! -f ~/.ssh/config ]; then
        touch ~/.ssh/config
        chmod 600 ~/.ssh/config
    fi
    
    if ! grep -q "Host github.com" ~/.ssh/config; then
        cat >> ~/.ssh/config << EOF
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_deploy
    IdentitiesOnly yes
EOF
        echo "✅ SSH config настроен"
    fi
fi

# Клонирование репозитория
echo "📥 Клонируем репозиторий..."
if [ -d ".git" ]; then
    echo "✅ Репозиторий уже клонирован, обновляем..."
    git fetch origin
    git reset --hard origin/main
    git pull origin main
else
    git clone git@github.com:arteco6633/arteconew.git .
fi

# Установка зависимостей
echo "📦 Устанавливаем зависимости..."
npm install

# Сборка проекта
echo "🔨 Собираем проект..."
npm run build

# Запуск через PM2
echo "🚀 Запускаем приложение через PM2..."
if pm2 list | grep -q "arteconew"; then
    pm2 restart arteconew
    echo "✅ Приложение перезапущено"
else
    pm2 start ecosystem.config.js
    echo "✅ Приложение запущено"
fi

# Сохранение конфигурации PM2
pm2 save

# Настройка автозапуска
echo "⚙️  Настраиваем автозапуск..."
pm2 startup

echo ""
echo "✅ Настройка завершена!"
echo ""
echo "Проверьте статус:"
echo "  pm2 status"
echo ""
echo "Просмотр логов:"
echo "  pm2 logs arteconew"
echo ""
echo "Приложение доступно на: http://155.212.147.140:3000"
