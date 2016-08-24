# Time Blob
Time Blob is a time tracker designed for [Sandstorm.io](https://sandstorm.io)

Check out [the project overview](/project-overview.md) to see an outline of what we are developing, and what we want to add.

The project is currently in a prototyping phase. To see the where we are at with the prototype simply open index.html in your browser. For the prototype we are using Javascript and JQuery. Contact [David](mailto:david@polyhedral.studio) if you are interested in getting involved.

# How to develop

Clone the repo:
```
git clone https://github.com/dkieffer/timeblob.git
cd timeblob
```

You need the following things installed:
* Python 2.7
* GNU Make
* GNU/Linux or Mac OS

Run the following command to prepare your directory:

```
make prepare
```

## How to develop locally (without Sandstorm)

For most development, Sandstorm's Vagrant startup is just too slow. If you can do your
development without Sandstorm we highly recommend it.

### Run tests
Timeblob has tests for the Django web service and for Angular. You can run all running:
```
make test
```

If you'd like to run just the Django tests, run:

```
make pytest
```

Or the Angular tests, run:

```
make jstest
```

### Run Timeblob for testing

Run the following command:

```
make
```

You can then go to http://localhost:8000 and explore Timeblob


## How to develop locally on Sandstorm

Follow instructions at https://docs.sandstorm.io/en/latest/vagrant-spk/installation/ to install vagrant-spk and its requirements.


Start up the dev version of Sandstorm:
```
vagrant-spk vm up
```
(You'll need to do that everytime you modify `./sandstorm/setup.sh`)

You can access your dev version of Sandstorm at http://local.sandstorm.io:6080

Add Timeblob to your dev version of Sandstorm

```
vagrant-spk dev
```
