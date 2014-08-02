the debate
==========

[![Build Status](https://travis-ci.org/marclitchfield/thedebate.svg?branch=master)](https://travis-ci.org/marclitchfield/thedebate)


## Development Setup

Install dependencies
```
npm run setup
npm install
```

Lint, Build, Unit Tests
```
grunt
```

Run the server and watch for file changes
```
supervisor -w . server.js
```

Run UI tests (requires the server to be running)
```
npm test
```
