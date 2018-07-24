module.exports = {
  apps: [
    {
      name: 'dashboard',
      script: 'server.js',
      cwd: './apps/dashboard',
      env: {
        PORT: 3000,
        TERAVOZ_SERVICE_URL: 'http://localhost:3001',
        API_SERVICE_URL: 'http://localhost:3002',
      },
    },
    {
      name: 'teravoz-api-fake',
      script: 'start-teravoz-fake-api.js',
      cwd: './apps/teravoz-api-fake',
      env: {
        PORT: 3001,
        NODE_ENV: 'production',
        TARGET_WEBHOOK_URL: 'http://localhost:3002/webhook',
      },
    },
    {
      name: 'api',
      script: 'start-api.js',
      cwd: './apps/api',
      env: {
        PORT: 3002,
        NODE_ENV: 'production',
        TERAVOZ_SERVICE_URL: 'http://localhost:3001',
        SAVED_STATE_FILEPATH: '/tmp/saved-state.json',
      },
    },
  ],
};
