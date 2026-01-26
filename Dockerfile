# Optimizado para Astro con Bun

# Etapa 1: Build
FROM oven/bun:1-alpine AS builder

# Instalar dependencias del sistema necesarias
RUN apk add --no-cache libc6-compat

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración de dependencias y lockfile
COPY package.json bun.lock* ./

# Instalar dependencias (incluidas dev para el build)
RUN bun install --frozen-lockfile

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN bun run build

# Etapa 2: Producción
FROM oven/bun:1-alpine AS runner

# Instalar dependencias del sistema necesarias
RUN apk add --no-cache libc6-compat

# Crear usuario no-root para seguridad
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 astro

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración de dependencias y lockfile
COPY package.json bun.lock* ./

# Instalar solo dependencias de producción
RUN bun install --frozen-lockfile --production && \
    bun pm cache rm

# Copiar build desde la etapa anterior
COPY --from=builder --chown=astro:nodejs /app/dist ./dist

# Cambiar al usuario no-root
USER astro

# Exponer puerto
EXPOSE 3000

# Variables de entorno
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Comando de inicio
CMD ["node", "./dist/server/entry.mjs"]
