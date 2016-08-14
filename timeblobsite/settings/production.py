from base import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'app',
        'USER': 'app',
        'PASSWORD': 'app'
    }
}

STATIC_ROOT= '/var/app/static/'

SANDSTORM = True
