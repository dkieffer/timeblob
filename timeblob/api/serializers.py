from rest_framework import serializers
from timeblob.models import TimeEntry, Project, Task
from django.utils import timezone
from timeblob.user_time_entry_manager import UserTimeEntryManager
from django.contrib.auth.models import AnonymousUser, User

class TimeEntrySerializer(serializers.Serializer):

    id = serializers.IntegerField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    description = serializers.CharField(required=True)
    project =  serializers.PrimaryKeyRelatedField(queryset=Project.objects.all(), required=False)
    task =  serializers.PrimaryKeyRelatedField(queryset=Task.objects.all(),required=False)
    billable =  serializers.BooleanField(required=False)
    start = serializers.DateTimeField(format="iso-8601", required=True)
    stop =  serializers.DateTimeField(format="iso-8601")
    created_with = serializers.CharField(max_length=200, required=False)
    duration = serializers.SerializerMethodField();
    last_updated = serializers.DateTimeField(format="iso-8601", read_only=True)



    def __init__(self, current_user, *args, **kwargs):
        super(TimeEntrySerializer, self).__init__( *args, **kwargs)
        self.user = current_user

    def create(self, validated_data):
        return TimeEntry.objects.create(user=self.user, **validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `TimeEntry` instance, given the validated data.
        """
        instance.user = self.user
        instance.description = validated_data.get('description', instance.description)
        instance.project = validated_data.get('project', instance.project)
        instance.task = validated_data.get('task', instance.task)
        instance.billable = validated_data.get('billable', instance.billable)
        instance.start = validated_data.get('start', instance.start)
        instance.stop = validated_data.get('stop', instance.stop)
        instance.created_with = validated_data.get('created_with', instance.created_with)
        instance.save()
        return instance

    def get_duration(self, obj):
        if obj.stop != None:
            return (obj.stop - obj.start).total_seconds()
        return (timezone.now() - obj.start).total_seconds()

class TimeEntryStartSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    description = serializers.CharField(required=True)
    project =  serializers.IntegerField(required=False)
    task =  serializers.IntegerField(required=False)
    billable =  serializers.BooleanField(required=False)
    start = serializers.DateTimeField(format="iso-8601", read_only=True)
    stop =  serializers.DateTimeField(format="iso-8601", read_only=True)
    created_with = serializers.CharField(max_length=200, required=False)
    duration = serializers.SerializerMethodField();
    last_updated = serializers.DateTimeField(format="iso-8601", read_only=True)

    def __init__(self, current_user, *args, **kwargs):
        super(TimeEntryStartSerializer, self).__init__( *args, **kwargs)
        self.user = current_user

    def create(self, validated_data):
        manager = UserTimeEntryManager(self.user)
        task = manager.start_current(**validated_data)
        return task

    def get_duration(self, obj):
        if obj.stop != None:
            return (obj.stop - obj.start).total_seconds()

        return  (timezone.now() - obj.start).total_seconds()
