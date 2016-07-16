from __future__ import unicode_literals

from django.db import models
from django.utils import timezone


# Create your models here.

class TimeEntry(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.TextField()
    project = models.ForeignKey('Project')
    task = models.ForeignKey('Task')
    billable = models.BooleanField(default=False)
    start = models.DateTimeField(default=timezone.now)
    stop = models.DateTimeField(blank=True, null=True)
    created_with = models.CharField(max_length=200)
    last_updated = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        self.last_updated = timezone.now
        super(TimeEntry, self).save(*args, **kwargs)

class Project(models.Model):
    id = models.AutoField(primary_key=True)

class Task(models.Model):
    id = models.AutoField(primary_key=True)
