const isCI = require('is-ci')

module.exports = {
  e2e: {
    specPattern: 'cypress/e2e',
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
  },
}
