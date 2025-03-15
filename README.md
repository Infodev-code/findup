# FindUp - Plateforme de Formations et Jobs Étudiants

FindUp est une application web moderne qui connecte les étudiants avec des formations de qualité et des opportunités d'emploi adaptées a leurs besoins.

## Fonctionnalités

- **Catalogue de formations** : Parcourez une large sélection de formations dans différents domaines
- **Offres de jobs étudiants** : Trouvez des opportunités d'emploi compatibles avec vos études
- **Pages détaillées** : Consultez les informations complètes sur chaque formation et job
- **Système d'authentification** : Créez un compte et connectez-vous pour accéder à des fonctionnalités personnalisées
- **Interface moderne** : Profitez d'une expérience utilisateur fluide avec de belles animations
- **Design responsive** : Utilisez l'application sur tous vos appareils

## Technologies utilisées

- **Frontend** :
  - Next.js 14 (React)
  - TypeScript
  - Tailwind CSS
  - Framer Motion (animations)

- **Backend** :
  - API Routes Next.js
  - MongoDB (base de données)
  - NextAuth.js (authentification)

## Installation

1. Clonez ce dépôt :
```bash
git clone https://github.com/votre-nom/etuportail.git
cd etuportail
```

2. Installez les dépendances :
```bash
npm install
```

3. Créez un fichier `.env.local` à la racine du projet avec les variables d'environnement nécessaires :
```
MONGODB_URI=votre_uri_mongodb
NEXTAUTH_SECRET=votre_secret_nextauth
NEXTAUTH_URL=http://localhost:3000
```

4. Lancez le serveur de développement :
```bash
npm run dev
```

5. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir l'application.

## Structure du projet

```
/
├── public/            # Fichiers statiques
├── src/
│   ├── app/           # Pages de l'application (App Router)
│   │   ├── api/       # Routes API
│   │   ├── auth/      # Pages d'authentification
│   │   ├── formations/# Pages des formations
│   │   ├── jobs/      # Pages des jobs étudiants
│   │   └── ...
│   ├── components/    # Composants réutilisables
│   ├── lib/           # Utilitaires et fonctions
│   └── models/        # Modèles de données MongoDB
├── .env.local         # Variables d'environnement (à créer)
└── ...
```

## Déploiement

Cette application peut être facilement déployée sur Vercel :

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/votre-nom/etuportail)

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus d'informations. 