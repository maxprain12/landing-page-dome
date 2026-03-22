# Optimizado para Astro estático en Coolify (sin modo SPA)

# Etapa 1: Build
FROM node:20-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Nginx (evita `serve -s`, que reescribe todo a index.html y rompe /privacy, /terms, etc.)
FROM nginx:alpine AS runner

RUN apk add --no-cache curl

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
