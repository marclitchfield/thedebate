var config = require('node-prefix');

exports.config = {
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  seleniumServerJar: process.env.npm_config_prefix + '/node_modules/protractor/selenium/selenium-server-standalone-2.43.1.jar',
  
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