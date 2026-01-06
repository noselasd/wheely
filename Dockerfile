FROM node:lts-alpine AS builder

WORKDIR /build
ADD package.json package-lock.json ./
RUN apk add git && npm install
ADD . .
RUN npm run build


# Production image
FROM node:lts-alpine AS packages
ENV PORT=8080
WORKDIR /app
COPY --from=builder /build/node_modules node_modules
COPY --from=builder /build/build .
EXPOSE 8080
CMD ["node", "./index.js"]
