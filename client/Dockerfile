FROM node:22-alpine as build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


FROM nginx:1.26.2-alpine-slim as production

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf  /etc/nginx/nginx.conf

ENV NODE_ENV=production
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]