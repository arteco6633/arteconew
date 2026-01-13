# Настройка автоматического деплоя

Этот документ описывает, как настроить автоматический деплой на Beget сервер через GitHub Actions.

## Шаг 1: Подготовка сервера

### 1.1. Первоначальная настройка сервера

Подключитесь к серверу и выполните первоначальную настройку:

```bash
ssh root@155.212.147.140
```

```bash
# Установка Node.js (если не установлен)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Установка PM2
sudo npm install -g pm2

# Создание директории для проекта
mkdir -p /var/www/arteconew
cd /var/www/arteconew

# Клонирование репозитория (первый раз)
git clone git@github.com:arteco6633/arteconew.git .

# Установка зависимостей
npm install

# Сборка проекта
npm run build

# Запуск через PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 1.2. Настройка SSH ключа для GitHub

На сервере нужно добавить SSH ключ для доступа к GitHub репозиторию:

```bash
# Генерируем SSH ключ (если его нет)
ssh-keygen -t ed25519 -C "deploy@beget" -f ~/.ssh/github_deploy

# Показываем публичный ключ
cat ~/.ssh/github_deploy.pub
```

**Важно:** Скопируйте публичный ключ и добавьте его в GitHub:
1. Перейдите в Settings → SSH and GPG keys
2. Нажмите "New SSH key"
3. Вставьте содержимое `~/.ssh/github_deploy.pub`

Также добавьте ключ в `~/.ssh/config`:

```bash
nano ~/.ssh/config
```

Добавьте:
```
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_deploy
    IdentitiesOnly yes
```

## Шаг 2: Настройка GitHub Secrets

Для работы GitHub Actions нужно добавить секреты в репозиторий:

1. Перейдите в ваш репозиторий на GitHub
2. Откройте **Settings** → **Secrets and variables** → **Actions**
3. Нажмите **New repository secret** и добавьте следующие секреты:

### BEGET_SERVER_IP
```
155.212.147.140
```

### BEGET_SERVER_USER
```
root
```

### BEGET_SSH_KEY

Это приватный SSH ключ для доступа к серверу. Создайте его на вашем локальном компьютере:

```bash
# Генерируем SSH ключ для доступа к серверу
ssh-keygen -t ed25519 -C "github-actions@arteconew" -f ~/.ssh/beget_deploy

# Показываем публичный ключ - его нужно добавить на сервер
cat ~/.ssh/beget_deploy.pub
```

**На сервере** добавьте публичный ключ:

```bash
# На сервере выполните:
mkdir -p ~/.ssh
nano ~/.ssh/authorized_keys
# Вставьте содержимое ~/.ssh/beget_deploy.pub
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

**В GitHub** добавьте приватный ключ как секрет:

```bash
# На локальном компьютере покажите приватный ключ
cat ~/.ssh/beget_deploy
```

Скопируйте весь вывод (включая `-----BEGIN OPENSSH PRIVATE KEY-----` и `-----END OPENSSH PRIVATE KEY-----`) и вставьте в секрет `BEGET_SSH_KEY`.

## Шаг 3: Проверка работы

После настройки всех секретов:

1. Сделайте любой коммит и push в ветку `main`:
```bash
git add .
git commit -m "Настройка автоматического деплоя"
git push origin main
```

2. Перейдите в GitHub → **Actions** и проверьте, что workflow запустился

3. После успешного выполнения приложение автоматически обновится на сервере

## Шаг 4: Проверка деплоя

После успешного деплоя проверьте:

```bash
# Подключитесь к серверу
ssh root@155.212.147.140

# Проверьте статус приложения
pm2 status

# Проверьте логи
pm2 logs arteconew --lines 50
```

## Ручной запуск деплоя

Вы также можете запустить деплой вручную через GitHub UI:

1. Перейдите в **Actions**
2. Выберите workflow **Deploy to Beget**
3. Нажмите **Run workflow**
4. Выберите ветку `main` и нажмите **Run workflow**

## Troubleshooting

### Ошибка подключения по SSH

Проверьте, что:
- SSH ключ правильно добавлен в `authorized_keys` на сервере
- Права на файлы правильные: `chmod 600 ~/.ssh/authorized_keys`
- Firewall не блокирует подключение

### Ошибка при git pull

Проверьте, что на сервере настроен SSH ключ для GitHub:
```bash
ssh -T git@github.com
```

### PM2 не запускается

Проверьте логи:
```bash
pm2 logs arteconew --err
```

### Проблемы с правами доступа

Убедитесь, что у пользователя есть права на директорию:
```bash
chown -R root:root /var/www/arteconew
chmod -R 755 /var/www/arteconew
```

## Дополнительные настройки

### Уведомления в Telegram (опционально)

Можно добавить уведомления о статусе деплоя через Telegram. Для этого добавьте в workflow секрет `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`.

### Откат к предыдущей версии

Если что-то пошло не так, можно откатиться:

```bash
ssh root@155.212.147.140
cd /var/www/arteconew
git log --oneline -5  # Посмотреть последние коммиты
git reset --hard <commit-hash>  # Откатиться к нужному коммиту
npm ci
npm run build
pm2 restart arteconew
```
