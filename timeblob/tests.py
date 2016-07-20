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
        '''Get the current active timeentry.'''
        self.assertEqual(self.entry.id, TimeEntry.current(self.user).id)

    def test_get_stop(self):
        '''Stop the current active timeentry'''
        end_task = TimeEntry.stop_task(self.user)
        self.assertEqual(self.entry.id, end_task.id)
        self.assertGreater(end_task.stop, end_task.start)

    def test_start_when_another_is_running(self):
        '''does it start correctly when another task is running'''
        new_time_entry = TimeEntry.start_task(self.user)
        ended_entry = TimeEntry.objects.get(id=self.entry.id)
        self.assertEqual(ended_entry.start, self.entry.start)
        self.assertGreater(ended_entry.stop, ended_entry.start)
        self.assertEqual(new_time_entry.id, TimeEntry.current(self.user).id)
        last_entry = TimeEntry.stop_task(self.user)
        self.assertEqual(new_time_entry.id, last_entry.id)
        self.assertGreater(last_entry.stop, last_entry.start)




class TimeEntryTestStartWithoutCurrent(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="jacob",
            email="jake@jacob.jake",
            password='top_secret')

    def test_start(self):
        '''does it start'''
        time_entry = TimeEntry.start_task(self.user)
        self.assertEqual(time_entry.id, TimeEntry.current(self.user).id)
        result = TimeEntry.stop_task(self.user)
        self.assertEqual(time_entry.id, result.id)
        self.assertGreater(result.stop, result.start)
