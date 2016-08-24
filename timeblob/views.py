
from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie


# Create your views here.
@ensure_csrf_cookie
def index(request):
    return render(request, 'timeblob/index.html')

def templates_js(request):
    return render( request, 'timeblob/templates.js', content_type='text/javascript')
