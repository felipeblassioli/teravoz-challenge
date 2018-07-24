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

function ensureValidUrl(variableName, url) {
  if (!url) {
    throw new Error(`Missing environment variable ${variableName}`);
  }
  // A TypeError will be thrown if the input or base are not valid URLs.
  // eslint-disable-next-line no-new
  new URL(url);
}
const teravozServiceUrl = process.env.TERAVOZ_SERVICE_URL;
ensureValidUrl('TERAVOZ_SERVICE_URL', teravozServiceUrl);

const apiServiceUrl = process.env.API_SERVICE_URL;
ensureValidUrl('API_SERVICE_URL', apiServiceUrl);

const config = {
  ...webpackConfig,
  publicRuntimeConfig: {
    teravozServiceUrl,
    apiServiceUrl,
  },
};

module.exports = withCss(config);
