from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from timeblob.models import TimeEntry
from timeblob.api.serializers import TimeEntrySerializer, TimeEntryStartSerializer
from timeblob.exceptions import NoCurrentEntry
from timeblob.user_time_entry_manager import UserTimeEntryManager

@api_view(['GET'])
@login_required
#GET https://www.toggl.com/api/v8/time_entries Get range
def time_entries_list(request):
    start_date = request.GET.get("start_date")
    end_date = request.GET.get("end_date")
    entries = TimeEntry.objects.filter(user=request.user)
    serializer = TimeEntrySerializer(entries, many=True);
    return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
@login_required
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
        serializer = TimeEntrySerializer(request.user, item)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = TimeEntrySerializer(request.user, item, data=request.data)
        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    elif request.method == 'DELETE':
        pass


@api_view(['POST'])
@login_required
#POST https://www.toggl.com/api/v8/time_entries/start
def time_entry_start(request):
    serializer = TimeEntryStartSerializer(request.user, data=request.data)
    if (serializer.is_valid()):
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['POST'])
@login_required
#PUT https://www.toggl.com/api/v8/time_entries/{time_entry_id}/stop
def time_entry_stop(request):
    manager = UserTimeEntryManager(request.user)
    try:


        item = manager.current()

    except NoCurrentEntry:
        return Response(status=status.HTTP_404_NOT_FOUND)
    item = manager.stop_current()
    serializer = TimeEntrySerializer(request.user, item)
    return Response(serializer.data)

@api_view(['GET'])
@login_required
#GET https://www.toggl.com/api/v8/time_entries/current
def time_entry_current(request):
    manager = UserTimeEntryManager(request.user)
    try:
        item = manager.current()
    except NoCurrentEntry:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = TimeEntrySerializer(request.user, item)
    return Response(serializer.data)
