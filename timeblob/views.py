
from django.http import HttpResponse
from django.shortcuts import render


# Create your views here.
def index(request):
    return render(request, 'timeblob/index.html')

def templates_js(request):
    return render( request, 'timeblob/templates.js', content_type='text/javascript')
