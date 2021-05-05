FROM node:12.13-alpine As development
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --development
COPY . .
COPY ./development.env ./.env
RUN npm run build


FROM node:12.13-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .
COPY ./default.env ./.env
COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/main"]