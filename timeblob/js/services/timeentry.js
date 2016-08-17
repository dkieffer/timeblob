var urljoin = require("url-join")

class TimeEntryService {
  constructor($http, base_url)
  {
    this.$http = $http
    this.base_url = base_url
    this.postfix = "time_entries"
  }


  list(start_date=null, end_date=null) {
    var self = this;
    return this.$http({
      method: 'GET',
      url:self.urlCreate(),
      params:
      {
        start_date: start_date,
        end_date: end_date
      }
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

  stop(id)
  {
    var self = this;
    return this.$http({
      method: "PUT",
      url: self.urlCreate(id, 'stop')
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
