declare var BASE_URL: string

import * as angular from 'angular'
import 'moment'
import 'angular-moment'
import ''
import * as interfaces from './services/interfaces'

var app = angular.module('app', ['angularMoment'])
app.config(['$httpProvider', function ($httpProvider: angular.IHttpProvider)
{
  $httpProvider.defaults.xsrfCookieName = "csrftoken"
  $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken"
}])

//start the currentEntry service
app.run((CurrentEntryService:interfaces.ICurrentEntryService ) => {CurrentEntryService.current();})
