const {defineConfig} = require('cypress')
// const isCI = require('is-ci')

module.exports = defineConfig({
  projectId: 'r9paau',

  retries: {
    runMode: 2,
    openMode: 0,
  },

  e2e: {
    excludeSpecPattern: '**/*.+(exercise|final|extra-)*.js',
    setupNodeEvents(on, config) {
      // why 8811 in CI? Maybe Netlify related
      // const isDev = config.watchForFileChanges
      // if (!isCI) {
      //   config.baseUrl = isDev
      //     ? 'http://localhost:3000'
      //     : 'http://localhost:8811'
      // }
      return config
    },
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },

  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
      webpackConfig: {
        devServer: {
          port: 3000,
        },
      },
    },
    setupNodeEvents(on, config) {
      return config
    },
    specPattern: 'src/**/**/*.cy.{js,ts,jsx,tsx}',
  },
})
