from timeblob.models import TimeEntry
from django.core import exceptions as core_exceptions
from . import exceptions
from django.utils import timezone
class UserTimeEntryManager:
    def __init__(self, user):
        self.user = user


    def current(self):
        '''gets current time entry. If none current, raises `NoCurrentEntry`'''
        try:
            return TimeEntry.objects.get(user=self.user, stop=None)
        except core_exceptions.ObjectDoesNotExist as e:
            raise exceptions.NoCurrentEntry()



    def start_current(self, **data):
        try:
            self.stop_current()
        except exceptions.NoCurrentEntry:
            pass
        entry = TimeEntry(user=self.user, start=timezone.now(), **data)
        entry.save()
        return entry


    def stop_current(self):
        current = self.current()
        current.stop = timezone.now()
        current.save()
        return current
