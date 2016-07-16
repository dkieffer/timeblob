
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from timeblob.models import TimeEntry
from timeblob.serializers import TimeEntrySerializer
# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the timeblob index.")

@api_view(['GET'])
#GET https://www.toggl.com/api/v8/time_entries Get range
def time_entries_list(request):
    start_date = request.GET.get("start_date")
    end_date = request.GET.get("end_date")
    entries = TimeEntry.objects.all()
    serializer = TimeEntrySerializer(entries, many=True);
    return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
#GET https://www.toggl.com/api/v8/time_entries/{time_entry_id}
#PUT https://www.toggl.com/api/v8/time_entries/{time_entry_id}
# DELETE https://www.toggl.com/api/v8/time_entries/{time_entry_id}
def time_entry_item(request, id):
    try:
        item = TimeEntry.objects.get(id=id)
    except TimeEntry.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        #get
        pass
    elif request.method == 'PUT':
        #update
        pass
    elif request.method == 'DELETE':
        #remove
        pass


@api_view(['POST'])
#POST https://www.toggl.com/api/v8/time_entries/start
def time_entry_start(request):
    item = TimeEntry

@api_view(['PUT'])
#PUT https://www.toggl.com/api/v8/time_entries/{time_entry_id}/stop
def time_entry_stop(request, id):
    try:
        item = TimeEntry.objects.get(id=id)
    except TimeEntry.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    pass

@api_view(['GET'])
#GET https://www.toggl.com/api/v8/time_entries/current
def time_entry_current(request):
    pass
