from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from timeblob.models import TimeEntry
from timeblob.api.serializers import TimeEntrySerializer
from timeblob.exceptions import NoCurrentEntry

@api_view(['GET'])

#GET https://www.toggl.com/api/v8/time_entries Get range
def time_entries_list(request):
    start_date = request.GET.get("start_date")
    end_date = request.GET.get("end_date")
    entries = TimeEntry.objects.filter(user=request.user)
    serializer = TimeEntrySerializer(entries, many=True);
    return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
#GET https://www.toggl.com/api/v8/time_entries/{time_entry_id}
#PUT https://www.toggl.com/api/v8/time_entries/{time_entry_id}
# DELETE https://www.toggl.com/api/v8/time_entries/{time_entry_id}
def time_entry_item(request, id):
    try:
        item = TimeEntry.objects.get(user=request.user, id=id)
    except NoCurrentEntry:
        return Response(status=status.HTTP_404_NOT_FOUND)
    user = request.user
    if request.method == 'GET':
        serializer = TimeEntrySerializer(item)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = TimeEntrySerializer(user, item, data=request.data)
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'DELETE':

        pass


@api_view(['POST'])
#POST https://www.toggl.com/api/v8/time_entries/start
def time_entry_start(request):
    serializer = TimeEntryStartSerializer(user, data=request.data)
    serializer.save()
    return Response(serializer.data)

@api_view(['PUT'])
#PUT https://www.toggl.com/api/v8/time_entries/{time_entry_id}/stop
def time_entry_stop(request, id):
    try:
        item = TimeEntry.objects.get(user=request.user, id=id)
    except NoCurrentEntry:
        return Response(status=status.HTTP_404_NOT_FOUND)
    TimeEntry.stop_task(item)
    serializer = TimeEntrySerializer(user, item)
    return Response(serializer.data)

@api_view(['GET'])
#GET https://www.toggl.com/api/v8/time_entries/current
def time_entry_current(request):
    try:
        item = TimeEntry.current(user=request.user)
    except NoCurrentEntry:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializers = TimeEntrySerializer(user, item)
    return Response(serializer.data)
