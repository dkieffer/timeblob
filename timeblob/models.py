from __future__ import unicode_literals

from django.db import models
from django.utils import timezone
from django.core import exceptions as core_exceptions
from django.conf import settings

from . import exceptions


# Create your models here.

class TimeEntry(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, blank=False)
    description = models.TextField(blank=True)
    project = models.ForeignKey('Project',blank=True)
    task = models.ForeignKey('Task',blank=True)
    billable = models.BooleanField(default=False,blank=True)
    start = models.DateTimeField(default=timezone.now, blank=False)
    stop = models.DateTimeField(blank=True, null=True)
    created_with = models.CharField(max_length=200)
    last_updated = models.DateTimeField(default=timezone.now, blank=False)

    def save(self, *args, **kwargs):
        '''save updates last_updated'''
        self.last_updated = timezone.now
        super(TimeEntry, self).save(*args, **kwargs)

    @staticmethod
    def current(user):
        '''gets current time entry. If none current, raises `NoCurrentTask`'''
        try:
            return TimeEntry.objects.get(user=user, stop=None)
        except core_exceptions.ObjectDoesNotExist as e:
            raise exceptions.NoCurrentTask()


    @staticmethod
    def start_task( user, data):
        try:
            current = TimeEntry.current(user)
            TimeEntry.stop(user)
        except exceptions.NoCurrentTask:
            pass
        entry = TimeEntry(user=user, **data)
        entry.save()
        return entry


    @staticmethod
    def stop_task(user):
        current = TimeEntry.current(user)
        current.stop = timezone.now
        current.save()
        return current

class Project(models.Model):
    id = models.AutoField(primary_key=True)

class Task(models.Model):
    id = models.AutoField(primary_key=True)
