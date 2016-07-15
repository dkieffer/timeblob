# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-15 16:52
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='TimeEntry',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('description', models.TextField()),
                ('billable', models.BooleanField(default=False)),
                ('start', models.DateTimeField(default=django.utils.timezone.now)),
                ('stop', models.DateTimeField(blank=True, null=True)),
                ('created_with', models.CharField(max_length=200)),
                ('last_updated', models.DateTimeField(default=django.utils.timezone.now)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='timeblob.Project')),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='timeblob.Task')),
            ],
        ),
    ]
