# publisher-portal

## Project setup
```
yarn install
```

### Start UI server for development with live chaperone
```
yarn serve
```

This will start the server with a real web sdk, so you'll need to point it to a running chaperone, either by setting VUE_APP_CHAPERONE_SERVER_URL environment variable, or by having it running on the default port (24274) on the same host as the UI (so probably `http://localhost:24274`). You can run a local chaperone using [holo-dev-server](https://github.com/Holo-Host/envoy-chaperone/tree/main/holo-dev-server).

### Start UI server for development with mock web sdk
```
yarn serve:mock
```

This will start the server with a mock web sdk, for convenience if you just need to work on the ui without having to spin up the whole shebang.

### Run tests
```
npm run test
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
