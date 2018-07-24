// This file doesn't not go through babel or webpack transformation.
const express = require('express');
const next = require('next');
const proxy = require('http-proxy-middleware');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

function ensureValidUrl(url, variableName) {
  if (!url) {
    throw new Error(
      `Invalid config variable ${variableName}. It must be a valid url.`
    );
  }
  // A TypeError will be thrown if the input or base are not valid URLs.
  // eslint-disable-next-line no-new
  new URL(url);
}

app.prepare().then(() => {
  const server = express();

  const { serverRuntimeConfig } = require('next/config').default();
  const { apiServiceUrl } = serverRuntimeConfig;
  ensureValidUrl(apiServiceUrl, 'apiServiceUrl');

  server.use(
    '/api',
    proxy({
      target: apiServiceUrl,
      changeOrigin: true,
      pathRewrite: function(path, req) {
        return path.replace('/api', '');
      },
    })
  );

  const { teravozServiceUrl } = serverRuntimeConfig;
  ensureValidUrl(teravozServiceUrl, 'teravozServiceUrl');
  server.use(
    '/teravoz',
    proxy({
      target: teravozServiceUrl,
      changeOrigin: true,
      pathRewrite: function(path, req) {
        return path.replace('/teravoz', '');
      },
    })
  );

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  const { host, port } = serverRuntimeConfig;
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://${host}:${port}`);
  });
});
