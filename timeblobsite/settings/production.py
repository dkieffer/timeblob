from base import *
import os


MIDDLEWARE_CLASSES = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django_sandstorm.middleware.SandstormMiddleware'
]

#DATABASES = {
#    'default': {
#        'ENGINE': 'django.db.backends.mysql',
#        'NAME': 'app',
#        'USER': 'app',
#        'PASSWORD': 'app'
#    }
#}

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join("/var/db", 'db.sqlite3'),
    }
}

STATIC_ROOT= '/var/app/static/'

SANDSTORM = True
DEBUG = True

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format' : "[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s",
            'datefmt' : "%d/%b/%Y %H:%M:%S"
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
    },
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': '/var/log/mysite.log',
            'formatter': 'verbose'
        },
        'applogfile': {
            'level':'DEBUG',
            'class':'logging.handlers.RotatingFileHandler',
            'filename': os.path.join('/var/log/', 'APPNAME.log'),
            'maxBytes': 1024*1024*15, # 15MB
            'backupCount': 10,
        },
        'requestlogfile': {
            'level':'DEBUG',
            'class':'logging.handlers.RotatingFileHandler',
            'filename': os.path.join('/var/log/', 'request.log'),
            'maxBytes': 1024*1024*15, # 15MB
            'backupCount': 10,
        },
    },
    'loggers': {
        'django.request': {
            'handlers': ['requestlogfile'],
            'level': 'INFO',
            'propagate': True,
        },
        'django': {
            'handlers':['applogfile'],
            'propagate': True,
            'level':'ERROR',
        },
        'timeblobsite': {
            'handlers': ['applogfile'],
            'level': 'ERROR',
        },
    }
}
