Pré-requis:

Node.js >= 18

PHP >= 8.2

Composer

Quelque étape pour le projet:

git clone https://github.com/Nahary007/Maintimolaly.git SideUp

cd frontend

npm install

npm run dev

cd backend

composer install

cp .env.example .env

Editer .env

DB_CONNECTION=pgsql

DB_HOST=127.0.0.1

DB_PORT=5432

DB_DATABASE=nom_de_la_base

DB_USERNAME=utilisateur

DB_PASSWORD=motdepasse

php artisan key:generate

Créer la base de données

CREATE DATABASE nom_de_la_base;

php artisan migrate

php artisan serve

N.B : Avant de toucher quelque chose, veuillez me contacter par email : toavina.rabenajanaharisoa@gmail.com
