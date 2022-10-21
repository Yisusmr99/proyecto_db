FROM php:8.1-apache

RUN apt-get update && apt-get install -y \
&& docker-php-ext-install mysqli pdo pdo_mysql

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN a2enmod rewrite

RUN chmod 777 -R -c /var/www