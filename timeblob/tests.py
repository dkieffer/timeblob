from django.test import TestCase
from django.contrib.auth.models import AnonymousUser, User
from .models import TimeEntry
from .exceptions import NoCurrentTask
from django.utils import timezone
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

class TimeEntryCurrentTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="jacob",
            email="jake@jacob.jake",
            password='top_secret')
        self.entry = TimeEntry.objects.create(user=self.user,
            start=timezone.now())
        self.entry.save()
    def test_get_current(self):
        self.assertEqual(self.entry.id, TimeEntry.current(self.user).id)
    def test_get_stop(self):
        end_task = TimeEntry.stop_task(self.user)
        self.assertEqual(self.entry.id, end_task.id)
        self.assertGreater(end_task.stop, end_task.start)
