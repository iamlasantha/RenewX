# Stage 1: Install dependencies
# We use Alpine Linux because it is incredibly small and secure.
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files and install all dependencies cleanly
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: Build the application
# We use a completely new stage so we don't carry over unnecessary build tools to the final image.
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# We disable it during the build to speed things up and keep the build private.
ENV NEXT_TELEMETRY_DISABLED 1

# Build the Next.js app (configured with output: "standalone" in next.config.ts)
RUN npm run build

# Stage 3: Production Server
# This is the final container that will actually run your code on the server.
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user for security best practices (Hackers can't easily gain root access if breached)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the public folder directly
COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# The 'standalone' folder contains everything Next.js needs to run independently without node_modules!
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to the non-root user
USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# The standalone output creates a standard Node server named server.js! No need for 'npm run start'
CMD ["node", "server.js"]
