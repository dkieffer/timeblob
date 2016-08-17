SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

ACTION="${1:-runserver}"


VENV=$DIR/venv
if [ ! -d $VENV ] ; then
    virtualenv $VENV
else
    echo "$VENV exists, moving on"
fi

if [ -f requirements.txt ] ; then
    $VENV/bin/pip install -r requirements.txt
fi


(
  cd $DIR/timeblob/js
  npm install
  node_modules/.bin/gulp
)

if [ $ACTION == "runserver" ]; then
  #we need to always run the migration if we runserver
  $VENV/bin/python $DIR/manage.py migrate
fi

$VENV/bin/python $DIR/manage.py loaddata "timeblob/fixtures/debug.yaml"

shift
$VENV/bin/python  $DIR/manage.py $ACTION $@
