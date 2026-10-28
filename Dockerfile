# Образ застосунку: зібраний фронтенд + сервер Express в одному контейнері.
# Збирається у два етапи (multi-stage build): у фінальний образ потрапляє лише те, що потрібне для запуску.

# ---------- Етап 1: збираємо фронтенд ----------
FROM node:24-alpine AS build
WORKDIR /app

# Спершу лише package*.json: якщо залежності не змінились, Docker візьме результат npm ci з кешу.
COPY package.json package-lock.json ./
RUN npm ci

# Решта коду (без того, що в .dockerignore) і збірка в папку /app/dist.
COPY . .
RUN npm run build

# ---------- Етап 2: сервер, який віддає API, Socket.io і зібраний фронтенд ----------
FROM node:24-alpine
WORKDIR /app/server
ENV NODE_ENV=production

# Лише залежності сервера, без інструментів розробки.
COPY server/package.json server/package-lock.json ./
RUN npm ci --omit=dev

COPY server/src ./src
# З першого етапу беремо тільки готову папку dist, а не весь фронтенд з node_modules.
COPY --from=build /app/dist ../dist

EXPOSE 3000
CMD ["node", "src/index.js"]
