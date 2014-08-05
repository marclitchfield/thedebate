the debate
==========

[![Build Status](https://travis-ci.org/marclitchfield/thedebate-web.svg?branch=master)](https://travis-ci.org/marclitchfield/thedebate-web)

Web server process for the debate


## Development Setup

Install dependencies
```
npm run setup
npm install
```

Watch for changes and automatically lint and build Less to CSS, Jade to HTML
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


## Components

- Web: https://github.com/marclitchfield/thedebate-web
- API: https://github.com/marclitchfield/thedebate-api
