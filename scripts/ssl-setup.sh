#!/bin/bash

# Скрипт для настройки SSL сертификатов с Let's Encrypt
# Использование: ./ssl-setup.sh your-domain.com your-email@domain.com

set -e

DOMAIN=${1:-"your-domain.com"}
EMAIL=${2:-"your-email@domain.com"}

echo "🚀 Настройка SSL для домена: $DOMAIN"
echo "📧 Email для уведомлений: $EMAIL"

# Создание необходимых директорий
echo "📁 Создание директорий..."
mkdir -p ssl/live/$DOMAIN
mkdir -p nginx/html

# Обновление конфигурации nginx с правильным доменом
echo "⚙️  Обновление конфигурации nginx..."
sed -i "s/your-domain.com/$DOMAIN/g" nginx/conf.d/nutriscan.conf

# Временная конфигурация nginx для валидации Let's Encrypt (только HTTP)
cat > nginx/conf.d/nutriscan-temp.conf << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    location /.well-known/acme-challenge/ {
        root /var/www/html;
        try_files \$uri =404;
    }
    
    location / {
        return 200 "Server is ready for SSL setup";
        add_header Content-Type text/plain;
    }
}
EOF

# Запуск nginx для валидации
echo "🌐 Запуск временного nginx сервера..."
docker-compose -f docker-compose.prod.yml up -d nginx

# Ожидание запуска nginx
echo "⏳ Ожидание запуска nginx..."
sleep 10

# Получение SSL сертификата
echo "🔒 Получение SSL сертификата от Let's Encrypt..."
docker-compose -f docker-compose.prod.yml run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/html \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN \
    -d www.$DOMAIN

# Удаление временной конфигурации
echo "🧹 Удаление временной конфигурации..."
rm nginx/conf.d/nutriscan-temp.conf

# Проверка наличия сертификатов
if [ ! -f "ssl/live/$DOMAIN/fullchain.pem" ]; then
    echo "❌ Ошибка: SSL сертификат не был создан!"
    exit 1
fi

echo "✅ SSL сертификат успешно получен!"

# Перезапуск с полной HTTPS конфигурацией
echo "🔄 Перезапуск с HTTPS конфигурацией..."
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d

echo "🎉 Настройка завершена!"
echo "🌐 Ваш сайт доступен по адресу: https://$DOMAIN"

# Настройка автообновления сертификатов
echo "⏰ Настройка автообновления сертификатов..."
cat > ssl-renew.sh << EOF
#!/bin/bash
# Скрипт автообновления SSL сертификатов
docker-compose -f docker-compose.prod.yml run --rm certbot renew --quiet
docker-compose -f docker-compose.prod.yml exec nginx nginx -s reload
EOF

chmod +x ssl-renew.sh

echo "📝 Добавьте в crontab для автообновления:"
echo "0 12 * * * /path/to/your/project/ssl-renew.sh"