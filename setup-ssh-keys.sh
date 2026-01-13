#!/bin/bash

# Скрипт для настройки SSH ключей для автоматического деплоя
# Этот скрипт поможет настроить SSH ключи для GitHub Actions

echo "🔑 Настройка SSH ключей для автоматического деплоя"
echo ""

# Цвета
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SSH_DIR="$HOME/.ssh"
KEY_NAME="beget_deploy"
SERVER_IP="155.212.147.140"
SERVER_USER="root"

# Создаем директорию .ssh если её нет
mkdir -p "$SSH_DIR"
chmod 700 "$SSH_DIR"

# Проверяем, существует ли ключ
if [ -f "$SSH_DIR/$KEY_NAME" ]; then
    echo -e "${YELLOW}⚠️  Ключ $KEY_NAME уже существует${NC}"
    read -p "Перезаписать? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Отменено"
        exit 1
    fi
fi

# Генерируем SSH ключ
echo -e "${BLUE}📝 Генерируем SSH ключ...${NC}"
ssh-keygen -t ed25519 -C "github-actions@arteconew" -f "$SSH_DIR/$KEY_NAME" -N ""

if [ $? -ne 0 ]; then
    echo "❌ Ошибка при генерации ключа"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ SSH ключ создан!${NC}"
echo ""

# Показываем публичный ключ
echo -e "${YELLOW}📋 Публичный ключ (скопируйте его):${NC}"
echo "----------------------------------------"
cat "$SSH_DIR/$KEY_NAME.pub"
echo "----------------------------------------"
echo ""

# Инструкции
echo -e "${BLUE}📌 Следующие шаги:${NC}"
echo ""
echo "1. Добавьте публичный ключ на сервер Beget:"
echo "   ssh $SERVER_USER@$SERVER_IP 'mkdir -p ~/.ssh && echo \"$(cat $SSH_DIR/$KEY_NAME.pub)\" >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys && chmod 700 ~/.ssh'"
echo ""
echo "   Или вручную:"
echo "   - Подключитесь к серверу: ssh $SERVER_USER@$SERVER_IP"
echo "   - Выполните: mkdir -p ~/.ssh"
echo "   - Добавьте ключ: echo \"$(cat $SSH_DIR/$KEY_NAME.pub)\" >> ~/.ssh/authorized_keys"
echo "   - Установите права: chmod 600 ~/.ssh/authorized_keys && chmod 700 ~/.ssh"
echo ""
echo "2. Добавьте приватный ключ в GitHub Secrets:"
echo "   - Перейдите: https://github.com/arteco6633/arteconew/settings/secrets/actions"
echo "   - Создайте секрет: BEGET_SSH_KEY"
echo "   - Вставьте содержимое файла: $SSH_DIR/$KEY_NAME"
echo ""
echo "3. Добавьте другие секреты в GitHub:"
echo "   - BEGET_SERVER_IP: $SERVER_IP"
echo "   - BEGET_SERVER_USER: $SERVER_USER"
echo ""

# Показываем приватный ключ для копирования
read -p "Показать приватный ключ для GitHub Secrets? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo -e "${YELLOW}🔐 Приватный ключ (скопируйте ВЕСЬ текст для GitHub Secrets BEGET_SSH_KEY):${NC}"
    echo "----------------------------------------"
    cat "$SSH_DIR/$KEY_NAME"
    echo "----------------------------------------"
    echo ""
fi

echo -e "${GREEN}✅ Настройка SSH ключей завершена!${NC}"
echo ""
echo "После добавления секретов в GitHub, автоматический деплой будет работать."
