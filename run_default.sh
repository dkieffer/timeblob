#!/bin/bash
function kill_server() {
  test=$( ps aux|grep "python $current_dir/manage.py runserver"|grep -v grep|awk '{print $2}' );
  if [ "" != "$test" ] ; then
    kill $test ;
  fi
}

trap "kill_server; exit 1" SIGINT SIGTERM ERR
current_dir=$1
venv="$current_dir/venv"
js="$current_dir/timeblob/js"



$venv/bin/python $current_dir/manage.py loaddata "timeblob/fixtures/debug.yaml" & $js/node_modules/.bin/gulp default --cwd $js & wait

$venv/bin/python  $current_dir/manage.py runserver & $js/node_modules/.bin/gulp app-watch --cwd $js & wait
