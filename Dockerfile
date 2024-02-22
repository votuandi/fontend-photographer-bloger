FROM node:latest as build

WORKDIR /app-fe

COPY . .
RUN npm install

COPY . .
RUN npm run build

FROM nginx:latest

COPY --from=build /app-fe/.next /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
