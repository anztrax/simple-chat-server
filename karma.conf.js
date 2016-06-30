module.exports = function karmaConfig(config){
  config.set({
    frameworks : [
      'mocha'
    ],
    reporters : [
      // Reference: https://github.com/mlex/karma-spec-reporter
      // Set reporter to print detailed results to console
      'spec',

      // Reference: https://github.com/karma-runner/karma-coverage
      // Output code coverage files
      'coverage'
    ],
    files : [
      // Reference: https://www.npmjs.com/package/phantomjs-polyfill
      // Needed because React.js requires bind and phantomjs does not support it
      'node_modules/phantomjs-polyfill/bind-polyfill.js',

      // Grab all files in the tests directory that contain _test.
      'tests/**/*_test.*'
    ],
    preprocessors : {
      // Convert files with webpack and load sourcemaps
      'test/**/*_test.*' : ['webpack','sourcemap'],
      'app/**/*.*' : 'coverage'
    },
    browsers : [
      'PhantomJS'
    ],
    singleRun : true,
    // Configure code coverage reporter
    coverageReporter : {
      reporters : [
        // generates ./coverage/lcov.info
        {
          type: 'lcovonly',
          subdir: '.'
        },
        // generates ./coverage/coverage-final.json
        {
          type: 'json',
          subdir: '.'
        },
        // generates ./coverage/index.html
        {
          type: 'html',
          subdir: '.'
        }
      ]
    },
    // Test webpack config
    webpack: require('./webpack.config'),
    // Hide webpack build information from output
    webpackMiddleware: {
      noInfo: true
    }
  });
}