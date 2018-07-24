FROM mhart/alpine-node:10

RUN mkdir /code
COPY . /code/

WORKDIR /code
RUN npm install --only=production

ENV PORT 3002
EXPOSE 3002
CMD [ "npm", "run", "start" ]
