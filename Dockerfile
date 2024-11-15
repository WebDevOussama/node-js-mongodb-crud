# Development stage
FROM node:18 AS development

WORKDIR /usr/app

COPY package.json package-lock.json ./

ENV NODE_ENV=development

RUN npm install

COPY . ./

CMD ["npm", "run", "dev"]


# Production stage
FROM node:18-alpine

RUN apk --no-cache add ca-certificates

WORKDIR /usr/app

COPY --from=development /usr/app .

ENV NODE_ENV=production

RUN npm cache clean --force

RUN npm run build

RUN npm install --production --ignore-scripts --prefer-offline

CMD ["npm", "start"]
