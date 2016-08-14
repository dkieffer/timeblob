
from django.conf.urls import url, include
from . import views


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^templates_js$', views.templates_js),
    url(r'^api/', include('timeblob.api.urls'))
]
