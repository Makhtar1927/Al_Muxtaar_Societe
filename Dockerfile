# ──────────────────────────────────────────────────────────────────────────────
# Dockerfile — Al Muxtaar Société Platform
# Multi-stage build : build (Node 18) → production runner (Node 18 Alpine)
# ──────────────────────────────────────────────────────────────────────────────

# Étape 1 : Construction
FROM node:18-alpine AS builder
WORKDIR /app

# Installer les dépendances système nécessaires pour certains packages natifs
RUN apk add --no-cache libc6-compat

# Copier les fichiers de dépendances en premier (cache Docker optimisé)
COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps

# Copier le reste du code source
COPY . .

# Variables d'env au build time (valeurs par défaut non-secrètes)
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_SITE_URL=https://almuxtaar.sn
ARG NEXT_PUBLIC_WAVE_NUMBER
ARG NEXT_PUBLIC_OM_NUMBER
ARG NEXT_PUBLIC_WA_SUPPORT

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_WAVE_NUMBER=$NEXT_PUBLIC_WAVE_NUMBER
ENV NEXT_PUBLIC_OM_NUMBER=$NEXT_PUBLIC_OM_NUMBER
ENV NEXT_PUBLIC_WA_SUPPORT=$NEXT_PUBLIC_WA_SUPPORT

# Build Next.js (output: standalone pour Cloud Run)
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Étape 2 : Image de production légère
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Utilisateur non-root pour la sécurité
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copier les fichiers nécessaires depuis l'étape builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]

