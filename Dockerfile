FROM node:lts-alpine AS builder

WORKDIR /build
ADD package.json package-lock.json ./
RUN apk add git && npm install
ADD . .
RUN npm run build


# Production image
FROM busybox:latest
USER nobody:nobody
WORKDIR /app
COPY --from=builder /build/build .
EXPOSE 8080
CMD ["busybox", "httpd", "-f", "-v", "-p", "8080"]
