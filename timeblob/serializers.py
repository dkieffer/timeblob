from rest_framework import serializers
from timeblob.models import TimeEntry

class TimeEntrySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    description = serializers.CharField(required=True)
    project =  serializers.IntegerField(required=False)
    task =  serializers.IntegerField(required=False)
    billable =  serializers.BooleanField(required=False)
    start = serializers.DateTimeField(format="iso-8601", required=True)
    stop =  serializers.DateTimeField(format="iso-8601")
    created_with = serializers.CharField(max_length=200)
    duration = serializers.IntegerField(required=True)
    last_updated = serializers.DateTimeField(format="iso-8601", read_only=True)

    def create(self, validated_data):
        return TimeEntry.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `TimeEntry` instance, given the validated data.
        """
        instance.description = validated_data.get('description', instance.description)
        instance.project = validated_data.get('project', instance.project)
        instance.task = validated_data.get('task', instance.task)
        instance.billable = validated_data.get('billable', instance.billable)
        instance.start = validated_data.get('start', instance.start)
        instance.stop = validated_data.get('stop', instance.stop)
        instance.created_with = validated_data.get('created_with', instance.created_with)
        instance.duration = validated_data.get('start', instance.duration)
        instance.save()
        return instance
