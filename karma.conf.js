const webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    basePath: 'app/src',

    frameworks: ['jasmine'],

    files: ['**/*.test.js'],

    exclude: [],

    preprocessors: {
      ['**/*.test.js']: ['webpack']
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    autoWatch: true,

    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    plugins: [
      require('karma-webpack'),
      'karma-jasmine',
      'karma-chrome-launcher'
    ],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  });
};
