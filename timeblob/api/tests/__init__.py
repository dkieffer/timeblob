from django.contrib.auth.models import User
from rest_framework.test import APITestCase

class ForceLoginTest(APITestCase):
    #fixtures = ['users']
    def setUp(self):
        self.TestUser = User.objects.filter(pk=1).first()
        # we use this since the RemoteUserBackend is used for Sandstorm
        self.client.force_login(self.TestUser, backend="django.contrib.auth.backends.RemoteUserBackend")
