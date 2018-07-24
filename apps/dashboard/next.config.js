const withCss = require('@zeit/next-css');

const webpackConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          publicPath: './',
          outputPath: 'static/',
          name: '[name].[ext]',
        },
      },
    });

    return config;
  },
};

const config = {
  ...webpackConfig,
  serverRuntimeConfig: {
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT, 10) || 3000,
    teravozServiceUrl: process.env.TERAVOZ_SERVICE_URL,
    apiServiceUrl: process.env.API_SERVICE_URL,
  },
};

module.exports = withCss(config);
