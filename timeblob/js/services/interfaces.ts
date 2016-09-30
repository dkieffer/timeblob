import events = require('events');
import * as angular from 'angular'


export interface ITimeEntry
{
  id: number
  user: number
  description: string
  project: number
  task: number
  billable: boolean
  start: string
  stop: string
  created_with: string
  duration: number
  last_update: string
}

export interface IListFilters {
  before: Date
  after: Date
  task: number
  description: string
  created_with: string
  last_updated_before: Date
  last_updated_after: Date
  project:number
  billable: boolean

}

export interface ITimeEntryService {
  base_url: string
  $http: angular.IHttpService
  postfix: string
  //constructor($http: ng.)



  list(filters:IListFilters) : angular.IHttpPromise<Array<ITimeEntry>>


  get(id: number): angular.IHttpPromise<ITimeEntry>

  delete(id: number): angular.IHttpPromise<ITimeEntry>

  update(id:number, time_entry:ITimeEntry) : angular.IHttpPromise<ITimeEntry>
  start(time_entry:ITimeEntry) : angular.IHttpPromise<ITimeEntry>


  stop() :  angular.IHttpPromise<ITimeEntry>


  current() : angular.IHttpPromise<ITimeEntry>
}

export interface ICurrentEntryService extends events.EventEmitter {
  TimeEntryService : ITimeEntryService
  cachedCurrent : angular.IHttpPromiseCallbackArg<ITimeEntry>
  start(ITimeEntry): angular.IHttpPromise<ITimeEntry>
  current() : angular.IHttpPromise<ITimeEntry>
  stop(): angular.IHttpPromise<ITimeEntry>
}
