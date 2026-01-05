FROM node:lts-alpine AS builder

WORKDIR /build
ADD package.json package-lock.json ./
RUN apk add git && npm install
ADD . .
RUN npm run build


# Production image
FROM node:lts-alpine AS packages
WORKDIR /app
COPY --from=builder /build/node_modules node_modules
COPY --from=builder /build/build .
EXPOSE 3000
CMD ["node", "./index.js"]
