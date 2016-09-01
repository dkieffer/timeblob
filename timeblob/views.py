
from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.decorators import login_required

# Create your views here.
@ensure_csrf_cookie
@login_required
def index(request):
    return render(request, 'timeblob/index.html')

@login_required
def templates_js(request):
    return render( request, 'timeblob/templates.js', content_type='text/javascript')
