FROM keymetrics/pm2:latest-alpine

RUN mkdir /code
COPY . /code/

# RUN npm install -g pm2

WORKDIR /code/apps/api
RUN npm install --only=production
WORKDIR /code/apps/teravoz-api-fake
RUN npm install --only=production
WORKDIR /code/apps/dashboard
RUN npm install --only=production

# Necessary for zeit/now
EXPOSE 3000
WORKDIR /code
CMD [ "pm2-runtime", "ecosystem.config.js" ]
