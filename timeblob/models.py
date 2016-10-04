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
    project = models.ForeignKey('Project',blank=True, null=True)
    task = models.ForeignKey('Task',blank=True, null=True)
    billable = models.BooleanField(default=False,blank=True)
    start = models.DateTimeField(blank=False)
    stop = models.DateTimeField(blank=True, null=True)
    created_with = models.CharField(max_length=200)
    last_updated = models.DateTimeField(blank=False)

    def save(self, *args, **kwargs):
        '''save updates last_updated'''
        self.last_updated = timezone.now()
        super(TimeEntry, self).save(*args, **kwargs)

class Project(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.TextField(null=False)

class Task(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.TextField(null=False)
