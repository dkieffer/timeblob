//BASE_URL: string

import urljoin = require("url-join")
import * as angular from 'angular'
import * as interfaces from './interfaces'

declare var BASE_URL: string



class TimeEntryService implements interfaces.ITimeEntryService {
  base_url: string
  $http: angular.IHttpService
  postfix: string
  //constructor($http: ng.)
  constructor($http: angular.IHttpService, base_url: string){
    this.base_url = base_url
    this.$http = $http
    this.postfix = "time_entries"

  }

  list(filters:interfaces.IListFilters) : angular.IHttpPromise<Array<interfaces.ITimeEntry>>
  {
    var self = this
    return self.$http({
      method: 'GET',
      url: self.urlCreate(),
      params: filters
    })
  }

  get(id: number): angular.IHttpPromise<interfaces.ITimeEntry> {
    var self = this;
    return this.$http({
      method: 'GET',
      url:self.urlCreate(id)
    })
  }

  delete(id: number): angular.IHttpPromise<interfaces.ITimeEntry> {
    var self = this
    return this.$http({
      method: "DELETE",
      url: self.urlCreate(id)
    })
  }

  update(id:number, time_entry:interfaces.ITimeEntry) : angular.IHttpPromise<interfaces.ITimeEntry>
  {
    var self = this;
    return this.$http({
      method: 'PUT',
      url:self.urlCreate(id),
      data: time_entry
    });
  }

  start(time_entry:interfaces.ITimeEntry) : angular.IHttpPromise<interfaces.ITimeEntry>
  {
    var self = this;
    return this.$http({
      method: "POST",
      url: self.urlCreate('start'),
      data: time_entry
    });
  }

  stop() :  angular.IHttpPromise<interfaces.ITimeEntry>
  {
    var self = this;
    return this.$http({
      method: "POST",
      url: self.urlCreate('stop')
    });
  }

  current() : angular.IHttpPromise<interfaces.ITimeEntry>
  {
    var self = this;
    return this.$http({
      method: "GET",
      url: self.urlCreate('current')
    });
  }


  urlCreate(...urls : Array<string|number>) : string
  {
    var self = this;

    return urljoin(self.base_url, self.postfix, ...urls);
  }

}

angular.module('app').factory("TimeEntryService", ($http:angular.IHttpService) =>
{
  return new TimeEntryService($http, BASE_URL);
})
