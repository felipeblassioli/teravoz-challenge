## Dashboard Application

This is a standard node application, to run it locally:

```bash
$ npm install
$ npm run dev
```

| Environment variable | Description                   | Example               |
| -------------------- | ----------------------------- | --------------------- |
| PORT                 | The HTTP port the will listen | 3000                  |
| TERAVOZ_SERVICE_URL  | The url for teravoz-api-fake  | http://localhost:3001 |
| API_SERVICE_URL      | The url for api               | http://localhost:3002 |

**Important**

- Start the [teravoz-api-fake](https://github.com/felipeblassioli/teravoz-challenge/tree/master/apps/teravoz-api-fake) application
- Start the [api](https://github.com/felipeblassioli/teravoz-challenge/tree/master/apps/api#api-application) application
  or use [docker-compose to run everything together](https://github.com/felipeblassioli/teravoz-challenge#running)

If everything is correct, then after `npm run dev` then open in your browser [http://localhost:3000](http://localhost:3000) and you should see
![alt dashboard](https://github.com/felipeblassioli/teravoz-challenge/blob/master/images/dashboard.png)

### Architecture Decisions

- Environment variables in a single place only: [next.config.js](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/dashboard/next.config.js)
- Use [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
- Dependencies/Services should be put in the [context](https://reactjs.org/docs/context.html#when-to-use-context)
- [Use HOCs For Cross-Cutting Concerns](https://reactjs.org/docs/higher-order-components.html#use-hocs-for-cross-cutting-concerns)

### File Structure

As a normal [nextjs](https://github.com/zeit/next.js/) application all routes and pages code are in the `pages/` directory. S
So a GET http://localhost:3000 request ultimately run the code at [pages/index.js](https://github.com/felipeblassioli/teravoz-challenge/blob/master/apps/dashboard/pages/index.jsx)

Relevant directories:

- `services/`: Contains all services as described by the [Services Model/Pattern](https://github.com/felipeblassioli/teravoz-challenge/tree/master/apps/api#services-model)
- `contexts/`: Contains all [React16 Contexts](https://reactjs.org/docs/context.html#when-to-use-context)
- `components/`: Contains all react components, except pages.
- `hocs/`: Containes all [Higher Order Components](https://reactjs.org/docs/higher-order-components.html)

### Notable Packages

Follow the links below to find out why these packages were chosen.

- [Nextjs](https://github.com/felipeblassioli/teravoz-challenge/blob/master/docs/notable-packages.md#nextjs)
- [Recompose](https://github.com/felipeblassioli/teravoz-challenge/blob/master/docs/notable-packages.md#recompose)
- [Formik](https://github.com/felipeblassioli/teravoz-challenge/blob/master/docs/notable-packages.md#formik)
- [Semantic UI](https://github.com/felipeblassioli/teravoz-challenge/blob/master/docs/notable-packages.md#semantic-ui)

