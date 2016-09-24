var urljoin = require("url-join")

class TimeEntryService {
  constructor($http, base_url)
  {
    this.$http = $http
    this.base_url = base_url
    this.postfix = "time_entries"
  }


  /*
  parameters are: before=null,
    after=null,
    task=null,
    description=null,
    created_with=null,
    last_updated_before=null,
    last_updated_after=null,
    task=null,
    project=null,
    billable=null
  */
  list(filters={}) {
    var self = this;
    return this.$http({
      method: 'GET',
      url:self.urlCreate(),
      params: filters

    });
  }

  get(id) {
    var self = this;
    return this.$http({
      method: 'GET',
      url:self.urlCreate(id)
    })
  }


  delete(id) {
    var self = this;
    return this.$http({
      method: 'DELETE',
      url:self.urlCreate(id)});
  }

  update(id, time_entry)
  {
    var self = this;
    return this.$http({
      method: 'PUT',
      url:self.urlCreate(id),
      data: time_entry
    });
  }

  start(time_entry)
  {
    var self = this;
    return this.$http({
      method: "POST",
      url: self.urlCreate('start'),
      data: time_entry
    });
  }

  stop()
  {
    var self = this;
    return this.$http({
      method: "POST",
      url: self.urlCreate('stop')
    });
  }

  current()
  {
    var self = this;
    return this.$http({
      method: "GET",
      url: self.urlCreate('current')
    });
  }


  urlCreate(...urls) {
    var self = this;
    return urljoin(self.base_url, self.postfix, ...urls);
  }

}

//timeentry

angular.module('app').factory("TimeEntryService", ($http) =>
{
  return new TimeEntryService($http, BASE_URL);
})
