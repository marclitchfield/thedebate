var config = require('node-prefix');
var ScreenShotReporter = require('protractor-screenshot-reporter');

exports.config = {
  //seleniumAddress: 'http://127.0.0.1:4444/wd/hub', 

  specs: ['acceptance/*.spec.js'],

  multiCapabilities: [
    //{'browserName': 'phantomjs'},
    //{'browserName': 'firefox'},
    {'browserName': 'chrome'},
  ],

  baseUrl: 'http://localhost:9002',

  jasmineNodeOpts: {
    isVerbose: true,
    showColors: true,
    includeStackTrace: false,
    defaultTimeoutInterval: 10000
  },

  // onPrepare: function() {
  //   // Add a screenshot reporter and store screenshots to `/tmp/screnshots`:
  //   jasmine.getEnv().addReporter(new ScreenShotReporter({
  //     baseDirectory: './screenshots'
  //   }));
  // }
}
