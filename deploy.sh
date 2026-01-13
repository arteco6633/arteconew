#!/bin/bash

# Скрипт для деплоя на Beget сервер
# Использование: ./deploy.sh

echo "🚀 Начинаем деплой на Beget..."

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Параметры подключения (замените на свои)
SERVER_USER="root"
SERVER_IP="155.212.147.140"
SERVER_PATH="/var/www/arteconew"
REPO_URL="git@github.com:arteco6633/arteconew.git"

echo -e "${YELLOW}Шаг 1: Подключение к серверу и проверка окружения...${NC}"

# Проверка Node.js на сервере
ssh ${SERVER_USER}@${SERVER_IP} << 'ENDSSH'
  echo "Проверяем Node.js..."
  if ! command -v node &> /dev/null; then
    echo "Node.js не установлен. Устанавливаем..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
  fi
  node --version
  npm --version
  
  echo "Проверяем PM2..."
  if ! command -v pm2 &> /dev/null; then
    echo "PM2 не установлен. Устанавливаем..."
    sudo npm install -g pm2
  fi
  pm2 --version
ENDSSH

echo -e "${YELLOW}Шаг 2: Клонирование/обновление репозитория...${NC}"

ssh ${SERVER_USER}@${SERVER_IP} << ENDSSH
  if [ -d "${SERVER_PATH}" ]; then
    echo "Директория существует, обновляем..."
    cd ${SERVER_PATH}
    git fetch origin
    git reset --hard origin/main
    git pull origin main
  else
    echo "Клонируем репозиторий..."
    mkdir -p ${SERVER_PATH}
    git clone ${REPO_URL} ${SERVER_PATH}
    cd ${SERVER_PATH}
  fi
ENDSSH

echo -e "${YELLOW}Шаг 3: Установка зависимостей...${NC}"

ssh ${SERVER_USER}@${SERVER_IP} << ENDSSH
  cd ${SERVER_PATH}
  npm install --production=false
ENDSSH

echo -e "${YELLOW}Шаг 4: Сборка проекта...${NC}"

ssh ${SERVER_USER}@${SERVER_IP} << ENDSSH
  cd ${SERVER_PATH}
  npm run build
ENDSSH

echo -e "${YELLOW}Шаг 5: Запуск приложения через PM2...${NC}"

ssh ${SERVER_USER}@${SERVER_IP} << ENDSSH
  cd ${SERVER_PATH}
  
  # Останавливаем старое приложение, если оно запущено
  pm2 stop arteconew || true
  pm2 delete arteconew || true
  
  # Запускаем новое приложение
  pm2 start ecosystem.config.js
  
  # Сохраняем конфигурацию PM2
  pm2 save
  
  # Настраиваем автозапуск
  pm2 startup
ENDSSH

echo -e "${GREEN}✅ Деплой завершен!${NC}"
echo -e "${GREEN}Приложение должно быть доступно на http://${SERVER_IP}:3000${NC}"
echo ""
echo "Полезные команды:"
echo "  pm2 status          - статус приложения"
echo "  pm2 logs arteconew  - логи приложения"
echo "  pm2 restart arteconew - перезапуск приложения"
