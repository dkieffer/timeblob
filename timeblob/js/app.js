var angular = require('angular')
require('moment')
require('angular-moment')

var app = angular.module('app', ['angularMoment'])
app.config(['$httpProvider', function ($httpProvider)
{
  $httpProvider.defaults.xsrfCookieName = "csrftoken"
  $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken"
}])

//start the currentEntry service
//app.run((CurrentEntryService) => {CurrentEntryService.current();})
