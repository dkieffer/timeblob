var os = require('os')
var Server = require('karma').Server

module.exports = function(dirname, done)
{
  var karmaConf = '/karma.conf.js';
  //you probably won't have chromium on darwin so let's assume Chrome
  if (os.platform == ' darwin') {
      karmaConf = '/karma.mac.conf.js';
  }
  new Server({
      configFile: dirname + karmaConf
  }, done).start();
}
