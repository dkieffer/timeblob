from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^time_entries$', views.time_entries_list),
    url(r'^time_entries/(?P<id>[0-9]+)$', views.time_entry_item, name="time-entry-get"),
    url(r'^time_entries/start$', views.time_entry_start, name='time-entry-start'),
    url(r'^time_entries/stop$', views.time_entry_stop, name='time-entry-stop'),
    url(r'^time_entries/(?P<id>[0-9]+)/stop$', views.time_entry_stop),
    url(r'^time_entries/current$', views.time_entry_current, name='time-entry-current')
];
