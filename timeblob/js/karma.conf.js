//if chromium exists, we do that
var common = require('./karma.common')
common.browsers =  [ 'Chromium']

module.exports = function(config) {
  common.logLevel= config.LOG_INFO
  config.set(common)
}
