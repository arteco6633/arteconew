# 🚀 Быстрый старт: Настройка автоматического деплоя

## Шаг 1: Генерация SSH ключей (локально)

Запустите скрипт для автоматической настройки:

```bash
./setup-ssh-keys.sh
```

Скрипт:
- ✅ Создаст SSH ключ для доступа к серверу
- ✅ Покажет публичный ключ (для добавления на сервер)
- ✅ Покажет приватный ключ (для GitHub Secrets)

## Шаг 2: Добавление ключа на сервер Beget

Выполните команду (скрипт покажет точную команду):

```bash
ssh root@155.212.147.140 'mkdir -p ~/.ssh && echo "ВАШ_ПУБЛИЧНЫЙ_КЛЮЧ" >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys && chmod 700 ~/.ssh'
```

Или вручную:
```bash
ssh root@155.212.147.140
mkdir -p ~/.ssh
nano ~/.ssh/authorized_keys
# Вставьте публичный ключ (из вывода setup-ssh-keys.sh)
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

## Шаг 3: Настройка GitHub Secrets

1. Перейдите: https://github.com/arteco6633/arteconew/settings/secrets/actions
2. Нажмите **New repository secret** и добавьте:

### BEGET_SERVER_IP
```
155.212.147.140
```

### BEGET_SERVER_USER
```
root
```

### BEGET_SSH_KEY
Вставьте **весь** приватный ключ (из вывода `setup-ssh-keys.sh`), включая:
```
-----BEGIN OPENSSH PRIVATE KEY-----
...
-----END OPENSSH PRIVATE KEY-----
```

## Шаг 4: Первоначальная настройка сервера

Подключитесь к серверу и выполните (только один раз):

```bash
ssh root@155.212.147.140

# Установка Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Установка PM2
sudo npm install -g pm2

# Создание директории и клонирование
mkdir -p /var/www/arteconew
cd /var/www/arteconew
git clone git@github.com:arteco6633/arteconew.git .

# Настройка SSH для GitHub (если нужно)
ssh-keygen -t ed25519 -C "deploy@beget" -f ~/.ssh/github_deploy -N ""
cat ~/.ssh/github_deploy.pub
# Скопируйте ключ и добавьте в GitHub: Settings → SSH and GPG keys

# Настройка SSH config
nano ~/.ssh/config
# Добавьте:
# Host github.com
#     HostName github.com
#     User git
#     IdentityFile ~/.ssh/github_deploy
#     IdentitiesOnly yes

# Установка зависимостей и сборка
npm install
npm run build

# Запуск через PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Шаг 5: Проверка работы

1. Сделайте коммит и push:
```bash
git add .
git commit -m "Настройка автоматического деплоя"
git push origin main
```

2. Перейдите в GitHub → **Actions** и проверьте выполнение workflow

3. После успешного деплоя приложение будет доступно на:
   - http://155.212.147.140:3000

## ✅ Готово!

Теперь каждый push в ветку `main` будет автоматически деплоить изменения на сервер!

## 🔧 Полезные команды

### Проверка статуса на сервере:
```bash
ssh root@155.212.147.140
pm2 status
pm2 logs arteconew
```

### Ручной запуск деплоя:
В GitHub: **Actions** → **Deploy to Beget** → **Run workflow**

### Откат к предыдущей версии:
```bash
ssh root@155.212.147.140
cd /var/www/arteconew
git log --oneline -5
git reset --hard <commit-hash>
npm ci
npm run build
pm2 restart arteconew
```
