the debate
==========

[![Build Status](https://travis-ci.org/marclitchfield/thedebate-web.svg?branch=master)](https://travis-ci.org/marclitchfield/thedebate-web)

Web server process for the debate


## Development Setup

Install dependencies
```
npm run setup
npm install
bower install
```

Start server process launch in browser with live reload.
```
ember server
```

Start an instance of the server and start a testem session. Will watch for changes and rerun tests.
```
ember test --server
```

Run tests in CI mode
```
ember test
```


## Components

- Web: https://github.com/marclitchfield/thedebate-web
- API: https://github.com/marclitchfield/thedebate-api
