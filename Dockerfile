FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG PRISMIC_ACCESS_TOKEN
ENV PRISMIC_ACCESS_TOKEN=$PRISMIC_ACCESS_TOKEN
ENV NEXT_TELEMETRY_DISABLED=1

RUN node -e "console.log('PRISMIC TOKEN:', process.env.PRISMIC_ACCESS_TOKEN ? 'EXISTS length=' + process.env.PRISMIC_ACCESS_TOKEN.length : 'MISSING')"

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
