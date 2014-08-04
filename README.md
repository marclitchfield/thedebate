the debate
==========

[![Build Status](https://travis-ci.org/marclitchfield/thedebate.svg?branch=master)](https://travis-ci.org/marclitchfield/thedebate)


## Development Setup

Install dependencies
```
npm run setup
npm install
```

Lint, Build Less->CSS and Jade->HTML
```
grunt
```

Watch for changes and automatically lint and build
```
grunt watch
```

Run the server and watch for file changes
```
supervisor -w . server.js
```

Run UI tests (requires the server to be running)
```
npm test
```
