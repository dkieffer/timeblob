var angular = require('angular')
require('angular-moment')

var app = angular.module('app', ['angularMoment'])
app.config(['$httpProvider', function ($httpProvider)
{
  $httpProvider.defaults.xsrfCookieName = "csrftoken"
  $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken"
}])
