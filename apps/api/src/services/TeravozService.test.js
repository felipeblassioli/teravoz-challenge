const test = require('ava');
const TeravozService = require('./TeravozService');

test('baseUrl is a valid url', t => {
  const urls = [
    'https://api.teravoz.com.br',
    'http://api.teravoz.com.br',
    'https://localhost:3000/',
  ];

  t.plan(urls.length);

  urls.forEach(url => {
    t.truthy(new TeravozService({ baseUrl: url }));
  });
});

test('Throws error when baseUrl argument is a invalid url', t => {
  const urls = [null, '', undefined];

  t.plan(urls.length);

  urls.forEach(url => {
    t.throws(() => new TeravozService({ baseUrl: url }));
  });
});

test('POST /actions with given payload', async t => {
  const delegatePayload = {
    type: 'delegate',
    call_id: '1234567890.12345',
    destination: '900',
  };

  /**
   * Create simple http server to receive a JSON at /actions endpoint
   * Not using fastify was on purpose. We can move TeravozService to
   * a separated module in the future.
   */
  const http = require('http');
  const { parse } = require('url');

  const host = '127.0.0.1';
  const port = 9716;
  await http
    .createServer(function(req, res) {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;

      t.is(pathname, '/actions');
      let body = [];
      req.on('data', chunk => {
        body.push(chunk);
      });
      req.on('end', () => {
        body = Buffer.concat(body).toString();

        t.deepEqual(delegatePayload, JSON.parse(body));

        res.end();
      });

      req.on('error', err => t.fail(err));
    })
    .listen(port, host);

  const baseUrl = `http://${host}:${port}`;
  const service = new TeravozService({ baseUrl });

  const response = await service.delegate(delegatePayload);

  t.is(response.status, 200);
});
