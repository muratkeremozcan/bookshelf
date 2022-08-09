const {defineConfig} = require('cypress')
const codeCoverageTask = require('@bahmutov/cypress-code-coverage/plugin')
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
      return Object.assign({}, config, codeCoverageTask(on, config))
    },
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },

  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
      webpackConfig: {
        // workaround to react scripts 5 issue https://github.com/cypress-io/cypress/issues/22762#issuecomment-1185677066
        devServer: {
          port: 3001,
        },
        mode: 'development',
        devtool: false,
        module: {
          rules: [
            // application and Cypress files are bundled like React components
            // and instrumented using the babel-plugin-istanbul
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react'],
                  plugins: [
                    'istanbul',
                    [
                      '@babel/plugin-transform-modules-commonjs',
                      {
                        loose: true,
                        allowTopLevelThis: true,
                        importInterop: true,
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      },
    },
    setupNodeEvents(on, config) {
      return Object.assign({}, config, codeCoverageTask(on, config))
    },
    specPattern: 'src/**/**/*.cy.{js,ts,jsx,tsx}',
  },
})
