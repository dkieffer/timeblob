VENV=venv
if [ ! -d $VENV ] ; then
    virtualenv $VENV
else
    echo "$VENV exists, moving on"
fi

if [ -f requirements.txt ] ; then
    $VENV/bin/pip install -r requirements.txt
fi


(
  cd timeblob/js
  npm install
  gulp
)

wait
