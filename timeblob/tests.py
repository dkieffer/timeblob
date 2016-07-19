from django.test import TestCase
from django.contrib.auth.models import AnonymousUser, User
from .models import TimeEntry
from .exceptions import NoCurrentTask
# Create your tests here.

class TimeEntryNoCurrentTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="jacob",
            email="jake@jacob.jake",
            password='top_secret')

    def test_check_current_without_current(self):
        '''We're checking current timeentry but none is started'''
        with self.assertRaises(NoCurrentTask):
            TimeEntry.current(self.user)

    def test_stop_current_time_entry(self):
        '''We're trying to stop a current timeentry but none is started'''
        with self.assertRaises(NoCurrentTask):
            TimeEntry.stop_task(self.user)
