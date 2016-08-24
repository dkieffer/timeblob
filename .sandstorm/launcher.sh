#!/bin/bash
set -euo pipefail
# something something folders
mkdir -p /var/lib/nginx
mkdir -p /var/log
mkdir -p /var/log/nginx
# Wipe /var/run, since pidfiles and socket files from previous launches should go away
# TODO someday: I'd prefer a tmpfs for these.
rm -rf /var/run
mkdir -p /var/run

mkdir -p /var/db
mkdir -p /var/app


UWSGI_SOCKET_FILE=/var/run/uwsgi.sock

export DJANGO_SETTINGS_MODULE=timeblobsite.settings.production


set +o nounset
source /opt/app/env/bin/activate
set -o nounset
HOME=/var python /opt/app/manage.py migrate
echo 'after migrate '

HOME=/var python /opt/app/manage.py collectstatic -c -l --noinput
set +o nounset
deactivate
set -o nounset
# Spawn uwsgi
echo 'before uwsgi'
#set +o nounset
HOME=/var uwsgi \
        --socket $UWSGI_SOCKET_FILE \
        --plugin python \
        --virtualenv /opt/app/env \
        --chdir=/opt/app/ \
        --wsgi-file timeblobsite/wsgi.py &

#set -o nounset

# Wait for uwsgi to bind its socket
while [ ! -e $UWSGI_SOCKET_FILE ] ; do
    echo "waiting for uwsgi to be available at $UWSGI_SOCKET_FILE"
    sleep .2
done

# Start nginx.
/usr/sbin/nginx -c /opt/app/.sandstorm/service-config/nginx.conf -g "daemon off;"
