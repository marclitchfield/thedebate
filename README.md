the debate
==========

[![Build Status](https://travis-ci.org/marclitchfield/thedebate.svg?branch=master)](https://travis-ci.org/marclitchfield/thedebate)


## Development Setup

Install dependencies
```
npm install -g mocha
npm install -g grunt-cli
npm install -g phantomjs
npm install -g casperjs
npm install -g node-supervisor
npm install
```

Run the server and watch for file changes
```
supervisor -w . server.js
```

Lint, Build, Unit Tests
```
grunt
```

Run UI tests (requires the server to be running)
```
npm test
```
