ACTION?=runserver

current_dir :=$(strip $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST)))))
venv := $(current_dir)/venv
js := $(current_dir)/timeblob/js

default: migrate

	$(current_dir)/run_default.sh $(current_dir)


jstest: npm_install
	$(js)/node_modules/.bin/gulp test --cwd $(js)

jsbuild: npm_install
	$(js)/node_modules/.bin/gulp --cwd $(js)

pytest: requirements
	$(venv)/bin/python $(current_dir)/manage.py test

npm_install:
	npm --prefix $(js)  install $(js)

test: jstest pytest

jstestwatch:
		$(js)/node_modules/.bin/gulp watch --cwd $(js)

requirements: virtualenv
	if [ -f $(current_dir)/requirements.txt ] ; then $(venv)/bin/pip install -r $(current_dir)/requirements.txt -q ; fi

virtualenv:
	if [ ! -d $(venv) ] ; then virtualenv $(venv) ; fi


migrate: requirements
		$(venv)/bin/python $(current_dir)/manage.py migrate

prepare: requirements npm_install

runserver: default

shell: requirements
	$(venv)/bin/python  $(current_dir)/manage.py shell
