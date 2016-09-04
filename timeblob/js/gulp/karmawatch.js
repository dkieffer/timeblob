var Server = require('karma').Server;
var os = require('os');

module.exports = function(dirname, done)
{
  var karmaConf = '/karma.conf.js';
  //you probably won't have chromium on darwin so let's assume Chrome
  if (os.platform == ' darwin') {
      karmaConf = '/karma.mac.conf.js';
  }
  new Server({
      configFile: __dirname + karmaConf
  }, done).start();
}
