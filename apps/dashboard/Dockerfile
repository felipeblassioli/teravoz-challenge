FROM mhart/alpine-node:10

RUN mkdir /code
COPY . /code/

WORKDIR /code
RUN npm install --only=production
RUN npm run build

CMD [ "npm", "run", "start" ]
