# Docker Deployment Guide

## Обзор

Проект настроен для развертывания с использованием Docker и поддерживает как HTTP (разработка), так и HTTPS (продакшн) конфигурации.

## Структура файлов

```
├── Dockerfile                  # Основной Docker образ для Next.js приложения  
├── docker-compose.yml         # Базовая конфигурация (только HTTP)
├── docker-compose.dev.yml     # Конфигурация для разработки (HTTP)
├── docker-compose.prod.yml    # Конфигурация для продакшна (HTTP + HTTPS)
├── nginx/
│   ├── nginx.conf             # Основная конфигурация nginx (продакшн)
│   ├── nginx-dev.conf         # Конфигурация nginx для разработки
│   └── conf.d/
│       ├── nutriscan.conf     # Конфигурация сайта для продакшна
│       └── nutriscan-dev.conf # Конфигурация сайта для разработки
└── scripts/
    └── ssl-setup.sh           # Скрипт автоматической настройки SSL
```

## Быстрый старт

### Разработка (HTTP только)

```bash
# Сборка и запуск в режиме разработки
docker-compose -f docker-compose.dev.yml up --build -d

# Проверка статуса
docker-compose -f docker-compose.dev.yml ps

# Просмотр логов
docker-compose -f docker-compose.dev.yml logs -f

# Сайт будет доступен по адресу: http://localhost
```

### Продакшн (HTTP + HTTPS)

#### Вариант 1: Автоматическая настройка SSL

```bash
# Настройка SSL с Let's Encrypt (замените на ваши данные)
./scripts/ssl-setup.sh your-domain.com your-email@domain.com
```

#### Вариант 2: Ручная настройка

```bash
# 1. Обновите конфигурацию nginx
sed -i 's/your-domain.com/YOUR_ACTUAL_DOMAIN/g' nginx/conf.d/nutriscan.conf

# 2. Поместите SSL сертификаты в директорию ssl/
mkdir -p ssl/live/YOUR_DOMAIN/
# Скопируйте ваши сертификаты:
# - fullchain.pem
# - privkey.pem  
# - chain.pem

# 3. Запуск в продакшн режиме
docker-compose -f docker-compose.prod.yml up --build -d
```

## Управление контейнерами

```bash
# Просмотр статуса
docker-compose -f docker-compose.prod.yml ps

# Просмотр логов
docker-compose -f docker-compose.prod.yml logs -f nginx
docker-compose -f docker-compose.prod.yml logs -f nutriscan-app

# Перезапуск сервисов
docker-compose -f docker-compose.prod.yml restart

# Остановка
docker-compose -f docker-compose.prod.yml down

# Полная очистка (включая volumes)
docker-compose -f docker-compose.prod.yml down -v
```

## Особенности конфигурации

### Nginx Proxy

- **Rate Limiting**: API endpoints ограничены до 10 req/s, общие запросы - 5 req/s
- **SSL/TLS**: Поддержка TLS 1.2/1.3 с современными cipher suites
- **HSTS**: Включен с preload для безопасности
- **Кэширование**: Статические файлы кэшируются с соответствующими заголовками
- **Gzip**: Сжатие для текстовых файлов

### Security Headers

Nginx автоматически добавляет важные заголовки безопасности:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security` (только для HTTPS)

### Мониторинг

- Health check endpoint: `/health`
- Логи nginx сохраняются в `/var/log/nginx/`

## Переменные окружения

Убедитесь, что файл `.env` содержит все необходимые переменные:

```env
# Appwrite конфигурация
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://appwrite-todonotes.ru/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
# ... другие переменные
```

## Автообновление SSL сертификатов

После успешной настройки SSL, добавьте в crontab:

```bash
# Автообновление каждый день в 12:00
0 12 * * * /path/to/your/project/ssl-renew.sh
```

## Troubleshooting

### Проблемы с SSL

```bash
# Проверка сертификатов
docker-compose -f docker-compose.prod.yml run --rm certbot certificates

# Ручное обновление сертификатов
docker-compose -f docker-compose.prod.yml run --rm certbot renew --force-renewal

# Проверка конфигурации nginx
docker-compose -f docker-compose.prod.yml exec nginx nginx -t
```

### Проблемы с подключением

```bash
# Проверка сетевого соединения между контейнерами
docker-compose -f docker-compose.prod.yml exec nginx ping nutriscan-app

# Проверка портов
docker-compose -f docker-compose.prod.yml exec nutriscan-app netstat -tlnp
```

### Логи отладки

```bash
# Подробные логи nginx
docker-compose -f docker-compose.prod.yml logs -f nginx | grep error

# Логи Next.js приложения  
docker-compose -f docker-compose.prod.yml logs -f nutriscan-app
```

## Производительность

### Рекомендуемые ресурсы

- **CPU**: 2+ cores
- **RAM**: 2GB+ для приложения + 512MB для nginx
- **Storage**: 10GB+ (включая логи и SSL сертификаты)

### Оптимизация

- Статические файлы кэшируются на уровне nginx
- Gzip сжатие для всех текстовых ресурсов  
- HTTP/2 для улучшенной производительности
- Keepalive соединения для уменьшения накладных расходов