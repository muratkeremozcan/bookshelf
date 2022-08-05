# Kent's Bookshelf app from Epic React, with Cypress component tests

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
yarn cy:run-e2e  # headless version

# a la carte
yarn start # start the ui and api server
yarn cy:open # for cypress e2e test runner
yarn cy:run # headless version

yarn test # run unit tests with jest
```
