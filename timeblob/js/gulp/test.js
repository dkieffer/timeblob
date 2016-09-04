var Server = require('karma').Server;
module.exports = function(dirname, done)
{
  new Server({
      configFile: dirname + '/karma.test.conf.js',
      singleRun: true
  }, done).start();
}
