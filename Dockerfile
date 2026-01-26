# Optimizado para Astro con Node.js

# Etapa 1: Build
FROM node:20-alpine AS builder

# Instalar dependencias del sistema necesarias
RUN apk add --no-cache libc6-compat

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración de dependencias
COPY package.json ./

# Instalar dependencias (incluidas dev para el build)
# Usamos npm install porque no hay package-lock.json (el proyecto usa bun.lock)
RUN npm install

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa 2: Producción
FROM node:20-alpine AS runner

# Instalar dependencias del sistema necesarias
RUN apk add --no-cache libc6-compat

# Crear usuario no-root para seguridad
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 astro

# Establecer directorio de trabajo
WORKDIR /app

# Instalar serve globalmente para servir archivos estáticos
RUN npm install -g serve@14

# Copiar build desde la etapa anterior
COPY --from=builder --chown=astro:nodejs /app/dist ./dist

# Cambiar al usuario no-root
USER astro

# Exponer puerto
EXPOSE 3000

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000

# Comando de inicio - servir archivos estáticos
CMD ["serve", "-s", "dist", "-l", "3000"]
