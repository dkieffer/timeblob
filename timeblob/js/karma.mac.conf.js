// Karma configuration

var common = require('./karma.common')
common.browsers =  [ 'PhantomJS']

module.exports = function(config) {
  common.logLevel= config.LOG_INFO
  config.set(common)
}
