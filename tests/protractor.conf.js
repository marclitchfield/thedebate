var config = require('node-prefix');

exports.config = {
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  
  specs: ['acceptance/*.spec.js'],

  multiCapabilities: [
    {'browserName': 'phantomjs'},
    // {'browserName': 'firefox'},
    // {'browserName': 'chrome'},
  ],

  baseUrl: 'http://localhost:9002',

  jasmineNodeOpts: {
    isVerbose: true,
    showColors: true,
    includeStackTrace: false,
    defaultTimeoutInterval: 10000
  }
}