from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from timeblob.models import TimeEntry
from django.contrib.auth.models import AnonymousUser, User
import timeblob.api.views

from django.utils import timezone, dateparse
from timeblob import util
from django.contrib.auth.models import  User
from . import ForceLoginTest

class TimeEntryListTest(ForceLoginTest):
    fixtures = ['users', 'list']
    tests = [ {'user': 'alice',

                'cases': [
                    {'search':{'description': 'fa'}, 'length': 2},
                     {'search':{'description': 'fa', 'project':'1'}, 'length': 0},
                     {'search':{'description': 'faf', 'task': '1'}, 'length': 1},
                     {'search':None, 'length': 4},
                     {'search':{'project': '1'}, 'length': 1},
                     {'search':{'project': '2'}, 'length': 1},
                     {'search':{'before': '2016-09-05 04:04:38.718903+00:00'}, 'length': 3},
                     {'search':{'before': '2016-09-05 04:04:38.718903+00:00', 'after': '2016-09-04 03:53:39.497848+00:00'}, 'length': 2},
                     {'search':{'before': '2016-09-06 04:04:38.718903+00:00'}, 'length': 4},
                     {'search':{'billable': 'True'}, 'length': 1},
                     {'search':{'billable': 'False'}, 'length': 3}
                     ]
             },
             {  'user': 'bob',

                         'cases': [
                            {'search':None, 'length': 1},
                            {'search': {'description': 'something'}, 'length':0 }
                          ]
             }
             ]

    def setUp(self):

        self.url = reverse("api:time-entry-list")

    def test_lists(self):
        for i in self.tests:
            self.TestUser = User.objects.filter(username=i['user']).first()
            # we use this since the RemoteUserBackend is used for Sandstorm
            self.client.force_login(self.TestUser, backend="django.contrib.auth.backends.RemoteUserBackend")
            for case in i['cases']:
                response = self.client.get(self.url, case['search'])
                self.assertEqual(response.status_code, status.HTTP_200_OK)
                self.assertEqual(case['length'], len(response.data))
