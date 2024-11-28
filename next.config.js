const packageJson = require('./package.json');

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: false,
});

module.exports = withPWA({
  env: {
    APP_VERSION: packageJson.version,
  },
});
