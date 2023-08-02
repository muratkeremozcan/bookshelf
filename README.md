# Kent's Bookshelf app from Epic React, with Cypress component tests

[![codecov](https://codecov.io/gh/muratkeremozcan/bookshelf/branch/main/graph/badge.svg?token=WbJ5jglAp8)](https://codecov.io/gh/muratkeremozcan/bookshelf)
[![bookshelf](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/detailed/r9paau&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/r9paau/runs)
![react version](https://img.shields.io/badge/react-18.2.0-brightgreen)
![react-scripts version](https://img.shields.io/badge/react--scripts-5.0.1-brightgreen)
![cypress version](https://img.shields.io/badge/cypress-12.17.3-brightgreen)
[![renovate-app badge][renovate-badge]][renovate-app]

This one is a fork of https://github.com/kentcdodds/bookshelf, with a few tweaks
of my own and Cypress component tests. It's meant to be used as an experimental
learning resource. All contributions are welcome.

```bash
npm i --registry https://registry.npmjs.org  # specify the registry in case you are using a proprietary registry

# no need to have server running for these:
npm run cy:open-ct # for cypress component test runner
npm run cy:run-ct # headless version

# runs the ui and api servers, then opens e2e runner
npm run cy:open-e2e
npm run cy:run-e2e  # headless version

# a la carte
npm start # start the ui and api server
npm run cy:open # for cypress e2e test runner
npm run cy:run # headless version

npm test # run unit tests with jest
```

[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
