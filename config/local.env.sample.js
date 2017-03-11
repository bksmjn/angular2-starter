/**
 * Created by Franz on 3/6/2017.
 */

var config = {
  title: 'Rename Me',
  indexHtmlBase: '/',
  operatingMode: {
    mode: 'DebugNoServer', // or 'Development', or 'Production'
    simulatedRestTimeout: '1000'
  },
  logging: {
    trace: 'false' // or 'true'
  },
  sass: {
    includePaths: 'node_modules/foundation-sites/scss'
  },
  server : {
    port: 8080,
    host: 'localhost',
    proxyHost: 'localhost',
    proxyPort: '9000',
    restBasePath: 'api/'
  },
  browser: 'windows',
  browserConfig: {
    osx: '/Applications/Google\ Chrome.app',
    windows: 'chrome'
  }
};

module.exports = config;
