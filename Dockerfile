# Dockerfile
# Stage 1 - the build process
FROM node:14 as build-deps
WORKDIR /usr/src/app
COPY maj-exchange/package*.json ./
RUN npm install
COPY maj-exchange/ ./
ARG REACT_APP_ENV
ENV REACT_APP_ENV=$REACT_APP_ENV
RUN npm run build

# Stage 2 - the production environment
FROM node:14-alpine
WORKDIR /app
COPY --from=build-deps /usr/src/app/build .
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "."]