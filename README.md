#  SideUp

**SideUp** est une application web moderne utilisant **React** pour le frontend et **Laravel** pour le backend.  
Ce projet est conçu pour offrir une base solide avec une architecture séparée frontend/backend.

---

## Prérequis

Assurez-vous d’avoir installé :

- [Node.js](https://nodejs.org/) **v18 ou plus**
- [PHP](https://www.php.net/) **v8.2 ou plus**
- [Composer](https://getcomposer.org/)
- [PostgreSQL](https://www.postgresql.org/) (pour la base de données)

---

## ⚙️ Étapes d'installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/Nahary007/sideUp-l.git SideUp
cd SideUp
2. Installer le frontend (React)
bash
Copier
Modifier
cd frontend
npm install
npm run dev
3. Installer le backend (Laravel)
bash
Copier
Modifier
cd ../backend
composer install
cp .env.example .env
4. Configurer l’environnement
Modifier le fichier .env pour définir les informations de connexion PostgreSQL :

env
Copier
Modifier
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=nom_de_la_base
DB_USERNAME=utilisateur
DB_PASSWORD=motdepasse
Générer la clé d’application :

bash
Copier
Modifier
php artisan key:generate
5. Créer la base de données PostgreSQL
Lancer la commande SQL suivante dans votre terminal ou dans un outil comme pgAdmin :

sql
Copier
Modifier
CREATE DATABASE nom_de_la_base;
6. Lancer les migrations
bash
Copier
Modifier
php artisan migrate
7. Démarrer le serveur Laravel
bash
Copier
Modifier
php artisan serve
📩 Contact
⚠️ Avant toute modification du projet, merci de me contacter :
📧 toavina.rabenajanaharisoa@gmail.com
