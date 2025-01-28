FROM node:20-alpine

WORKDIR /app

# Installation des dépendances globales
RUN npm install -g npm@latest

# Copie des fichiers de configuration
COPY package*.json ./
COPY vite.config.js ./
COPY svelte.config.js ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Installation des dépendances
RUN npm install

# Copie du reste du code source
COPY . .

EXPOSE 3000

# Commande pour le développement
CMD ["npm", "run", "dev"] 