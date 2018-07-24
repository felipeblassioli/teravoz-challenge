FROM mhart/alpine-node:10

RUN mkdir /code
COPY . /code/

WORKDIR /code
RUN npm install --only=production
RUN npm run build

ENV PORT 3000
EXPOSE 3000
CMD [ "npm", "run", "start" ]
