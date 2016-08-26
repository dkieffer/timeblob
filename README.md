ATTENTION: Time Blob is in early development; many parts of the prototype are not yet functional.

# Time Blob
Time Blob is a time tracking app. It’s not an app that you install on your phone; it’s a web app that you install and run on a server. It only works with servers that are running [Sandstorm](https://sandstorm.io) (an open source OS for servers). Once you install Time Blob on your Sandstorm server, you can then access the app from any computer or phone simply by visiting the app’s web address.

Once we have a working prototype, getting up and running with Time Blob will require some initial setup. Here are the three major steps:

1. Have your own server that is running a compatible version of Linux
2. Install [Sandstorm](https://sandstorm.io) on your server
3. Install Time Blob (this will be the easy part)

If you are interested in getting involved with the development, feel free to contact [David](mailto:david@dkieffer.xyz), or keep reading to dive right in.

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
