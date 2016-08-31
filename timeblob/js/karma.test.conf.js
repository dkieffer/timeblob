// Karma configuration

var common = require('./karma.common')
common.browsers =  [ 'Chrome']

module.exports = function(config) {
  common.logLevel= config.LOG_INFO
  config.set(common)
}
