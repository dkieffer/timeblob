from django.contrib import auth
from django.contrib.auth.middleware import RemoteUserMiddleware
from django.contrib.auth.models import User

from six.moves.urllib.parse import unquote

class LocalMiddleware(RemoteUserMiddleware):
    """
    Requires 'django.contrib.auth.backends.RemoteUserBackend' in
    settings.AUTHENTICATION_BACKENDS
    """



    def process_request(self, request):
        super(LocalMiddleware, self).process_request(request)
        if not(hasattr(request, "user")) or request.user.is_anonymous()  :
            request.user = User.objects.get(pk=1)
            request.user.save()
