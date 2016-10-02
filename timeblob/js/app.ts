declare var BASE_URL: string

import * as angular from 'angular'
import 'moment'
import 'angular-moment'
import * as interfaces from './services/interfaces'

var app = angular.module('app', ['angularMoment'])
app.config(['$httpProvider', function ($httpProvider: angular.IHttpProvider)
{
  $httpProvider.defaults.xsrfCookieName = "csrftoken"
  $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken"
}])

//start the currentEntry service
app.run((CurrentEntryService:interfaces.ICurrentEntryService ) => {
  // are we running in the tester? If so, don't run current
  if (window['jasmine'] === undefined) {CurrentEntryService.current();}
});
