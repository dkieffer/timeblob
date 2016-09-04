afrom django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from timeblob.models import TimeEntry
from django.contrib.auth.models import AnonymousUser, User
import timeblob.api.views
from django.utils import timezone, dateparse
from timeblob import util

class TimeEntryTest(APITestCase):

    def setUp(self):
        self.TestUser = User.objects.create_user("TestUser", password="TestPass")
        self.TestUser.save()
        # we use this since the RemoteUserBackend is used for Sandstorm
        self.client.force_login(self.TestUser, backend="django.contrib.auth.backends.RemoteUserBackend")


    def test_no_current_entry(self):
        '''Can't get a non-valid entry'''
        url = reverse("api:time-entry-current")
        data = {}
        response = self.client.get(url, data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND, "We received a status of %s but we should have received 404" % response.status_code)

    def test_has_current_entry(self):
        '''An entry exists'''
        startTime = timezone.now()
        currentEntry = TimeEntry(user=self.TestUser, description="Example", start=startTime)
        currentEntry.save()

        url = reverse("api:time-entry-current")
        data = {}
        response = self.client.get(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['description'], "Example")
        self.assertEqual(dateparse.parse_datetime(response.data['start']), startTime)
        self.assertEqual(response.data['stop'], None)

        self.assertGreater(response.data['duration'], 0)

    def test_starts_entry_if_none_exists(self):

        DESCRIPTION = 'description'
        startTime = timezone.now()

        url = reverse("api:time-entry-start")
        data = {'description': DESCRIPTION}
        response = self.client.post(url, data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['description'], DESCRIPTION)
        self.assertGreater(dateparse.parse_datetime(response.data['start']), startTime)
        self.assertEqual(response.data['stop'], None)
        self.assertGreater(response.data['duration'], 0)

    def test_start_entry_fails_if_data_is_invalid(self):
        url = reverse("api:time-entry-start")
        data = {'created_with': util.create_rand_string(201)}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(2, len(response.data))
        self.assertIn('description', response.data)
        self.assertIn('created_with', response.data)


    def test_stop_entry(self):
        DESCRIPTION = 'EXAMPLE'
        startTime = timezone.now()
        currentEntry = TimeEntry(user=self.TestUser, description=DESCRIPTION, start=startTime)
        currentEntry.save()

        url = reverse("api:time-entry-stop")
        data = {}
        response = self.client.post(url, data)

        response_start_time = dateparse.parse_datetime(response.data['start'])
        response_stop_time = dateparse.parse_datetime(response.data['stop'])

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['description'], DESCRIPTION)
        self.assertEqual(response_start_time, startTime)
        self.assertGreater(response_stop_time, response_start_time)
        self.assertEqual(response.data['duration'],(response_stop_time- response_start_time).total_seconds())

    def test_start_entry_with_current_running(self):
        DESCRIPTION = 'EXAMPLE'
        startTime = timezone.now()
        currentEntry = TimeEntry(user=self.TestUser, description=DESCRIPTION, start=startTime)
        currentEntry.save()


        NEWDESCRIPTION = "NEW DESCRIPTION"
        url = reverse("api:time-entry-start")
        data = {'description': NEWDESCRIPTION }
        response = self.client.post(url, data)


        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['description'], NEWDESCRIPTION)
        self.assertEqual(response.data['stop'], None)
        self.assertGreater(dateparse.parse_datetime(response.data['start']), startTime)
        self.assertGreater(response.data['duration'], 0)

        url = reverse("api:time-entry-get", args=(currentEntry.id,))
        response = self.client.get(url, data)
        response_start_time = dateparse.parse_datetime(response.data['start'])
        response_stop_time = dateparse.parse_datetime(response.data['stop'])
        response_duration = response.data['duration']
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['description'], DESCRIPTION)
        self.assertEqual(response.data['user'], self.TestUser.id)
        self.assertEqual(response_start_time, startTime)

        self.assertGreater(response_stop_time, response_start_time)
        self.assertEqual(response_duration,(response_stop_time- response_start_time).total_seconds())
        response = self.client.get(url, data)

        self.assertEqual(response_duration, response.data['duration'], "We checked the duration twice but it changed from %s to %s" % (response_duration, response.data['duration']))
