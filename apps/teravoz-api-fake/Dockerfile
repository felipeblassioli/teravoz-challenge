FROM mhart/alpine-node:10

RUN mkdir /code
COPY . /code/

WORKDIR /code
RUN npm install --only=production

ENV PORT 3001
EXPOSE 3001
CMD [ "npm", "run", "start" ]
